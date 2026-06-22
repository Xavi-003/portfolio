/**
 * Core Application Types
 * Central place for all TypeScript interfaces and types
 */

/* ==================== Navigation & Views ==================== */

export type ViewState = 'hero' | 'projects' | 'skills' | 'contact';

export interface NavItem {
  label: string;
  view: ViewState;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

/* ==================== Messages & Chat ==================== */

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  error?: string;
  metadata?: {
    tokens?: number;
    latency?: number;
  };
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  model: 'gemini-2.5' | 'gemini-pro';
}

export interface GeminiResponse {
  response: string;
  timestamp: number;
  tokensUsed?: number;
}

/* ==================== Projects ==================== */

export type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack' | 'DevOps' | 'Mobile' | 'AI/ML';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  shortDescription: string;
  technologies: string[];
  image: string;
  images?: string[];
  link?: string;
  github?: string;
  featured: boolean;
  category: ProjectCategory;
  year: number;
  status: 'Completed' | 'In Progress' | 'Archived';
  metrics?: {
    stars?: number;
    downloads?: number;
    users?: number;
  };
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface ProjectFilter {
  category?: ProjectCategory;
  year?: number;
  featured?: boolean;
  searchTerm?: string;
}

/* ==================== Skills ==================== */

export type SkillLevel = 'Expert' | 'Intermediate' | 'Learning';
export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Tools' | 'Languages';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  yearsOfExperience: number;
  proficiency: number; // 0-100
  icon?: string; // Icon name or URL
  projects?: number; // Number of projects using this skill
}

export interface SkillGroup {
  category: SkillCategory;
  items: SkillItem[];
  description?: string;
}

export interface SkillsData {
  categories: SkillGroup[];
  totalYearsExperience: number;
  topSkills: string[];
}

/* ==================== API & Errors ==================== */

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
  timestamp: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
  timestamp: number;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  status: FetchStatus;
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

/* ==================== Gemini API ==================== */

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export interface GeminiGenerateResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: 'model';
    };
    finishReason: 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'OTHER';
    safetyRatings?: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

/* ==================== UI Components ==================== */

export interface LoaderProps {
  onComplete: () => void;
}

export interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

export interface SkillsProps {
  animated?: boolean;
}

export interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

/* ==================== Application State ==================== */

export interface AppContextType {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  chatHistory: Message[];
  setChatHistory: (messages: Message[]) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

/* ==================== Local Storage ==================== */

export interface StorageKeys {
  'user-theme': 'dark' | 'light';
  'chat-history': ChatSession[];
  'user-preferences': UserPreferences;
  'app-cache': AppCache;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
}

export interface AppCache {
  lastVisitedView: ViewState;
  lastVisitTime: number;
  viewDurations: Record<ViewState, number>;
}

/* ==================== Performance & Analytics ==================== */

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, unknown>;
  timestamp: number;
  userId?: string;
}

export interface PageMetrics {
  title: string;
  loadTime: number;
  renderTime: number;
  interactiveTime: number;
  resourceCount: number;
}

/* ==================== Utility Types ==================== */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type AsyncFunction<T = void> = () => Promise<T>;
export type Callback<T = void> = () => T;
export type Handler<T = void> = (event: T) => void;

/* ==================== Environment Variables ==================== */

export interface ImportMetaEnv {
  VITE_GEMINI_API_KEY?: string;
  VITE_API_BASE_URL?: string;
  VITE_ENABLE_ANALYTICS?: string;
  VITE_LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
