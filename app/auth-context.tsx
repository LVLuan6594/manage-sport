'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string; role?: string; sport?: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const { username, role, sport } = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUser({ username, role, sport })
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    // Admin login
    if (username === 'admin' && password === 'admin@123') {
      setIsAuthenticated(true)
      setUser({ username, role: 'admin' })
      localStorage.setItem('auth', JSON.stringify({ username, role: 'admin' }))
      return true
    }
    // Coach logins
    if (username === 'coach_boxing' && password === 'coach@123') {
      setIsAuthenticated(true)
      setUser({ username, role: 'coach', sport: '🥊 Võ thuật' })
      localStorage.setItem('auth', JSON.stringify({ username, role: 'coach', sport: '🥊 Võ thuật' }))
      return true
    }
    if (username === 'coach_swimming' && password === 'coach@123') {
      setIsAuthenticated(true)
      setUser({ username, role: 'coach', sport: '🏊 Bơi lội' })
      localStorage.setItem('auth', JSON.stringify({ username, role: 'coach', sport: '🏊 Bơi lội' }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
