/**
 * Centralized Types/Interfaces
 * Tất cả các types được định nghĩa tại đây để tái sử dụng dễ dàng
 */

export interface Athlete {
  id: number
  name: string
  sport: string
  performance: number
  qualified: boolean
  joinMonth: string
  joinYear: number
  medals: { gold: number; silver: number; bronze: number }
  injured: boolean
  potential: boolean
  age?: number
  height?: number
  coach?: string
  joinDate?: string
}

export interface Coach {
  id?: string | number
  name: string
  specialty?: string
  experience?: number
  athletesManaged?: number
  efficiency?: number
  email?: string
  phone?: string
  certification?: string
  joinDate?: string
  username?: string
  sport?: string
  role?: string
}

export interface Sport {
  id?: number
  name: string
  athleteCount?: number
  achievements?: string
}

export interface TrainingPlan {
  id: string
  title: string
  description: string
  athleteId: number
  athleteName: string
  sport: string
  startDate: string
  duration: number
  goals: string
  createdAt: string
}

export interface TrainingSession {
  id: string
  athleteId: number
  athleteName: string
  sport: string
  coachUsername: string
  sessionDate: string
  metrics: { [key: string]: any }
  createdAt: string
}

export interface Application {
  id: string
  createdAt: string
  fullName: string
  dob?: string
  gender?: string
  idNumber?: string
  address?: string
  phone?: string
  email?: string
  school?: string
  sport?: string
  registerType?: string
  trainingTime?: string
  height?: string
  weight?: string
  achievements?: string
  experience?: string
  talent?: string
  avatarName?: string | null
  healthDocName?: string | null
  idDocName?: string | null
  confirmDocName?: string | null
  agree: boolean
}

export interface User {
  username: string
  role?: 'admin' | 'coach' | 'user'
  sport?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
