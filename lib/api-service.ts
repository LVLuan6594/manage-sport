/**
 * API Service Layer
 * Tất cả các gọi API được tập trung tại đây
 * Dễ dàng thay thế từ local JSON sang backend API sau này
 */

import { Athlete, Coach, Sport, TrainingPlan, TrainingSession, Application } from './types'

const API_BASE = '/api'

class ApiService {
  private async fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, options)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API Error at ${endpoint}:`, error)
      throw error
    }
  }

  // Athletes
  async getAthletes(): Promise<Athlete[]> {
    return this.fetchData('/athletes')
  }

  async getAthleteById(id: number): Promise<Athlete | null> {
    const athletes = await this.getAthletes()
    return athletes.find((a) => a.id === id) || null
  }

  async createAthlete(data: Omit<Athlete, 'id'>): Promise<Athlete> {
    return this.fetchData('/athletes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  async updateAthlete(id: number, data: Partial<Athlete>): Promise<Athlete> {
    return this.fetchData('/athletes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    })
  }

  async deleteAthlete(id: number): Promise<void> {
    await this.fetchData('/athletes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  // Coaches
  async getCoaches(): Promise<Coach[]> {
    return this.fetchData('/coaches')
  }

  async getCoachById(id: string | number): Promise<Coach | null> {
    const coaches = await this.getCoaches()
    return coaches.find((c) => c.id === id) || null
  }

  async createCoach(data: Omit<Coach, 'id'>): Promise<Coach> {
    return this.fetchData('/coaches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  // Sports
  async getSports(): Promise<Sport[]> {
    return this.fetchData('/sports')
  }

  // Training Plans
  async getTrainingPlans(): Promise<TrainingPlan[]> {
    return this.fetchData('/training-plans')
  }

  async createTrainingPlan(data: Omit<TrainingPlan, 'id' | 'createdAt'>): Promise<TrainingPlan> {
    return this.fetchData('/training-plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  // Training Sessions
  async getTrainingSessions(athleteId?: number): Promise<TrainingSession[]> {
    const url = athleteId ? `/training-sessions?athleteId=${athleteId}` : '/training-sessions'
    return this.fetchData(url)
  }

  async createTrainingSession(
    data: Omit<TrainingSession, 'id' | 'createdAt'>
  ): Promise<TrainingSession> {
    return this.fetchData('/training-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  // Applications
  async getApplications(): Promise<Application[]> {
    return this.fetchData('/applications')
  }

  async createApplication(data: Omit<Application, 'id' | 'createdAt'>): Promise<Application> {
    return this.fetchData('/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  // Athletes by Sport
  async getAthletesBySport(sport: string): Promise<Athlete[]> {
    const athletes = await this.getAthletes()
    return athletes.filter((a) => a.sport === sport)
  }

  // Stats
  async getStats() {
    const [athletes, coaches, sports] = await Promise.all([
      this.getAthletes(),
      this.getCoaches(),
      this.getSports(),
    ])
    return { athletes, coaches, sports }
  }
}

export const apiService = new ApiService()
