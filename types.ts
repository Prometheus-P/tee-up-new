
export interface Course {
  id: string;
  name: string;
  location: string;
  rating: number;
  par: number;
  holes: number;
  image: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Pro';
}

export interface LessonLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  title: string;
  summary: string;
  videoUrl?: string;
  drills: string[];
  coachNotes: string;
}

export interface Membership {
  id: string;
  studentId: string;
  planName: 'Elite' | 'Standard' | 'Pro';
  status: 'Active' | 'Expired' | 'Pending';
  expiryDate: string;
  billingAmount: number;
}

export interface Reservation {
  id: string;
  time: string;
  studentName: string;
  type: 'Swing Analysis' | 'Putting' | 'On-Course';
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export interface UserStats {
  handicap: number;
  averageScore: number;
  roundsPlayed: number;
  bestRound: number;
  puttsPerHole: number;
  fairwayPercentage: number;
}
