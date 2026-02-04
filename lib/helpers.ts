/**
 * Helper Functions
 * Các hàm tiện ích dùng chung
 */

import { Athlete, Coach } from './types'

// Formatting
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN')
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('vi-VN')
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals)
}

export function formatPercentage(value: number): string {
  return `${value}%`
}

// Validation
export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

export function isValidPhone(phone: string): boolean {
  const pattern = /^\d{10}$/
  return pattern.test(phone)
}

export function isValidIdNumber(id: string): boolean {
  return id.length >= 9 && id.length <= 12
}

// Athlete utilities
export function getAthletePerfomanceColor(performance: number): string {
  if (performance >= 90) return 'text-green-600 bg-green-100'
  if (performance >= 75) return 'text-blue-600 bg-blue-100'
  if (performance >= 60) return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

export function getAthletePerfomanceBgClass(performance: number): string {
  if (performance >= 90) return 'from-green-600 to-green-400'
  if (performance >= 75) return 'from-blue-600 to-blue-400'
  if (performance >= 60) return 'from-yellow-600 to-yellow-400'
  return 'from-red-600 to-red-400'
}

export function calculateAveragePerformance(athletes: Athlete[]): number {
  if (athletes.length === 0) return 0
  const total = athletes.reduce((sum, a) => sum + a.performance, 0)
  return Math.round((total / athletes.length) * 100) / 100
}

export function filterAthletesBySport(athletes: Athlete[], sport: string): Athlete[] {
  return athletes.filter((a) => a.sport === sport)
}

export function filterQualifiedAthletes(athletes: Athlete[]): Athlete[] {
  return athletes.filter((a) => a.qualified)
}

export function filterPotentialAthletes(athletes: Athlete[], minPerformance: number = 87): Athlete[] {
  return athletes.filter((a) => a.potential && a.performance >= minPerformance)
}

export function filterInjuredAthletes(athletes: Athlete[]): Athlete[] {
  return athletes.filter((a) => a.injured)
}

export function getTotalMedals(athletes: Athlete[]): { gold: number; silver: number; bronze: number } {
  return athletes.reduce(
    (acc, a) => ({
      gold: acc.gold + (a.medals?.gold || 0),
      silver: acc.silver + (a.medals?.silver || 0),
      bronze: acc.bronze + (a.medals?.bronze || 0),
    }),
    { gold: 0, silver: 0, bronze: 0 }
  )
}

// Coach utilities
export function getCoachExperienceLevel(years: number): string {
  if (years >= 20) return 'Expert'
  if (years >= 10) return 'Senior'
  if (years >= 5) return 'Intermediate'
  return 'Junior'
}

export function calculateAverageEfficiency(coaches: Coach[]): number {
  const coachesWithEfficiency = coaches.filter((c) => c.efficiency)
  if (coachesWithEfficiency.length === 0) return 0
  const total = coachesWithEfficiency.reduce((sum, c) => sum + (c.efficiency || 0), 0)
  return Math.round((total / coachesWithEfficiency.length) * 100) / 100
}

// Statistics
export function countBySport(athletes: Athlete[]): { [sport: string]: number } {
  return athletes.reduce(
    (acc, a) => ({
      ...acc,
      [a.sport]: (acc[a.sport] || 0) + 1,
    }),
    {} as { [sport: string]: number }
  )
}

export function getTopAthletes(athletes: Athlete[], limit: number = 5): Athlete[] {
  return [...athletes].sort((a, b) => b.performance - a.performance).slice(0, limit)
}

export function getBottomAthletes(athletes: Athlete[], limit: number = 5): Athlete[] {
  return [...athletes].sort((a, b) => a.performance - b.performance).slice(0, limit)
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key])
      if (!acc[groupKey]) {
        acc[groupKey] = []
      }
      acc[groupKey].push(item)
      return acc
    },
    {} as { [key: string]: T[] }
  )
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Error handling
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
