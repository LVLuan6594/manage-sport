'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Coach {
  id?: string
  name: string
  specialty?: string
  experience?: number
  athletesManaged?: number
  efficiency?: number
  email?: string
  phone?: string
  certification?: string
  joinDate?: string
}

export default function CoachProfile() {
  const router = useRouter()
  const params = useParams()
  const coachId = params.id as string
  const [coach, setCoach] = useState<Coach | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await fetch('/api/coaches')
        if (res.ok) {
          const coaches = await res.json()
          const found = coaches.find((c: any) => c.id?.toString() === coachId)
          setCoach(found)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoach()
  }, [coachId])

  if (loading) {
    return (
      <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="text-center text-blue-600">Đang tải...</div>
      </main>
    )
  }

  if (!coach) {
    return (
      <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="text-center text-red-600">Không tìm thấy huấn luyện viên</div>
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

        <Card className="bg-white shadow-lg border-orange-300 mb-6">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl">{coach.name}</CardTitle>
            <p className="text-orange-100 mt-2">Huấn Luyện Viên</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Thông Tin Cơ Bản</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-semibold">Chuyên môn:</span> {coach.specialty || 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Kinh nghiệm:</span> {coach.experience || 'N/A'} năm
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {coach.email || 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Điện thoại:</span> {coach.phone || 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Hiệu Suất Quản Lý</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-semibold">Vận động viên quản lý:</span> {coach.athletesManaged || 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Hiệu suất:</span>
                    <div className="bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-600 to-orange-400 h-full"
                        style={{ width: `${coach.efficiency || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-orange-600 font-semibold">{coach.efficiency || 0}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Chứng Chỉ & Định Hướng</h3>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700">{coach.certification || 'Chưa cập nhật chứng chỉ'}</p>
              </div>
            </div>

            {coach.joinDate && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Ngày tham gia:</span> {coach.joinDate}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
