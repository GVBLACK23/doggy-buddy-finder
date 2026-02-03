import { useState } from "react";
import { Star, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  canReview: boolean;
  onSubmit: (rating: number, comment: string, tags: string[]) => Promise<void>;
  isSubmitting?: boolean;
}

const PRAISE_TAGS = [
  "Muita Paciência",
  "Pontual",
  "Deixa Calmo",
  "Carro Limpo",
  "Explica Bem",
  "Atencioso",
  "Profissional",
  "Recomendo",
];

const ReviewForm = ({ canReview, onSubmit, isSubmitting = false }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    await onSubmit(rating, comment, selectedTags);
    setRating(0);
    setComment("");
    setSelectedTags([]);
  };

  if (!canReview) {
    return (
      <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Você precisa ter uma aula confirmada com este instrutor para avaliá-lo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Sua avaliação</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "w-8 h-8 transition-colors",
                  (hoverRating || rating) >= star
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/30"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Praise Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium">O que você mais gostou?</label>
        <div className="flex flex-wrap gap-2">
          {PRAISE_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all",
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Comentário (opcional)
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte como foi sua experiência..."
          rows={4}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className="w-full"
      >
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  );
};

export default ReviewForm;
