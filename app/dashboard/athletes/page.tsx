'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Medal, Upload } from 'lucide-react'
import { AthleteDialog } from '@/components/athlete-dialog'

interface Coach {
  id?: string
  name: string
}

interface Athlete {
  id?: number
  name: string
  sport: string
  performance: number
  coach: string
  joinDate?: string
  qualified?: boolean
  medals?: { gold: number; silver: number; bronze: number }
  injured?: boolean
  potential?: boolean
  age?: number
  height?: number
  joinMonth?: string
  joinYear?: number
}

interface Sport {
  name: string
}

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [sports, setSports] = useState<Sport[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('All')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAthletes()
    fetchSports()
    fetchCoaches()
  }, [])

  const fetchAthletes = async () => {
    try {
      const res = await fetch('/api/athletes')
      const data = await res.json()
      setAthletes(data)
    } catch (error) {
      console.error('Error fetching athletes:', error)
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

  const fetchCoaches = async () => {
    try {
      const res = await fetch('/api/coaches')
      const data = await res.json()
      setCoaches(data)
    } catch (error) {
      console.error('Error fetching coaches:', error)
    }
  }

  const handleAddAthlete = async (athlete: Athlete) => {
    try {
      const res = await fetch('/api/athletes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(athlete),
      })

      if (res.ok) {
        fetchAthletes()
      }
    } catch (error) {
      console.error('Error adding athlete:', error)
    }
  }

  const handleEditAthlete = async (athlete: Athlete) => {
    try {
      const res = await fetch('/api/athletes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingAthlete?.id, ...athlete }),
      })

      if (res.ok) {
        fetchAthletes()
        setEditingAthlete(null)
      }
    } catch (error) {
      console.error('Error updating athlete:', error)
    }
  }

  const handleDeleteAthlete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xóa vận động viên này?')) return

    try {
      const res = await fetch(`/api/athletes?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchAthletes()
      }
    } catch (error) {
      console.error('Error deleting athlete:', error)
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
            // Handle CSV
            const text = data as string
            const lines = text.split('\n').filter(line => line.trim())
            
            if (lines.length < 2) {
              alert('File phải có header và dữ liệu')
              return
            }

            const headers = lines[0].split(',').map((h: string) => h.trim())
            const nameIndex = headers.findIndex(h => h.toLowerCase().includes('tên') || h.toLowerCase().includes('name'))
            const sportIndex = headers.findIndex(h => h.toLowerCase().includes('môn') || h.toLowerCase().includes('sport'))
            const performanceIndex = headers.findIndex(h => h.toLowerCase().includes('hiệu') || h.toLowerCase().includes('performance'))
            const coachIndex = headers.findIndex(h => h.toLowerCase().includes('huấn') || h.toLowerCase().includes('coach'))

            if (nameIndex === -1 || sportIndex === -1) {
              alert('File phải có cột "Tên" và "Môn Thể Thao"')
              return
            }

            const newAthletes: Athlete[] = []
            for (let i = 1; i < lines.length; i++) {
              const values = lines[i].split(',').map((v: string) => v.trim())
              const athlete: Athlete = {
                name: values[nameIndex] || '',
                sport: values[sportIndex] || '',
                performance: parseInt(values[performanceIndex] || '0') || 0,
                coach: coachIndex !== -1 ? values[coachIndex] : '',
              }
              
              if (athlete.name && athlete.sport) {
                newAthletes.push(athlete)
              }
            }

            let addedCount = 0
            for (const newAthlete of newAthletes) {
              await handleAddAthlete(newAthlete)
              addedCount++
            }

            alert(`Đã thêm thành công ${addedCount} vận động viên từ CSV`)
          } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            // Handle XLSX using CDN
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
                const sportIndex = headers.findIndex((h: string) => h.toLowerCase().includes('môn') || h.toLowerCase().includes('sport'))
                const performanceIndex = headers.findIndex((h: string) => h.toLowerCase().includes('hiệu') || h.toLowerCase().includes('performance'))
                const coachIndex = headers.findIndex((h: string) => h.toLowerCase().includes('huấn') || h.toLowerCase().includes('coach'))

                if (nameIndex === -1 || sportIndex === -1) {
                  alert('File phải có cột "Tên" và "Môn Thể Thao"')
                  return
                }

                let addedCount = 0
                for (const row of jsonData) {
                  const values = Object.values(row)
                  const athlete: Athlete = {
                    name: String(values[nameIndex] || '') || '',
                    sport: String(values[sportIndex] || '') || '',
                    performance: parseInt(String(values[performanceIndex] || 0)),
                    coach: coachIndex !== -1 ? String(values[coachIndex] || '') : '',
                  }

                  if (athlete.name && athlete.sport) {
                    await handleAddAthlete(athlete)
                    addedCount++
                  }
                }

                alert(`Đã thêm thành công ${addedCount} vận động viên từ Excel`)
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

  const handleDialogSave = (athlete: Athlete) => {
    if (editingAthlete) {
      handleEditAthlete(athlete)
    } else {
      handleAddAthlete(athlete)
    }
    setIsDialogOpen(false)
    setEditingAthlete(null)
  }

  const handleOpenDialog = (athlete?: Athlete) => {
    if (athlete) {
      setEditingAthlete(athlete)
    } else {
      setEditingAthlete(null)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingAthlete(null)
  }

  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = selectedSport === 'All' || athlete.sport === selectedSport
    return matchesSearch && matchesSport
  })

  const sportOptions = ['All', ...new Set(athletes.map((a) => a.sport))]

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Vận Động Viên</h1>
          <p className="text-blue-600">Quản lý tất cả vận động viên và hiệu suất của họ</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 w-fit"
            onClick={() => handleOpenDialog()}
          >
            <Plus size={20} className="mr-2" />
            Thêm Vận Động Viên
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

      <div className="mb-6 flex flex-col gap-4">
        <Input
          placeholder="Tìm kiếm vận động viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border-blue-300 text-blue-900 placeholder:text-blue-400"
        />

        <div className="flex gap-2 flex-wrap">
          {sportOptions.map((sport) => (
            <Button
              key={sport}
              variant={selectedSport === sport ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSport(sport)}
              className={
                selectedSport === sport
                  ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                  : 'border-blue-300 text-blue-900 hover:bg-blue-50'
              }
            >
              {sport}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete) => (
          <Card
            key={athlete.id}
            className="bg-gradient-to-br from-white to-slate-50 border-blue-300 hover:border-blue-500 transition-colors shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-blue-900">{athlete.name}</CardTitle>
                <p className="text-sm text-blue-600 mt-1">
                  {athlete.sport} • {athlete.joinDate || `${athlete.joinMonth} ${athlete.joinYear}`}
                </p>
              </div>
              <Avatar className="h-24 w-24 flex-shrink-0 ml-4 border-4 border-green-300">
                <AvatarImage 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(athlete.name)}`}
                  alt={athlete.name}
                />
                <AvatarFallback className="text-white text-2xl font-bold bg-gradient-to-br from-green-400 to-green-600">
                  {athlete.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600">Hiệu Suất</span>
                  <span className="text-lg font-bold text-blue-700">{athlete.performance}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-700 to-blue-500 h-2 rounded-full"
                    style={{ width: `${athlete.performance}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-xs text-blue-600">Huấn Luyện Viên</p>
                <p className="text-blue-900 font-medium text-sm mt-1">{athlete.coach}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-blue-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-blue-300 text-blue-900 hover:bg-blue-50 bg-transparent"
                  onClick={() => handleOpenDialog(athlete)}
                >
                  <Edit2 size={16} className="mr-1" />
                  Sửa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => handleDeleteAthlete(athlete.id || 0)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAthletes.length === 0 && (
        <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-300 shadow-sm mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Medal className="text-blue-300 mb-4" size={48} />
            <p className="text-blue-900 text-lg">Không tìm thấy vận động viên nào</p>
            <p className="text-blue-600 text-sm mt-2">Hãy thêm vận động viên mới để bắt đầu</p>
          </CardContent>
        </Card>
      )}

      <AthleteDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleDialogSave}
        athlete={editingAthlete || undefined}
        sports={sports}
        coaches={coaches}
      />
    </main>
  )
}
