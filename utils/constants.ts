/**
 * Application Constants
 * Centralized configuration values
 */

/* ==================== Timing Constants ==================== */

export const TIMING = {
  // Loading
  LOADER_MIN_DURATION_MS: 1200,
  INITIAL_LOAD_DELAY_MS: 300,
  
  // Favicon
  FAVICON_UPDATE_INTERVAL_MS: 2000, // Reduced from 1000 for better performance
  
  // Animations
  TYPING_SPEED_MS: 70,
  TRANSITION_DURATION_MS: 500,
  ANIMATION_DELAY_MS: 1000,
  
  // API
  API_CALL_TIMEOUT_MS: 30000,
  API_RETRY_DELAY_MS: 1000,
  API_DEBOUNCE_MS: 500,
  
  // UI
  TOAST_DURATION_MS: 3000,
  SCROLL_SMOOTH_DURATION_MS: 300,
} as const;

/* ==================== Animation Constants ==================== */

export const ANIMATION = {
  // Framer Motion defaults
  TRANSITION_DEFAULT: {
    duration: 0.5,
    ease: 'easeOut',
  },
  
  // View transitions
  VIEW_TRANSITIONS: {
    hero: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
      transition: { duration: 0.6 },
    },
    projects: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.5 },
    },
    skills: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: { duration: 0.5 },
    },
    contact: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.5 },
    },
  },
  
  // Favicon cycling
  FAVICON_COLORS: [
    '#22d3ee', // Cyan
    '#e879f9', // Fuchsia
    '#a78bfa', // Violet
    '#34d399', // Emerald
    '#fbbf24', // Amber
    '#fb7185', // Rose
    '#2dd4bf', // Teal
    '#38bdf8', // Sky
  ] as const,
  
  // Particle animation
  PARTICLE_DURATION_MS: 3000,
  PARTICLE_COUNT: {
    desktop: 100,
    tablet: 50,
    mobile: 20,
  },
} as const;

/* ==================== Colors ==================== */

export const COLORS = {
  neon: {
    purple: '#b026ff',
    violet: '#7c3aed',
    fuchsia: '#e879f9',
    dark: '#0a0015',
    glow: '#d946ef',
  },
  gradients: {
    text: ['from-cyan-400 to-blue-500', 'from-fuchsia-400 to-pink-500', 'from-violet-400 to-purple-600', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-red-500', 'from-teal-400 to-cyan-500', 'from-sky-400 to-indigo-500'] as const,
  },
} as const;

/* ==================== API Configuration ==================== */

export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  
  // Endpoints
  ENDPOINTS: {
    CHAT: '/api/chat',
    PROJECTS: '/api/projects',
    SKILLS: '/api/skills',
  },
  
  // Rate limiting
  RATE_LIMITS: {
    CHAT_MESSAGES_PER_MINUTE: 20,
    CHAT_MESSAGES_PER_SESSION: 100,
    API_CALLS_PER_MINUTE: 100,
  },
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY_MS: 1000,
    MAX_DELAY_MS: 10000,
    BACKOFF_MULTIPLIER: 2,
  },
} as const;

/* ==================== UI Configuration ==================== */

export const UI = {
  // Breakpoints (Tailwind defaults)
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Z-index layers
  ZINDEX: {
    BACKGROUND: 1,
    PARTICLES: 5,
    CONTENT: 10,
    NAVIGATION: 20,
    MODAL: 30,
    TOOLTIP: 40,
    NOTIFICATION: 50,
  },
  
  // Modal defaults
  MODAL: {
    MAX_WIDTH: '48rem', // 3xl
    PADDING: '1.5rem',
    BORDER_RADIUS: '1.5rem',
  },
} as const;

/* ==================== Feature Flags ==================== */

export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: true,
  ENABLE_SERVICE_WORKER: true,
  ENABLE_CHAT: true,
  ENABLE_PARTICLES: true,
  REDUCED_MOTION: false, // Can be overridden by user preferences
} as const;

