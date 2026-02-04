
export enum UserLevel {
  KID = 'Kid',
  STUDENT = 'Student',
  EXPERT = 'Expert'
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ExplanationResponse {
  topic: string;
  level: UserLevel;
  analogy: string;
  realMeaning: string;
  quiz: Quiz;
}

export interface HistoryItem {
  id: string;
  data: ExplanationResponse;
  timestamp: number;
}
