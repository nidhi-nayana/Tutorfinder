import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { type Tutor } from "@/types";
import { SubjectIcon } from "./subject-icon";

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="w-full h-32 bg-primary/20"></div>
        <div className="absolute top-16 left-6">
          <Avatar className="h-24 w-24 border-4 border-card">
            <AvatarImage src={tutor.image} alt={tutor.name} data-ai-hint="person portrait" />
            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-16 flex-grow">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-xl font-bold font-headline">{tutor.name}</h3>
          {tutor.subjects.map((subject) => (
            <Badge key={subject.name} variant="outline" className="font-normal">{subject.name}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 mb-3">
          <div className="flex items-center gap-0.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{tutor.rating.toFixed(1)}</span>
          </div>
          <span>&middot;</span>
          <span>${tutor.hourlyRate}/hr</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {tutor.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.subjects.map((subject) => (
            <Badge key={subject.name} variant="secondary">
              <SubjectIcon iconName={subject.icon} className="w-3.5 h-3.5 mr-1.5" />
              {subject.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
