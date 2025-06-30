export interface Review {
  id: string;
  studentName: string;
  studentImage: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Subject {
  name: 'Math' | 'Science' | 'History' | 'English' | 'Art' | 'Music' | 'CompSci' | 'Economics' | 'Spanish' | 'Geography';
  icon: string;
}

export interface Tutor {
  id: string;
  name: string;
  image: string;
  bio: string;
  subjects: Subject[];
  hourlyRate: number;
  rating: number;
  reviews: Review[];
  availability: {
    [date: string]: string[]; // e.g., "2024-07-28": ["09:00", "10:00", ...]
  };
  sessionsCompleted: number;
}

export interface Session {
  id: string;
  tutor: Pick<Tutor, 'name' | 'image' | 'id'>;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}
