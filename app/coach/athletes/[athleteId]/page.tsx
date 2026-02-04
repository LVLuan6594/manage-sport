'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface Athlete {
  id: number
  name: string
  sport: string
  performance: number
}

interface TrainingSession {
  id: string
  sessionDate: string
  metrics: { [key: string]: any }
  createdAt: string
}

export default function CoachAthleteDetail() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()

  const athleteId = params.athleteId as string
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch athlete
        const athletesRes = await fetch('/api/athletes')
        if (athletesRes.ok) {
          const athletes = await athletesRes.json()
          const found = athletes.find((a: any) => a.id === parseInt(athleteId))
          setAthlete(found)

          // Fetch sessions for this athlete
          const sessionsRes = await fetch(`/api/training-sessions?athleteId=${athleteId}`)
          if (sessionsRes.ok) {
            setSessions(await sessionsRes.json())
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [athleteId])

  if (loading) {
    return (
      <main className="p-4 lg:p-8">
        <div className="text-center text-blue-600">Đang tải...</div>
      </main>
    )
  }

  if (!athlete) {
    return (
      <main className="p-4 lg:p-8">
        <div className="text-center text-red-600">Không tìm thấy vận động viên</div>
      </main>
    )
  }

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4"
          >
            ← Quay Lại
          </Button>
        </div>

        <Card className="bg-white border-blue-300 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-blue-900">{athlete.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Môn Thể Thao</p>
                <p className="text-lg font-semibold text-blue-900">{athlete.sport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hiệu Suất</p>
                <p className="text-lg font-semibold text-blue-900">{athlete.performance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-300 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-900">Lịch Sử Luyện Tập</CardTitle>
              <Link href={`/coach/athletes/${athleteId}/sessions/new`}>
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Plus size={18} />
                  Thêm Buổi Luyện Tập
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                Chưa có buổi luyện tập nào được ghi nhận
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">
                        Ngày {new Date(session.sessionDate).toLocaleDateString('vi-VN')}
                      </h4>
                      <span className="text-xs text-gray-600">
                        {new Date(session.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      {Object.entries(session.metrics).map(([key, value]) => {
                        if (value === '' || value === null) return null
                        return (
                          <div key={key}>
                            <span className="font-medium text-gray-700 capitalize">
                              {key}:
                            </span>
                            <span className="ml-2 text-gray-600">{String(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
