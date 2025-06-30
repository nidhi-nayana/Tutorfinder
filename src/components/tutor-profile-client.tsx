"use client";

import { useState } from "react";
import Image from "next/image";
import { type Tutor, type Review as ReviewType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/star-rating";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, DollarSign, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { SubjectIcon } from "./subject-icon";

function TutorStat({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Review({ review }: { review: ReviewType }) {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={review.studentImage} alt={review.studentName} data-ai-hint="person avatar" />
        <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{review.studentName}</p>
          <p className="text-xs text-muted-foreground">{format(new Date(review.date), "MMM d, yyyy")}</p>
        </div>
        <div className="my-1">
          <StarRating rating={review.rating} />
        </div>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </div>
    </div>
  )
}

export function TutorProfileClient({ tutor }: { tutor: Tutor }) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2024-08-15'));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDays = Object.keys(tutor.availability)
    .map(dateStr => new Date(dateStr))
    .filter(date => date >= today);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Booking Confirmed!",
        description: `Your session with ${tutor.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} is booked.`,
        action: (
          <div className="p-1 rounded-full bg-green-500">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        ),
      });
      setSelectedTime(null);
    }
  };

  const dayHasAvailability = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return tutor.availability[dateString]?.length > 0;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-primary/20 h-24" />
            <CardContent className="text-center -mt-16">
              <Avatar className="h-32 w-32 mx-auto border-4 border-card shadow-md">
                <AvatarImage src={tutor.image} alt={tutor.name} data-ai-hint="person portrait" />
                <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold font-headline mt-4">{tutor.name}</h1>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject.name} variant="secondary" className="text-sm">
                    <SubjectIcon iconName={subject.icon} className="w-4 h-4 mr-1.5" />
                    {subject.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{tutor.bio}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <TutorStat icon={StarRating} label="Rating" value={`${tutor.rating.toFixed(1)} / 5.0`} />
                <TutorStat icon={Users} label="Sessions Completed" value={tutor.sessionsCompleted} />
                <TutorStat icon={DollarSign} label="Hourly Rate" value={`$${tutor.hourlyRate}`} />
            </CardContent>
          </Card>

        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6" /> Book a Session
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < today || !dayHasAvailability(date)}
                  initialFocus
                  className="rounded-md border"
                  modifiers={{ available: availableDays }}
                  modifiersStyles={{ available: {
                    border: "2px solid",
                    borderColor: "hsl(var(--primary))",
                  } }}
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">
                  Available times for {selectedDate ? format(selectedDate, "PPP") : "..."}
                </h4>
                {selectedDate && dayHasAvailability(selectedDate) ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {tutor.availability[format(selectedDate, 'yyyy-MM-dd')]?.map(time => (
                      <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="bg-primary/10 border-primary/50 text-primary-foreground hover:bg-primary/20"
                      >
                        <Clock className="w-4 h-4 mr-2" /> {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {selectedDate ? "No available slots for this day." : "Please select a date."}
                  </p>
                )}
                <Button onClick={handleBooking} disabled={!selectedTime} size="lg" className="w-full">
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Reviews ({tutor.reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {tutor.reviews.map((review, index) => (
                <div key={review.id}>
                  <Review review={review} />
                  {index < tutor.reviews.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
