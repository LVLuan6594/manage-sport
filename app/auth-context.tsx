'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string; role?: string; sport?: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
  resetPassword: (username: string) => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // users store: username -> { password, role, sport? }
  const initializeUsers = () => {
    const stored = localStorage.getItem('users')
    if (!stored) {
      const defaults = {
        admin: { password: 'admin@123', role: 'admin' },
        coach_boxing: { password: 'coach@123', role: 'coach', sport: '🥊 Võ thuật' },
        coach_swimming: { password: 'coach@123', role: 'coach', sport: '🏊 Bơi lội' },
      }
      localStorage.setItem('users', JSON.stringify(defaults))
      return defaults
    }
    try {
      return JSON.parse(stored)
    } catch {
      return {}
    }
  }

  useEffect(() => {
    initializeUsers()
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const { username, role, sport } = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUser({ username, role, sport })
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    const users: Record<string, any> = initializeUsers()
    const record = users[username]
    if (record && record.password === password) {
      setIsAuthenticated(true)
      const { role, sport } = record
      setUser({ username, role, sport })
      localStorage.setItem('auth', JSON.stringify({ username, role, sport }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('auth')
  }

  const resetPassword = (username: string) => {
    const users: Record<string, any> = initializeUsers()
    if (!users[username]) return null
    // generate simple random password
    const newPass = Math.random().toString(36).slice(-8)
    users[username].password = newPass
    localStorage.setItem('users', JSON.stringify(users))
    return newPass
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading, resetPassword }}>
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
