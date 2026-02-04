'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (login(username, password)) {
      router.push('/dashboard')
    } else {
      setError('Invalid username or password')
      setPassword('')
    }

    setIsLoading(false)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/sports-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-blue-600/30 bg-slate-950/90 backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Hệ thống Quản lý</CardTitle>
          <CardDescription className="text-blue-200">Trung tâm Huấn luyện và thi đấu Thể thao tỉnh Vĩnh Long</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/50">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Tên đăng nhập</label>
              <Input
                type="text"
                placeholder="Vui lòng nhập tên đăng nhập..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                className="bg-slate-800/50 border-blue-400/30 text-white placeholder:text-slate-400 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Mật khẩu</label>
              <Input
                type="password"
                placeholder="Vui lòng nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                className="bg-slate-800/50 border-blue-400/30 text-white placeholder:text-slate-400 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </Button>

            {/* <div className="pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-400 text-center mb-2 font-semibold">Tài khoản Demo:</p>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="bg-slate-800/30 p-2 rounded">
                  <p className="text-blue-400 font-mono">Admin: admin / admin@123</p>
                </div>
                <div className="bg-slate-800/30 p-2 rounded">
                  <p className="text-blue-400 font-mono">Huấn luyện viên Võ: coach_boxing / coach@123</p>
                </div>
                <div className="bg-slate-800/30 p-2 rounded">
                  <p className="text-blue-400 font-mono">Huấn luyện viên Bơi: coach_swimming / coach@123</p>
                </div>
              </div>
            </div> */}
          </form>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
