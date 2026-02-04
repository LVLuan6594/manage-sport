'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Criteria {
  id: string
  name: string
  type: string
  unit: string
  options?: string[]
  description?: string
  min?: number
  max?: number
}

interface TrainingCriteria {
  criteria: Criteria[]
}

export default function LogTrainingSession() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  
  const athleteId = params.athleteId as string
  const [criteria, setCriteria] = useState<Criteria[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [athleteName, setAthleteName] = useState('')
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0])
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch athlete info
        const athletesRes = await fetch('/api/athletes')
        if (athletesRes.ok) {
          const athletes = await athletesRes.json()
          const athlete = athletes.find((a: any) => a.id === parseInt(athleteId))
          if (athlete) {
            setAthleteName(athlete.name)

            // Fetch training criteria
            const criteriaRes = await fetch('/public/data/training-criteria.json')
            if (criteriaRes.ok) {
              const criteriaData = await criteriaRes.json()
              const sportCriteria = criteriaData[athlete.sport]
              if (sportCriteria) {
                setCriteria(sportCriteria.criteria)
                // Initialize form data
                const initial: { [key: string]: string | number } = {}
                sportCriteria.criteria.forEach((c: Criteria) => {
                  initial[c.id] = ''
                })
                setFormData(initial)
              }
            }
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

  const handleChange = (fieldId: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const session = {
        athleteId: parseInt(athleteId),
        athleteName,
        sport: user?.sport,
        coachUsername: user?.username,
        sessionDate,
        metrics: formData,
      }

      const res = await fetch('/api/training-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      })

      if (res.ok) {
        alert('Lưu thông số luyện tập thành công!')
        router.push(`/coach/athletes/${athleteId}`)
      } else {
        alert('Lỗi khi lưu thông số')
      }
    } catch (error) {
      console.error(error)
      alert('Lỗi khi lưu thông số')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="p-4 lg:p-8">
        <div className="text-center text-blue-600">Đang tải...</div>
      </main>
    )
  }

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4"
          >
            ← Quay Lại
          </Button>
          <h1 className="text-3xl font-bold text-blue-900">Nhập Thông Số Luyện Tập</h1>
          <p className="text-blue-600 mt-2">Vận động viên: {athleteName}</p>
        </div>

        <Card className="bg-white border-blue-300 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-900">Buổi Luyện Tập Ngày {sessionDate}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Ngày Luyện Tập <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {criteria.map((crit) => (
                <div key={crit.id}>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    {crit.name}
                    {crit.unit && <span className="text-gray-600 text-xs ml-2">({crit.unit})</span>}
                  </label>
                  {crit.description && (
                    <p className="text-xs text-gray-600 mb-2">{crit.description}</p>
                  )}

                  {crit.type === 'number' && (
                    <input
                      type="number"
                      value={formData[crit.id]}
                      onChange={(e) => handleChange(crit.id, e.target.value)}
                      step={0.1}
                      min={crit.min}
                      max={crit.max}
                      placeholder={`${crit.min || 0} - ${crit.max || 'không giới hạn'}`}
                      className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  )}

                  {crit.type === 'select' && (
                    <select
                      value={formData[crit.id]}
                      onChange={(e) => handleChange(crit.id, e.target.value)}
                      className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">-- Chọn --</option>
                      {crit.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {crit.type === 'text' && (
                    <textarea
                      value={formData[crit.id]}
                      onChange={(e) => handleChange(crit.id, e.target.value)}
                      placeholder="Nhập ghi chú"
                      rows={2}
                      className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}

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
                  {submitting ? 'Đang Lưu...' : 'Lưu Thông Số'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
