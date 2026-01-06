-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'instructor');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create instructor_registrations table
CREATE TABLE public.instructor_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    profile_photo_url TEXT,
    years_of_experience TEXT NOT NULL,
    instructor_license_number TEXT NOT NULL CHECK (char_length(instructor_license_number) = 6),
    license_photo_url TEXT,
    has_own_vehicle BOOLEAN NOT NULL DEFAULT false,
    transmission_type TEXT CHECK (transmission_type IN ('manual', 'automatic', 'both')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on instructor_registrations
ALTER TABLE public.instructor_registrations ENABLE ROW LEVEL SECURITY;

-- RLS policies for instructor_registrations
CREATE POLICY "Users can view their own registration"
ON public.instructor_registrations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own registration"
ON public.instructor_registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registration"
ON public.instructor_registrations
FOR UPDATE
USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for instructor_registrations
CREATE TRIGGER update_instructor_registrations_updated_at
BEFORE UPDATE ON public.instructor_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for instructor documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('instructor-documents', 'instructor-documents', false);

-- Storage policies for instructor documents
CREATE POLICY "Users can upload their own profile photo"
ON storage.objects
FOR INSERT
WITH CHECK (
    bucket_id = 'instructor-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
USING (
    bucket_id = 'instructor-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own documents"
ON storage.objects
FOR UPDATE
USING (
    bucket_id = 'instructor-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
USING (
    bucket_id = 'instructor-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);