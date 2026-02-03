import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  praise_tags: string[] | null;
  created_at: string;
  student_name?: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewList = ({ reviews, averageRating, totalReviews }: ReviewListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-4 h-4",
                  star <= Math.round(averageRating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
        <div className="border-l border-border pl-4">
          <p className="text-sm text-muted-foreground">
            {totalReviews} {totalReviews === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.student_name
                      ? review.student_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      : "A"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {review.student_name || "Aluno"}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatDate(review.created_at)}
                    </span>
                  </div>

                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-3.5 h-3.5",
                          star <= review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>

                  {review.praise_tags && review.praise_tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {review.praise_tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {review.comment && (
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Este instrutor ainda não tem avaliações.
        </p>
      )}
    </div>
  );
};

export default ReviewList;
