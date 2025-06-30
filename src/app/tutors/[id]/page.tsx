import { notFound } from "next/navigation";
import { tutors } from "@/lib/mock-data";
import { TutorProfileClient } from "@/components/tutor-profile-client";
import { type Tutor } from "@/types";

export default function TutorProfilePage({ params }: { params: { id: string } }) {
  const tutor = tutors.find((t) => t.id === params.id) as Tutor | undefined;

  if (!tutor) {
    notFound();
  }

  return <TutorProfileClient tutor={tutor} />;
}
