'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Athlete {
  id: number
  name: string
  sport: string
}

interface TrainingPlan {
  id: string
  title: string
  description: string
  athleteId: number
  athleteName: string
  sport: string
  startDate: string
  duration: number
  goals: string
  createdAt: string
}

export default function CreateTrainingPlan() {
  const router = useRouter()
  const { user } = useAuth()
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    athleteId: '',
    startDate: '',
    duration: 4,
    goals: '',
  })

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await fetch('/api/athletes')
        if (res.ok) {
          const data = await res.json()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const athleteId = parseInt(form.athleteId)
      const athlete = athletes.find((a) => a.id === athleteId)

      const plan: TrainingPlan = {
        id: '',
        ...form,
        athleteId: athleteId,
        athleteName: athlete?.name || '',
        sport: user?.sport || '',
        createdAt: '',
      }

      const res = await fetch('/api/training-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      if (res.ok) {
        alert('Tạo kế hoạch luyện tập thành công!')
        router.push('/coach/training-plans')
      } else {
        alert('Lỗi khi tạo kế hoạch')
      }
    } catch (error) {
      console.error(error)
      alert('Lỗi khi tạo kế hoạch')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4"
          >
            ← Quay Lại
          </Button>
          <h1 className="text-3xl font-bold text-blue-900">Tạo Kế Hoạch Luyện Tập Mới</h1>
          <p className="text-blue-600 mt-2">Môn: {user?.sport}</p>
        </div>

        <Card className="bg-white border-blue-300 shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Chọn Vận Động Viên <span className="text-red-500">*</span>
                </label>
                <select
                  name="athleteId"
                  value={form.athleteId}
                  onChange={handleChange}
                  required
                  disabled={loading || athletes.length === 0}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">-- Chọn vận động viên --</option>
                  {athletes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                {athletes.length === 0 && !loading && (
                  <p className="text-red-500 text-xs mt-1">Không có vận động viên nào trong môn này</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Tiêu Đề Kế Hoạch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="VD: Kế hoạch tập sức bền"
                  required
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Mô Tả Chi Tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Mô tả chi tiết về kế hoạch luyện tập"
                  required
                  rows={4}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Ngày Bắt Đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Thời Hạn (Tuần) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    min="1"
                    max="52"
                    required
                    className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Mục Tiêu Luyện Tập <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="goals"
                  value={form.goals}
                  onChange={handleChange}
                  placeholder="Mục tiêu cần đạt được"
                  required
                  rows={3}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {submitting ? 'Đang Lưu...' : 'Tạo Kế Hoạch'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
