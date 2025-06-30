"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { TutorCard } from "@/components/tutor-card";
import { tutors } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { type Tutor } from "@/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(tutors);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = tutors.filter((tutor) => {
      const nameMatch = tutor.name.toLowerCase().includes(lowercasedFilter);
      const subjectMatch = tutor.subjects.some((subject) =>
        subject.name.toLowerCase().includes(lowercasedFilter)
      );
      return nameMatch || subjectMatch;
    });
    setFilteredTutors(filtered);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Find Your Perfect Tutor</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through our expert tutors and find the perfect match for your learning goals.
        </p>
      </header>
      
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by subject or tutor name..."
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))
        ) : (
           <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-semibold">No tutors found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
