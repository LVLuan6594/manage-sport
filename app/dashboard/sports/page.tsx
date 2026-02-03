'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Sport {
  id?: string
  name: string
  description: string
  athleteCount: number
  achievements: string
}

export default function SportsPage() {
  const [sports, setSports] = useState<Sport[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSport, setEditingSport] = useState<Sport | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    athleteCount: 0,
    achievements: '',
  })

  useEffect(() => {
    fetchSports()
  }, [])

  const fetchSports = async () => {
    try {
      const res = await fetch('/api/sports')
      const data = await res.json()
      setSports(data)
    } catch (error) {
      console.error('Error fetching sports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSport = async () => {
    if (!formData.name.trim()) return

    try {
      const res = await fetch('/api/sports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchSports()
        setFormData({ name: '', description: '', athleteCount: 0, achievements: '' })
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error('Error adding sport:', error)
    }
  }

  const handleEditSport = async () => {
    if (!editingSport) return

    try {
      const res = await fetch('/api/sports', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingSport.name, ...formData }),
      })

      if (res.ok) {
        fetchSports()
        setFormData({ name: '', description: '', athleteCount: 0, achievements: '' })
        setEditingSport(null)
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error('Error updating sport:', error)
    }
  }

  const handleDeleteSport = async (name: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa môn thể thao này?')) return

    try {
      const res = await fetch('/api/sports', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: name }),
      })

      if (res.ok) {
        fetchSports()
      }
    } catch (error) {
      console.error('Error deleting sport:', error)
    }
  }

  const handleOpenDialog = (sport?: Sport) => {
    if (sport) {
      setEditingSport(sport)
      setFormData({
        name: sport.name,
        description: sport.description,
        athleteCount: sport.athleteCount,
        achievements: sport.achievements,
      })
    } else {
      setEditingSport(null)
      setFormData({ name: '', description: '', athleteCount: 0, achievements: '' })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingSport(null)
    setFormData({ name: '', description: '', athleteCount: 0, achievements: '' })
  }

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Môn Thể Thao</h1>
          <p className="text-blue-600">Quản lý các môn thể thao và danh mục</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 w-fit"
              onClick={() => handleOpenDialog()}
            >
              <Plus size={20} className="mr-2" />
              Thêm Môn Thể Thao
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-blue-500/30">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingSport ? 'Chỉnh Sửa Môn Thể Thao' : 'Thêm Môn Thể Thao Mới'}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {editingSport ? 'Cập nhật thông tin môn thể thao' : 'Điền thông tin để thêm môn thể thao mới'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-white text-sm mb-2 block">Tên Môn Thể Thao</label>
                <Input
                  placeholder="VD: Bóng Rổ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800/50 border-blue-400/30 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Mô Tả</label>
                <Input
                  placeholder="VD: Một môn thể thao năng động..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-800/50 border-blue-400/30 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Số Vận Động Viên</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.athleteCount}
                  onChange={(e) => setFormData({ ...formData, athleteCount: parseInt(e.target.value) || 0 })}
                  className="bg-slate-800/50 border-blue-400/30 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Thành Tích</label>
                <Input
                  placeholder="VD: Huy chương vàng tại giải quốc gia"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  className="bg-slate-800/50 border-blue-400/30 text-white"
                />
              </div>
              <Button
                onClick={editingSport ? handleEditSport : handleAddSport}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 mt-4"
              >
                {editingSport ? 'Cập Nhật' : 'Thêm'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Tìm kiếm môn thể thao..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSports.map((sport) => (
          <Card key={sport.name} className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30 hover:border-blue-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white text-lg">{sport.name}</CardTitle>
              <p className="text-sm text-slate-400 mt-1">{sport.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-400">Số Vận Động Viên</p>
                  <p className="text-white font-bold text-lg">{sport.athleteCount}</p>
                </div>
                <div>
                  <p className="text-slate-400">Thành Tích</p>
                  <Badge className="bg-green-500/20 text-green-400 mt-1">{sport.achievements || 'Chưa có'}</Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-blue-400/30 text-slate-300 hover:bg-blue-500/10 bg-transparent"
                  onClick={() => handleOpenDialog(sport)}
                >
                  <Edit2 size={16} className="mr-1" />
                  Sửa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-400/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  onClick={() => handleDeleteSport(sport.name)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSports.length === 0 && (
        <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="text-blue-300 mb-4" size={48} />
            <p className="text-blue-900 text-lg">Không tìm thấy môn thể thao nào</p>
            <p className="text-blue-600 text-sm mt-2">Hãy thêm môn thể thao mới để bắt đầu</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