/* ==================== Storage Keys ==================== */

export const STORAGE_KEYS = {
  THEME: 'user-theme',
  CHAT_HISTORY: 'chat-history',
  USER_PREFERENCES: 'user-preferences',
  APP_CACHE: 'app-cache',
  GEMINI_API_KEY: 'user_gemini_api_key', // ⚠️ DEPRECATED - Use server-side API instead
} as const;

/* ==================== Navigation ==================== */

export const NAVIGATION = {
  LINKS: {
    BLOG: 'https://xavi-003.github.io/blog/',
    LINKEDIN: 'https://www.linkedin.com/in/antony-xavier-4b5019333/',
    GITHUB: 'https://github.com/Xavi-003/',
    MINI_GAME: 'https://xavi-003.github.io/mini_game/',
    RESUME: '/portfolio/resume.pdf',
  },
  
  // Social media
  SOCIAL_MEDIA: {
    GITHUB: 'GitHub',
    LINKEDIN: 'LinkedIn',
    TWITTER: 'Twitter',
    EMAIL: 'Email',
  },
} as const;

/* ==================== Error Messages ==================== */

export const ERROR_MESSAGES = {
  // API Errors
  API_TIMEOUT: 'Request timed out. Please try again.',
  API_ERROR: 'An error occurred. Please try again later.',
  API_RATE_LIMIT: 'Too many requests. Please wait a moment.',
  
  // Chat Errors
  CHAT_DISABLED: 'Chat is currently disabled.',
  MESSAGE_TOO_LONG: 'Message is too long. Please shorten it.',
  NO_RESPONSE: 'Unable to get response. Please try again.',
  
  // Validation
  INVALID_INPUT: 'Invalid input provided.',
  MISSING_FIELD: 'Required field is missing.',
  
  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  TRY_AGAIN: 'Try again later.',
} as const;

/* ==================== Success Messages ==================== */

export const SUCCESS_MESSAGES = {
  CHAT_SENT: 'Message sent successfully.',
  RESUME_DOWNLOADED: 'Resume downloaded successfully.',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  SETTINGS_SAVED: 'Settings saved successfully.',
} as const;

/* ==================== Validation ==================== */

export const VALIDATION = {
  // Message length
  MESSAGE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 5000,
  },
  
  // API Key
  API_KEY: {
    MIN_LENGTH: 30,
    MAX_LENGTH: 200,
  },
} as const;

/* ==================== Performance ==================== */

export const PERFORMANCE = {
  // Bundle size warnings (KB)
  CHUNK_SIZE_WARNING_KB: 600,
  CHUNK_SIZE_ERROR_KB: 800,
  
  // Performance thresholds (ms)
  RENDER_TIME_THRESHOLD_MS: 16.67, // 60fps
  API_RESPONSE_THRESHOLD_MS: 3000,
  
  // Cache configuration
  CACHE: {
    STALE_WHILE_REVALIDATE_MS: 5 * 60 * 1000, // 5 minutes
    MAX_AGE_MS: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

/* ==================== Logging ==================== */

export const LOG_LEVEL = (import.meta.env.VITE_LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error';

export const LOGGING = {
  LEVELS: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  },
  CURRENT_LEVEL: LOG_LEVEL === 'debug' ? 0 : LOG_LEVEL === 'info' ? 1 : LOG_LEVEL === 'warn' ? 2 : 3,
} as const;

/* ==================== Document Constants ==================== */

export const DOCUMENT = {
  TITLE: 'Antony Xavier - Senior Full Stack Developer',
  DESCRIPTION: 'Portfolio of Antony Xavier, a full stack developer specializing in React, Node.js, and cloud-native architecture.',
  AUTHOR: 'Antony Xavier',
  KEYWORDS: ['developer', 'portfolio', 'react', 'typescript', 'full-stack'],
} as const;
