'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Users, Dumbbell, TrendingUp, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

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
}

interface Coach {
  id: string
  name: string
  specialty: string
  experience: number
  athletesManaged: number
  efficiency: number
}

const performanceData = [
  { month: 'Jan', athletes: 24, coaches: 8 },
  { month: 'Feb', athletes: 32, coaches: 12 },
  { month: 'Mar', athletes: 28, coaches: 10 },
  { month: 'Apr', athletes: 38, coaches: 14 },
  { month: 'May', athletes: 42, coaches: 16 },
  { month: 'Jun', athletes: 48, coaches: 18 },
]

const athleteProgressData = [
  { week: 'W1', strength: 65, speed: 45, endurance: 70 },
  { week: 'W2', strength: 70, speed: 50, endurance: 75 },
  { week: 'W3', strength: 75, speed: 55, endurance: 80 },
  { week: 'W4', strength: 82, speed: 62, endurance: 85 },
]

export default function DashboardPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [athletesRes, coachesRes] = await Promise.all([
          fetch('/api/athletes'),
          fetch('/api/coaches'),
        ])

        if (athletesRes.ok) setAthletes(await athletesRes.json())
        if (coachesRes.ok) setCoaches(await coachesRes.json())
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalAthletes = athletes.length
  const totalCoaches = coaches.length
  const qualifiedAthletes = athletes.filter((a) => a.qualified).length
  const totalMedals = athletes.reduce((sum, a) => sum + (a.medals?.gold || 0) + (a.medals?.silver || 0) + (a.medals?.bronze || 0), 0)

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Bảng Điều Khiển</h1>
          <p className="text-blue-600">Chào mừng đến Hệ Thống Quản Lý Thể Thao</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-300 hover:border-blue-500 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-blue-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=athletes" alt="Athletes" />
                  <AvatarFallback className="bg-blue-500 text-white">VA</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-medium text-blue-900">Tổng Vận Động Viên</CardTitle>
              </div>
              <Dumbbell className="h-4 w-4 text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{loading ? '...' : totalAthletes}</div>
              <p className="text-xs text-blue-600 mt-1">Tổng cộng từ cơ sở dữ liệu</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-300 hover:border-orange-500 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-orange-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=coaches" alt="Coaches" />
                  <AvatarFallback className="bg-orange-500 text-white">HLV</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-medium text-blue-900">Tổng Huấn Luyện Viên</CardTitle>
              </div>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{loading ? '...' : totalCoaches}</div>
              <p className="text-xs text-blue-600 mt-1">Quản lý các vận động viên</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border-green-300 hover:border-green-500 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-green-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=qualified" alt="Qualified" />
                  <AvatarFallback className="bg-green-500 text-white">ĐTC</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-medium text-blue-900">Vận Động Viên Đạt Tiêu Chuẩn</CardTitle>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{loading ? '...' : qualifiedAthletes}</div>
              <p className="text-xs text-blue-600 mt-1">Sẵn sàng thi quốc gia</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-300 hover:border-blue-500 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-yellow-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=medals" alt="Medals" />
                  <AvatarFallback className="bg-yellow-500 text-white">HC</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-medium text-blue-900">Tổng Huy Chương</CardTitle>
              </div>
              <Award className="h-4 w-4 text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{loading ? '...' : totalMedals}</div>
              <p className="text-xs text-blue-600 mt-1">Tính từ tất cả vận động viên</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-900">Xu Hướng Tăng Trưởng</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar dataKey="athletes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="coaches" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-900">Hiệu Suất Vận Động Viên</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={athleteProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="strength" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="speed" stroke="#f97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="endurance" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-blue-900">Hoạt Động Gần Đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Smith', action: 'Hoàn thành buổi tập luyện', time: '2 giờ trước' },
                { name: 'Sarah Johnson', action: 'Đạt kỷ lục cá nhân mới', time: '4 giờ trước' },
                { name: 'Mike Davis', action: 'Tham dự buổi coaching', time: '6 giờ trước' },
                { name: 'Emma Wilson', action: 'Bắt đầu chương trình mới', time: '1 ngày trước' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pb-4 border-b border-slate-700/50 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.action}</p>
                  </div>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
