import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  iconClassName?: string;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 5,
  className,
  iconClassName
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center", className)} {...(rating === 0 && { "aria-label": "Rating" })}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        if (starValue <= fullStars) {
          return (
            <Star
              key={i}
              className={cn(`w-${size} h-${size} text-yellow-400 fill-yellow-400`, iconClassName)}
            />
          );
        }
        if (hasHalfStar && starValue === fullStars + 1) {
          return (
            <div key={i} className="relative">
              <Star
                className={cn(`w-${size} h-${size} text-yellow-400`, iconClassName)}
              />
              <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <Star
                  className={cn(`w-${size} h-${size} text-yellow-400 fill-yellow-400`, iconClassName)}
                />
              </div>
            </div>
          );
        }
        return (
          <Star key={i} className={cn(`w-${size} h-${size} text-gray-300`, iconClassName)} />
        );
      })}
    </div>
  );
}
