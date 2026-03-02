'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

interface Athlete {
  id: number
  name: string
  sport: string
  performance: number
}

export default function CoachAthletesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await fetch('/api/athletes')
        if (res.ok) {
          const data = await res.json()
          // Filter athletes by coach's sport
          const filtered = data.filter((a: any) => a.sport === user?.sport)
          setAthletes(filtered)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.sport) {
      fetchAthletes()
    }
  }, [user?.sport])

  if (loading) {
    return (
      <main className="p-4 lg:p-8">
        <div className="text-center text-blue-600">Đang tải...</div>
      </main>
    )
  }

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/coach">
            <Button variant="outline" className="mb-4">
              ← Quay Lại Bảng Điều Khiển
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Vận Động Viên Được Phân Công</h1>
          <p className="text-blue-600">Môn: {user?.sport}</p>
        </div>

        <Card className="bg-white border-blue-300 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-900">Danh Sách Vận Động Viên ({athletes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {athletes.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p>Chưa có vận động viên nào được phân công</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {athletes.map((athlete) => (
                  <Link
                    key={athlete.id}
                    href={`/coach/athletes/${athlete.id}`}
                  >
                    <div className="border border-blue-200 rounded-lg p-4 hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {athlete.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-blue-900 truncate">{athlete.name}</h3>
                          <p className="text-sm text-gray-600">{athlete.sport}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xs text-gray-600">Hiệu suất</p>
                        <p className="text-lg font-bold text-blue-700">{athlete.performance}%</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
