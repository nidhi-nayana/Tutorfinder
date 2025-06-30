"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { type Session } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

function StarRatingInput({ rating, setRating }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(starValue)}
            className="cursor-pointer"
            aria-label={`Rate ${starValue} star`}
          >
            <Star
              className={cn(
                "w-8 h-8 transition-colors",
                starValue <= (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}


interface ReviewFormProps {
  session: Session;
  children: React.ReactNode;
}

export function ReviewForm({ session, children }: ReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a star rating before submitting.",
      });
      return;
    }
    console.log({ rating, comment, session });
    toast({
      title: "Review Submitted!",
      description: `Thank you for reviewing your session with ${session.tutor.name}.`,
    });
    setOpen(false);
    setRating(0);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your feedback for the {session.subject} session with {session.tutor.name}.
          </DialogDescription>
        </DialogHeader>
        <form id="review-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <div className="col-span-3">
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="review-form">Submit Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
