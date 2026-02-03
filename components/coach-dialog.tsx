'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Coach {
  id?: string
  name: string
  specialty: string
  experience: number
  certification?: string
  email?: string
  athletesManaged?: number
  efficiency?: number
}

interface CoachDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (coach: Coach) => void
  coach?: Coach
  sports: Array<{ name: string }>
}

export function CoachDialog({ isOpen, onClose, onSave, coach, sports }: CoachDialogProps) {
  const [formData, setFormData] = useState<Coach>({
    name: '',
    specialty: '',
    experience: 0,
    certification: '',
    email: '',
    athletesManaged: 0,
    efficiency: 0,
  })

  useEffect(() => {
    if (coach) {
      setFormData(coach)
    } else {
      setFormData({
        name: '',
        specialty: '',
        experience: 0,
        certification: '',
        email: '',
        athletesManaged: 0,
        efficiency: 0,
      })
    }
  }, [coach, isOpen])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.specialty.trim()) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-blue-300">
        <DialogHeader>
          <DialogTitle className="text-blue-900">
            {coach ? 'Chỉnh Sửa Huấn Luyện Viên' : 'Thêm Huấn Luyện Viên Mới'}
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            {coach ? 'Cập nhật thông tin huấn luyện viên' : 'Điền thông tin để thêm huấn luyện viên mới'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-blue-900 text-sm mb-2 block">Họ và Tên</label>
            <Input
              placeholder="VD: Trần Văn B"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Chuyên Gia Môn</label>
            <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
              <SelectTrigger className="bg-white border-blue-300 text-blue-900">
                <SelectValue placeholder="Chọn môn thể thao" />
              </SelectTrigger>
              <SelectContent className="bg-white border-blue-300">
                {sports.map((sport) => (
                  <SelectItem key={sport.name} value={sport.name} className="text-blue-900">
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Năm Kinh Nghiệm</label>
            <Input
              type="number"
              min="0"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Chứng Chỉ</label>
            <Input
              placeholder="VD: Bằng Cấp A"
              value={formData.certification}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white mt-4">
            {coach ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
