/**
 * Custom Hooks for Data Fetching
 * Tái sử dụng logic data fetching trong nhiều component
 */

import { useState, useEffect } from 'react'
import { Athlete, Coach, Sport, TrainingPlan, TrainingSession, Application } from '@/lib/types'
import { apiService } from '@/lib/api-service'

// Athletes Hook
export function useAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAthletes()
        setAthletes(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch athletes')
      } finally {
        setLoading(false)
      }
    }

    fetchAthletes()
  }, [])

  return { athletes, loading, error, refetch: async () => setAthletes(await apiService.getAthletes()) }
}

// Single Athlete Hook
export function useAthlete(id: number) {
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAthleteById(id)
        setAthlete(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch athlete')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAthlete()
    }
  }, [id])

  return { athlete, loading, error }
}

// Coaches Hook
export function useCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true)
        const data = await apiService.getCoaches()
        setCoaches(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coaches')
      } finally {
        setLoading(false)
      }
    }

    fetchCoaches()
  }, [])

  return { coaches, loading, error, refetch: async () => setCoaches(await apiService.getCoaches()) }
}

// Sports Hook
export function useSports() {
  const [sports, setSports] = useState<Sport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true)
        const data = await apiService.getSports()
        setSports(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sports')
      } finally {
        setLoading(false)
      }
    }

    fetchSports()
  }, [])

  return { sports, loading, error }
}

// Athletes by Sport Hook
export function useAthletesBySport(sport: string) {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAthletesBySport(sport)
        setAthletes(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch athletes')
      } finally {
        setLoading(false)
      }
    }

    if (sport) {
      fetchAthletes()
    }
  }, [sport])

  return { athletes, loading, error }
}

// Training Plans Hook
export function useTrainingPlans() {
  const [plans, setPlans] = useState<TrainingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const data = await apiService.getTrainingPlans()
        setPlans(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plans')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return { plans, loading, error, refetch: async () => setPlans(await apiService.getTrainingPlans()) }
}

// Training Sessions Hook
export function useTrainingSessions(athleteId?: number) {
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const data = await apiService.getTrainingSessions(athleteId)
        setSessions(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sessions')
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [athleteId])

  return { sessions, loading, error, refetch: async () => setSessions(await apiService.getTrainingSessions(athleteId)) }
}

// Applications Hook
export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const data = await apiService.getApplications()
        setApplications(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch applications')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  return { applications, loading, error, refetch: async () => setApplications(await apiService.getApplications()) }
}
