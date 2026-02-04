'use client'

import { useEffect, useState } from 'react'
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

export default function CoachDashboard() {
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
        console.error('Error fetching athletes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAthletes()
  }, [user?.sport])

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Bảng Điều Khiển Huấn Luyện Viên</h1>
          <p className="text-blue-600">Chào mừng {user?.username} - Quản lý môn: <strong>{user?.sport}</strong></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Tổng Vận Động Viên</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{loading ? '...' : athletes.length}</div>
              <p className="text-xs text-blue-600 mt-1">Dưới quản lý của bạn</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border-green-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Hiệu Suất Trung Bình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">
                {loading
                  ? '...'
                  : (athletes.reduce((sum, a) => sum + a.performance, 0) / athletes.length || 0).toFixed(1)}
              </div>
              <p className="text-xs text-blue-600 mt-1">Điểm trung bình</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Kế Hoạch Luyện Tập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">-</div>
              <p className="text-xs text-blue-600 mt-1">Đang xây dựng</p>
            </CardContent>
          </Card>
        </div>

        {/* Vận Động Viên của Huấn Luyện Viên */}
        <Card className="bg-white border-blue-300 shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-900">Vận Động Viên Của Tôi</CardTitle>
              <Link href="/coach/training-plans/new">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Plus size={18} />
                  Tạo Kế Hoạch Luyện Tập
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Tên</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Môn Thể Thao</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Hiệu Suất</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-sm text-slate-500">
                        Đang tải...
                      </td>
                    </tr>
                  )}
                  {!loading && athletes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-sm text-slate-500">
                        Chưa có vận động viên nào được gán cho bạn
                      </td>
                    </tr>
                  )}
                  {athletes.map((athlete) => (
                    <tr key={athlete.id} className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-3">{athlete.name}</td>
                      <td className="px-4 py-3">{athlete.sport}</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {athlete.performance}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/coach/athletes/${athlete.id}`}>
                          <Button variant="outline" size="sm">
                            Xem Chi Tiết
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
