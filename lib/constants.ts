/**
 * Application Constants
 * Tập trung các hằng số, enum, và config
 */

export const SPORTS = {
  BOXING: '🥊 Võ thuật',
  SWIMMING: '🏊 Bơi lội',
  FOOTBALL: '⚽ Bóng đá',
  RUNNING: '🏃 Điền kinh',
  BADMINTON: '🏸 Cầu lông',
  BASKETBALL: '🏀 Bóng rổ',
  TABLE_TENNIS: '🏓 Bóng bàn',
} as const

export const TRAINING_TIMES = ['Sáng', 'Chiều', 'Tối'] as const

export const REGISTER_TYPES = ['Huấn luyện dài hạn', 'Đào tạo năng khiếu'] as const

export const PERFORMANCE_LEVELS = ['Rất yếu', 'Yếu', 'Trung bình', 'Tốt', 'Rất tốt'] as const

export const USER_ROLES = {
  ADMIN: 'admin',
  COACH: 'coach',
  ATHLETE: 'athlete',
  USER: 'user',
} as const

export const MEDAL_TYPES = {
  GOLD: 'gold',
  SILVER: 'silver',
  BRONZE: 'bronze',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DASHBOARD_ATHLETES: '/dashboard/athletes',
  DASHBOARD_COACHES: '/dashboard/coaches',
  DASHBOARD_APPLICATIONS: '/dashboard/applications',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  COACH_HOME: '/coach',
  COACH_TRAINING_PLANS: '/coach/training-plans',
  PROFILE_ATHLETE: (id: number) => `/profile/athlete/${id}`,
  PROFILE_COACH: (id: string | number) => `/profile/coach/${id}`,
  XET_TUYEN: '/xet-tuyen',
  XET_TUYEN_UNG_TUYEN: '/xet-tuyen/ung-tuyen',
} as const

export const API_ENDPOINTS = {
  ATHLETES: '/api/athletes',
  COACHES: '/api/coaches',
  SPORTS: '/api/sports',
  TRAINING_PLANS: '/api/training-plans',
  TRAINING_SESSIONS: '/api/training-sessions',
  APPLICATIONS: '/api/applications',
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const VALIDATION = {
  PHONE_PATTERN: /^\d{10}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const

export const TOAST_DURATION = 3000

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const
