'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Medal } from 'lucide-react'
import { AthleteDialog } from '@/components/athlete-dialog'

interface Athlete {
  id?: string
  name: string
  sport: string
  performance: number
  coach: string
  joinDate: string
}

interface Sport {
  name: string
}

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [sports, setSports] = useState<Sport[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('All')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAthletes()
    fetchSports()
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
        body: JSON.stringify({ id: editingAthlete?.name, ...athlete }),
      })

      if (res.ok) {
        fetchAthletes()
        setEditingAthlete(null)
      }
    } catch (error) {
      console.error('Error updating athlete:', error)
    }
  }

  const handleDeleteAthlete = async (name: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa vận động viên này?')) return

    try {
      const res = await fetch('/api/athletes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: name }),
      })

      if (res.ok) {
        fetchAthletes()
      }
    } catch (error) {
      console.error('Error deleting athlete:', error)
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
        <Button
          className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 w-fit"
          onClick={() => handleOpenDialog()}
        >
          <Plus size={20} className="mr-2" />
          Thêm Vận Động Viên
        </Button>
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
            key={athlete.name}
            className="bg-gradient-to-br from-white to-slate-50 border-blue-300 hover:border-blue-500 transition-colors shadow-sm"
          >
            <CardHeader>
              <CardTitle className="text-blue-900">{athlete.name}</CardTitle>
              <p className="text-sm text-blue-600 mt-1">
                {athlete.sport} • {athlete.joinDate}
              </p>
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
                  onClick={() => handleDeleteAthlete(athlete.name)}
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
      />
    </main>
  )
}
