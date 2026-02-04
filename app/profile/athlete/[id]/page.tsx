'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Athlete {
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

export default function AthleteProfile() {
  const router = useRouter()
  const params = useParams()
  const athleteId = params.id as string
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const res = await fetch('/api/athletes')
        if (res.ok) {
          const athletes = await res.json()
          const found = athletes.find((a: any) => a.id === parseInt(athleteId))
          setAthlete(found)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAthlete()
  }, [athleteId])

  if (loading) {
    return (
      <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="text-center text-blue-600">Đang tải...</div>
      </main>
    )
  }

  if (!athlete) {
    return (
      <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="text-center text-red-600">Không tìm thấy vận động viên</div>
      </main>
    )
  }

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Quay Lại
        </Button>

        <Card className="bg-white shadow-lg border-blue-300 mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl">{athlete.name}</CardTitle>
            <p className="text-blue-100 mt-2">{athlete.sport}</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Thông Tin Cá Nhân</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-semibold">Tuổi:</span> {athlete.age || 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Chiều cao:</span> {athlete.height || 'N/A'} cm
                  </div>
                  <div>
                    <span className="font-semibold">Huấn luyện viên:</span> {athlete.coach || 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Ngày tham gia:</span> {athlete.joinDate || 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Thống Kê Hiệu Suất</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-semibold">Hiệu suất:</span>
                    <div className="bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-full"
                        style={{ width: `${athlete.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-blue-600 font-semibold">{athlete.performance}%</span>
                  </div>
                  <div>
                    <span className="font-semibold">Đạt tiêu chuẩn:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${athlete.qualified ? 'bg-green-600' : 'bg-red-600'}`}>
                      {athlete.qualified ? 'Có' : 'Không'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Tiềm năng:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${athlete.potential ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {athlete.potential ? 'Có' : 'Không'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Huy Chương</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥇</span>
                    <span>Vàng: {athlete.medals.gold}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥈</span>
                    <span>Bạc: {athlete.medals.silver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥉</span>
                    <span>Đồng: {athlete.medals.bronze}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Tình Trạng</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Chấn thương:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                        athlete.injured ? 'bg-red-600' : 'bg-green-600'
                      }`}
                    >
                      {athlete.injured ? 'Có' : 'Không'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
