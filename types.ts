export enum VideoProvider {
  YouTube = 'youtube',
  Vimeo = 'vimeo',
  Loom = 'loom',
  Other = 'other'
}

export type LessonType = 'video' | 'article' | 'documentation' | 'quiz';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  videoId?: string; // Optional for articles
  provider?: VideoProvider;
  duration?: string; // e.g., "10:05" or "5 min read"
  contentUrl?: string; // URL for the article/doc
  resources?: {
    title: string;
    url: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseData {
  title: string;
  description: string;
  modules: Module[];
}

export interface UserProgress {
  completedLessonIds: string[];
  lastActiveLessonId: string | null;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  sources?: {
    title: string;
    uri: string;
  }[];
  timestamp: number;
}