// Custom shared types for LinguaBoost
/// <reference types="react" />

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  createdAt?: Date;
}

export interface Language {
  code: string; // e.g., 'en', 'es', 'fr'
  name: string; // e.g., 'English', 'Spanish', 'French'
  flag: string; // emoji flag
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  language: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  completed: boolean;
}

export interface Progress {
  userId: string;
  lessonId: string;
  completedAt: Date;
  score: number; // 0-100
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Event types for IPC communication (Electron)
export interface ElectronEvents {
  'user:login': { user: User };
  'user:logout': void;
  'lesson:start': { lessonId: string };
  'lesson:complete': { lessonId: string; score: number };
  'progress:sync': void;
}

// Component props helper types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithError {
  error?: string | null;
}
