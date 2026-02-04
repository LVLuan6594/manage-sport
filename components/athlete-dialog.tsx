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
  specialty?: string
}

interface Athlete {
  id?: number
  name: string
  sport: string
  performance: number
  coach: string
  joinDate?: string
  qualified?: boolean
  joinMonth?: string
  joinYear?: number
  medals?: { gold: number; silver: number; bronze: number }
  injured?: boolean
  potential?: boolean
}

interface AthleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (athlete: Athlete) => void
  athlete?: Athlete
  sports: Array<{ name: string }>
  coaches?: Coach[]
}

export function AthleteDialog({ isOpen, onClose, onSave, athlete, sports, coaches = [] }: AthleteDialogProps) {
  const [formData, setFormData] = useState<Athlete>({
    name: '',
    sport: '',
    performance: 0,
    coach: '',
    joinDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (athlete) {
      setFormData(athlete)
    } else {
      setFormData({
        name: '',
        sport: '',
        performance: 0,
        coach: '',
        joinDate: new Date().toISOString().split('T')[0],
      })
    }
  }, [athlete, isOpen])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.sport.trim()) {
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
            {athlete ? 'Chỉnh Sửa Vận Động Viên' : 'Thêm Vận Động Viên Mới'}
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            {athlete ? 'Cập nhật thông tin vận động viên' : 'Điền thông tin để thêm vận động viên mới'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-blue-900 text-sm mb-2 block">Họ và Tên</label>
            <Input
              placeholder="VD: Nguyễn Văn A"
              value={formData.name ?? ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Môn Thể Thao</label>
            <Select value={formData.sport ?? ''} onValueChange={(value) => setFormData({ ...formData, sport: value })}>
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
            <label className="text-blue-900 text-sm mb-2 block">Hiệu Suất (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.performance ?? 0}
              onChange={(e) => setFormData({ ...formData, performance: parseInt(e.target.value) || 0 })}
              className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
            />
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Huấn Luyện Viên (Không bắt buộc)</label>
            <Select value={formData.coach || 'none'} onValueChange={(value) => setFormData({ ...formData, coach: value === 'none' ? '' : value })}>
              <SelectTrigger className="bg-white border-blue-300 text-blue-900">
                <SelectValue placeholder="Chọn huấn luyện viên" />
              </SelectTrigger>
              <SelectContent className="bg-white border-blue-300">
                <SelectItem value="none" className="text-blue-900">
                  Không chọn
                </SelectItem>
                {coaches.map((coach) => (
                  <SelectItem key={coach.name} value={coach.name} className="text-blue-900">
                    {coach.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-blue-900 text-sm mb-2 block">Ngày Tham Gia</label>
            <Input
              type="date"
              value={formData.joinDate ?? ''}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className="bg-white border-blue-300 text-blue-900"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white mt-4">
            {athlete ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
