-- Add new columns to instructor_registrations
ALTER TABLE public.instructor_registrations
ADD COLUMN IF NOT EXISTS whatsapp TEXT,
ADD COLUMN IF NOT EXISTS price_single DECIMAL(10,2) DEFAULT 80.00,
ADD COLUMN IF NOT EXISTS price_package DECIMAL(10,2) DEFAULT 700.00,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS cep TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11,8),
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create student_profiles table
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  whatsapp TEXT,
  address TEXT,
  cep TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on student_profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for student_profiles
CREATE POLICY "Users can view their own student profile"
ON public.student_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own student profile"
ON public.student_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own student profile"
ON public.student_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Create bookings table for lessons
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  instructor_id UUID NOT NULL,
  lesson_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending',
  price DECIMAL(10,2),
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for bookings
CREATE POLICY "Students can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Instructors can view their bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = instructor_id);

CREATE POLICY "Students can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = student_id);

CREATE POLICY "Instructors can update their bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = instructor_id);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  instructor_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  praise_tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for reviews
CREATE POLICY "Anyone can view reviews"
ON public.reviews
FOR SELECT
USING (true);

CREATE POLICY "Students can create reviews for their completed bookings"
ON public.reviews
FOR INSERT
WITH CHECK (
  auth.uid() = student_id 
  AND EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE id = booking_id 
    AND student_id = auth.uid() 
    AND status = 'completed'
  )
);

-- Create function to check if student can review instructor
CREATE OR REPLACE FUNCTION public.can_review_instructor(_student_id UUID, _instructor_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    LEFT JOIN public.reviews r ON r.booking_id = b.id
    WHERE b.student_id = _student_id
    AND b.instructor_id = _instructor_id
    AND b.status = 'completed'
    AND r.id IS NULL
  )
$$;

-- Create function to get instructor average rating
CREATE OR REPLACE FUNCTION public.get_instructor_rating(_instructor_id UUID)
RETURNS TABLE(average_rating DECIMAL, review_count BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(AVG(rating)::DECIMAL(3,2), 0) as average_rating,
    COUNT(*) as review_count
  FROM public.reviews
  WHERE instructor_id = _instructor_id
$$;

-- Add trigger for updated_at on student_profiles
CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on bookings
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();