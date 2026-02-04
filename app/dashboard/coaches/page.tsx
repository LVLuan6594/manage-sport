'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Users, Upload } from 'lucide-react'
import { CoachDialog } from '@/components/coach-dialog'

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

interface Sport {
  name: string
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [sports, setSports] = useState<Sport[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoaches()
    fetchSports()
  }, [])

  const fetchCoaches = async () => {
    try {
      const res = await fetch('/api/coaches')
      const data = await res.json()
      setCoaches(data)
    } catch (error) {
      console.error('Error fetching coaches:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSports = async () => {
    try {
      const res = await fetch('/api/sports')
      const data = await res.json()
      setSports(data)
    } catch (error) {
      console.error('Error fetching sports:', error)
    }
  }

  const handleAddCoach = async (coach: Coach) => {
    try {
      const res = await fetch('/api/coaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coach),
      })

      if (res.ok) {
        fetchCoaches()
      }
    } catch (error) {
      console.error('Error adding coach:', error)
    }
  }

  const handleEditCoach = async (coach: Coach) => {
    try {
      const res = await fetch('/api/coaches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCoach?.name, ...coach }),
      })

      if (res.ok) {
        fetchCoaches()
        setEditingCoach(null)
      }
    } catch (error) {
      console.error('Error updating coach:', error)
    }
  }

  const handleDeleteCoach = async (name: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa huấn luyện viên này?')) return

    try {
      const res = await fetch('/api/coaches', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: name }),
      })

      if (res.ok) {
        fetchCoaches()
      }
    } catch (error) {
      console.error('Error deleting coach:', error)
    }
  }

  const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          const data = e.target?.result

          if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            const text = data as string
            const lines = text.split('\n').filter(line => line.trim())

            if (lines.length < 2) {
              alert('File phải có header và dữ liệu')
              return
            }

            const headers = lines[0].split(',').map((h: string) => h.trim())
            const nameIndex = headers.findIndex(h => h.toLowerCase().includes('tên') || h.toLowerCase().includes('name'))
            const specialtyIndex = headers.findIndex(h => h.toLowerCase().includes('chuyên') || h.toLowerCase().includes('special') || h.toLowerCase().includes('specialty'))
            const experienceIndex = headers.findIndex(h => h.toLowerCase().includes('kinh') || h.toLowerCase().includes('experience') || h.toLowerCase().includes('years'))
            const certificationIndex = headers.findIndex(h => h.toLowerCase().includes('chứng') || h.toLowerCase().includes('cert'))
            const emailIndex = headers.findIndex(h => h.toLowerCase().includes('email'))
            const athletesIndex = headers.findIndex(h => h.toLowerCase().includes('vận') || h.toLowerCase().includes('athlete'))
            const efficiencyIndex = headers.findIndex(h => h.toLowerCase().includes('eff') || h.toLowerCase().includes('efficiency'))

            if (nameIndex === -1) {
              alert('File phải có cột "Tên"')
              return
            }

            const newCoaches: Coach[] = []
            for (let i = 1; i < lines.length; i++) {
              const values = lines[i].split(',').map((v: string) => v.trim())
              const coach: Coach = {
                name: values[nameIndex] || '',
                specialty: specialtyIndex !== -1 ? values[specialtyIndex] || '' : '',
                experience: parseInt(values[experienceIndex] || '0') || 0,
                certification: certificationIndex !== -1 ? values[certificationIndex] || '' : undefined,
                email: emailIndex !== -1 ? values[emailIndex] || '' : undefined,
                athletesManaged: athletesIndex !== -1 ? parseInt(values[athletesIndex] || '0') || 0 : undefined,
                efficiency: efficiencyIndex !== -1 ? parseFloat(values[efficiencyIndex] || '0') || undefined : undefined,
              }

              if (coach.name) {
                newCoaches.push(coach)
              }
            }

            let addedCount = 0
            for (const newCoach of newCoaches) {
              await handleAddCoach(newCoach)
              addedCount++
            }

            alert(`Đã thêm thành công ${addedCount} huấn luyện viên từ CSV`)
          } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
            document.head.appendChild(script)

            script.onload = async () => {
              try {
                const XLSX = (window as any).XLSX
                const arrayBuffer = data as ArrayBuffer
                const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(worksheet)

                const headers = Object.keys(jsonData[0] || {})
                const nameIndex = headers.findIndex((h: string) => h.toLowerCase().includes('tên') || h.toLowerCase().includes('name'))
                const specialtyIndex = headers.findIndex((h: string) => h.toLowerCase().includes('chuyên') || h.toLowerCase().includes('special') || h.toLowerCase().includes('specialty'))
                const experienceIndex = headers.findIndex((h: string) => h.toLowerCase().includes('kinh') || h.toLowerCase().includes('experience') || h.toLowerCase().includes('years'))
                const certificationIndex = headers.findIndex((h: string) => h.toLowerCase().includes('chứng') || h.toLowerCase().includes('cert'))
                const emailIndex = headers.findIndex((h: string) => h.toLowerCase().includes('email'))
                const athletesIndex = headers.findIndex((h: string) => h.toLowerCase().includes('vận') || h.toLowerCase().includes('athlete'))
                const efficiencyIndex = headers.findIndex((h: string) => h.toLowerCase().includes('eff') || h.toLowerCase().includes('efficiency'))

                if (nameIndex === -1) {
                  alert('File phải có cột "Tên"')
                  return
                }

                let addedCount = 0
                for (const row of jsonData) {
                  const values = Object.values(row)
                  const coach: Coach = {
                    name: String(values[nameIndex] || '') || '',
                    specialty: specialtyIndex !== -1 ? String(values[specialtyIndex] || '') : '',
                    experience: parseInt(String(values[experienceIndex] || 0)) || 0,
                    certification: certificationIndex !== -1 ? String(values[certificationIndex] || '') : undefined,
                    email: emailIndex !== -1 ? String(values[emailIndex] || '') : undefined,
                    athletesManaged: athletesIndex !== -1 ? parseInt(String(values[athletesIndex] || 0)) || undefined : undefined,
                    efficiency: efficiencyIndex !== -1 ? parseFloat(String(values[efficiencyIndex] || 0)) || undefined : undefined,
                  }

                  if (coach.name) {
                    await handleAddCoach(coach)
                    addedCount++
                  }
                }

                alert(`Đã thêm thành công ${addedCount} huấn luyện viên từ Excel`)
              } catch (err) {
                console.error('Error parsing Excel:', err)
                alert('Lỗi khi xử lý file Excel')
              } finally {
                document.head.removeChild(script)
              }
            }

            script.onerror = () => {
              alert('Lỗi khi tải thư viện Excel. Vui lòng sử dụng CSV.')
            }
          } else {
            alert('Định dạng file không hỗ trợ. Vui lòng sử dụng CSV hoặc XLSX.')
          }

          event.target.value = ''
        } catch (err) {
          console.error('Error processing file:', err)
          alert('Lỗi khi xử lý file.')
        }
      }

      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }
    } catch (error) {
      console.error('Error importing file:', error)
      alert('Lỗi khi import file')
    }
  }

  const handleDialogSave = (coach: Coach) => {
    if (editingCoach) {
      handleEditCoach(coach)
    } else {
      handleAddCoach(coach)
    }
    setIsDialogOpen(false)
    setEditingCoach(null)
  }

  const handleOpenDialog = (coach?: Coach) => {
    if (coach) {
      setEditingCoach(coach)
    } else {
      setEditingCoach(null)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingCoach(null)
  }

  const filteredCoaches = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Huấn Luyện Viên</h1>
          <p className="text-blue-600">Quản lý đội huấn luyện viên và lịch biểu</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 w-fit"
            onClick={() => handleOpenDialog()}
          >
            <Plus size={20} className="mr-2" />
            Thêm Huấn Luyện Viên
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".csv,.txt,.xlsx,.xls"
              onChange={handleImportExcel}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 w-fit">
              <Upload size={20} className="mr-2" />
              Import (CSV/Excel)
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Tìm kiếm huấn luyện viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <Card
            key={coach.name}
            className="bg-gradient-to-br from-white to-slate-50 border-blue-300 hover:border-blue-500 transition-colors shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-blue-900">{coach.name}</CardTitle>
                <Badge className="w-fit bg-orange-100 text-orange-700 mt-2">{coach.specialty}</Badge>
              </div>
              <Avatar className="h-24 w-24 flex-shrink-0 ml-4 border-4 border-blue-300">
                <AvatarImage 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(coach.name)}`}
                  alt={coach.name}
                />
                <AvatarFallback className="text-white text-2xl font-bold bg-gradient-to-br from-blue-400 to-blue-600">
                  {coach.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-blue-600 uppercase tracking-wide">Kinh Nghiệm</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{coach.experience}</p>
                  <p className="text-xs text-blue-600">năm</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase tracking-wide">Vận Động Viên</p>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{coach.athletesManaged || 0}</p>
                  <p className="text-xs text-blue-600">đang quản lý</p>
                </div>
              </div>

              {coach.certification && (
                <div>
                  <p className="text-sm text-blue-600 mb-2">Chứng Chỉ</p>
                  <Badge className="bg-green-100 text-green-700">{coach.certification}</Badge>
                </div>
              )}

              {coach.email && (
                <div>
                  <p className="text-xs text-blue-600">Email Liên Hệ</p>
                  <p className="text-sm text-blue-900 font-medium break-all mt-1">{coach.email}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-blue-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-blue-300 text-blue-900 hover:bg-blue-50 bg-transparent"
                  onClick={() => handleOpenDialog(coach)}
                >
                  <Edit2 size={16} className="mr-1" />
                  Sửa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => handleDeleteCoach(coach.name)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCoaches.length === 0 && (
        <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="text-blue-300 mb-4" size={48} />
            <p className="text-blue-900 text-lg">Không tìm thấy huấn luyện viên nào</p>
            <p className="text-blue-600 text-sm mt-2">Hãy thêm huấn luyện viên mới để bắt đầu</p>
          </CardContent>
        </Card>
      )}

      <CoachDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleDialogSave}
        coach={editingCoach || undefined}
        sports={sports}
      />
    </main>
  )
}
