export enum UserLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum UserGoal {
  TRAVEL = 'Viagem',
  WORK = 'Profissional',
  EXAM = 'Certificação (IELTS/TOEFL/DELE)',
  CULTURE = 'Cultura'
}

export enum SubscriptionType {
  FREE = 'Alle Free',
  TURMA = 'Alle Turma',
  VIP = 'Alle VIP'
}

export type SupportedLanguage = 'en' | 'de' | 'es';

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'Inglês',
  de: 'Alemão',
  es: 'Espanhol'
};

export interface User {
  id: string;
  name: string;
  email: string;
  currentLanguage: SupportedLanguage;
  enrolledLanguages: SupportedLanguage[];
  level: UserLevel;
  goal: UserGoal;
  nextClass: string; // ISO Date
  focusSkill: string;
  subscription: SubscriptionType;
  avatarUrl?: string;
}

export interface Recording {
  id: string;
  date: string;
  topic: string;
  duration: number;
  teacherFeedback?: string;
  teacherRating?: number; // 0-5
  aiAnalysis?: string;
  audioUrl?: string;
  skill: 'speaking' | 'writing' | 'listening' | 'reading';
  level: string;
  tags: string[];
  accuracy?: number; // 0-100
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'video' | 'text' | 'audio' | 'exercise';
  realLifeApplication: string;
  tags: string[];
  isFavorite: boolean;
}

export interface StudyPlanItem {
  id: string;
  title: string;
  status: 'planned' | 'completed' | 'changed';
  date: string;
  reasonForChange?: string;
}

export interface SocialPost {
  id: string;
  author: string;
  authorRole: 'Aluno' | 'Professor' | 'Admin';
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}