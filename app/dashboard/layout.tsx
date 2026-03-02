'use client'

import React from "react"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Sidebar } from '@/components/sidebar'
import { FloatingChatbotButton } from '@/components/floating-chatbot-button'
import { Toaster } from '@/components/ui/toaster'
import UserMenu from '@/components/user-menu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return // wait for auth to initialize
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated) return null

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white">{children}</div>
      <UserMenu />
      <Toaster />
      <FloatingChatbotButton />
    </div>
  )
}
