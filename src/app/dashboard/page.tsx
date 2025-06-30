"use client";

import { studentSessions } from "@/lib/mock-data";
import { type Session } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReviewForm } from "@/components/review-form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Video, MessageSquareQuote, CalendarClock } from "lucide-react";

function SessionCard({ session }: { session: Session }) {
  const { toast } = useToast();

  const handleJoinClass = () => {
    toast({
      title: "Joining Virtual Classroom...",
      description: `Connecting you to your ${session.subject} session with ${session.tutor.name}.`,
    });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={session.tutor.image}
              alt={session.tutor.name}
              data-ai-hint="person avatar"
            />
            <AvatarFallback>{session.tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{session.subject}</CardTitle>
            <CardDescription>with {session.tutor.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarClock className="w-4 h-4 mr-2" />
          <span>
            {format(new Date(session.date), "EEEE, MMMM d, yyyy")} at{" "}
            {session.time}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {session.status === "upcoming" ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">
                <Video className="w-4 h-4 mr-2" />
                Join Class
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ready to join your session?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to join your {session.subject} session with{" "}
                  {session.tutor.name}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleJoinClass}>
                  Join Now
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <ReviewForm session={session}>
            <Button variant="secondary" className="w-full">
              <MessageSquareQuote className="w-4 h-4 mr-2" />
              Leave a Review
            </Button>
          </ReviewForm>
        )}
      </CardFooter>
    </Card>
  );
}


export default function DashboardPage() {
  const upcomingSessions = studentSessions.filter(s => s.status === 'upcoming');
  const pastSessions = studentSessions.filter(s => s.status === 'completed');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Your Dashboard</h1>
        <p className="text-muted-foreground">Manage your sessions and track your progress.</p>
      </header>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="completed">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          {upcomingSessions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-semibold">No upcoming sessions</h3>
              <p className="text-muted-foreground mt-2">Time to book a new one!</p>
              <Button className="mt-4">Find a Tutor</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          {pastSessions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-semibold">No past sessions yet</h3>
              <p className="text-muted-foreground mt-2">Complete a session to see it here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
