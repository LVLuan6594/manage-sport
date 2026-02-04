'use client'

import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  links?: Array<{ label: string; url: string }>
}

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
  id?: string
  name: string
  specialty?: string
  experience?: number
  athletesManaged?: number
  efficiency?: number
}

interface Sport {
  id?: number
  name: string
  athleteCount?: number
  achievements?: string
}

let athletesDatabase: Athlete[] = []
let coachesDatabase: Coach[] = []
let sportsDatabase: Sport[] = []

// Fetch data from API
async function loadData() {
  try {
    const [athletesRes, coachesRes, sportsRes] = await Promise.all([
      fetch('/api/athletes'),
      fetch('/api/coaches'),
      fetch('/api/sports'),
    ])

    if (athletesRes.ok) athletesDatabase = await athletesRes.json()
    if (coachesRes.ok) coachesDatabase = await coachesRes.json()
    if (sportsRes.ok) sportsDatabase = await sportsRes.json()
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

const trainingPrograms = [
  { name: 'Strength & Conditioning', duration: '12 weeks', level: 'All Levels' },
  { name: 'Speed Training', duration: '8 weeks', level: 'Intermediate' },
  { name: 'Endurance Building', duration: '16 weeks', level: 'Advanced' },
  { name: 'Basketball Skills', duration: '10 weeks', level: 'Beginner' },
  { name: 'Swimming Techniques', duration: '14 weeks', level: 'All Levels' },
]

function generateResponse(input: string): { text: string; links?: Array<{ label: string; url: string }> } {
  const lowerInput = input.toLowerCase()

  // 1. Số lượng vận động viên
  if ((lowerInput.includes('số lượng vận động viên') || lowerInput.includes('bao nhiêu vận động viên'))) {
    return { text: `Số lượng vận động viên hiện tại của Trung tâm là ${athletesDatabase.length} vận động viên, được cập nhật theo dữ liệu mới nhất trên hệ thống.` }
  }

  // 2. Số lượng huấn luyện viên
  if ((lowerInput.includes('số lượng huấn luyện viên') || lowerInput.includes('bao nhiêu huấn luyện viên'))) {
    return { text: `Hiện tại Trung tâm đang quản lý ${coachesDatabase.length} huấn luyện viên thuộc các bộ môn khác nhau.` }
  }

  // 3. Số bộ môn thể thao
  if ((lowerInput.includes('bộ môn') || lowerInput.includes('bo mon')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('có bao'))) {
    const uniqueSports = new Set(athletesDatabase.map((a) => a.sport)).size
    return { text: `Trung tâm hiện đang đào tạo và huấn luyện ${uniqueSports} bộ môn thể thao.` }
  }

  // 4. Danh sách vận động viên theo môn
  if ((lowerInput.includes('danh sách') || lowerInput.includes('danh sach')) && (lowerInput.includes('vận động viên') || lowerInput.includes('van dong vien'))) {
    if (athletesDatabase.length === 0) return { text: 'Chưa có vận động viên nào trong hệ thống.' }
    
    // Check if asking by specific sport
    const sports = new Set(athletesDatabase.map((a) => a.sport))
    let foundSport = ''
    for (const sport of sports) {
      if (lowerInput.includes(sport.toLowerCase().replace('🏊 ', '').replace('🥊 ', ''))) {
        foundSport = sport
        break
      }
    }

    if (foundSport) {
      const athletesBySport = athletesDatabase.filter((a) => a.sport === foundSport)
      const list = athletesBySport
        .map((a, idx) => `${idx + 1}. ${a.name}`)
        .join('\n')
      const links = athletesBySport.map((a) => ({
        label: `Xem hồ sơ ${a.name}`,
        url: `/profile/athlete/${a.id}`
      }))
      return { 
        text: `Danh sách vận động viên môn ${foundSport}:\n${list}`,
        links 
      }
    } else {
      // List all sports with count
      const sportCounts: { [key: string]: number } = {}
      athletesDatabase.forEach((a) => {
        sportCounts[a.sport] = (sportCounts[a.sport] || 0) + 1
      })
      const sportList = Object.entries(sportCounts)
        .map(([sport, count], idx) => `${idx + 1}. ${sport}: ${count} vận động viên`)
        .join('\n')
      return { text: `Danh sách các bộ môn và số vận động viên:\n${sportList}\n\nHãy hỏi về môn cụ thể để xem chi tiết!` }
    }
  }

  // 5. Thông tin chi tiết vận động viên
  if (lowerInput.includes('thông tin') && (lowerInput.includes('vận động viên') || lowerInput.includes('van dong vien'))) {
    for (const athlete of athletesDatabase) {
      if (lowerInput.includes(athlete.name.toLowerCase())) {
        const info = `
Tên: ${athlete.name}
Môn: ${athlete.sport}
Tuổi: ${athlete.age || 'N/A'}
Chiều cao: ${athlete.height || 'N/A'} cm
Hiệu suất: ${athlete.performance}%
Huấn luyện viên: ${athlete.coach || 'N/A'}
Huy chương: ${athlete.medals.gold} vàng, ${athlete.medals.silver} bạc, ${athlete.medals.bronze} đồng
Tình trạng: ${athlete.injured ? 'Bị chấn thương' : 'Bình thường'}
Tiềm năng: ${athlete.potential ? 'Có' : 'Không'}
Đạt tiêu chuẩn: ${athlete.qualified ? 'Có' : 'Không'}
`
        return { 
          text: `Thông tin chi tiết về vận động viên:\n${info}`,
          links: [{ label: 'Xem hồ sơ đầy đủ', url: `/profile/athlete/${athlete.id}` }]
        }
      }
    }
  }

  // 6. Thông tin chi tiết huấn luyện viên
  if (lowerInput.includes('thông tin') && (lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien'))) {
    for (const coach of coachesDatabase) {
      if (lowerInput.includes(coach.name.toLowerCase())) {
        const info = `
Tên: ${coach.name}
Chuyên môn: ${coach.specialty || 'N/A'}
Kinh nghiệm: ${coach.experience || 'N/A'} năm
Vận động viên quản lý: ${coach.athletesManaged || 'N/A'}
Hiệu suất: ${coach.efficiency || 'N/A'}%
`
        return { 
          text: `Thông tin chi tiết về huấn luyện viên:\n${info}`,
          links: [{ label: 'Xem hồ sơ đầy đủ', url: `/profile/coach/${coach.id}` }]
        }
      }
    }
  }

  // 7. Vận động viên tốt nhất
  if ((lowerInput.includes('tốt nhất') || lowerInput.includes('hiệu suất cao'))) {
    if (athletesDatabase.length === 0) return { text: 'Chưa có dữ liệu vận động viên.' }
    const best = athletesDatabase.reduce((a, b) => (a.performance > b.performance ? a : b))
    return { 
      text: `Vận động viên có hiệu suất tốt nhất là ${best.name} từ môn ${best.sport} với điểm hiệu suất ${best.performance}%.`,
      links: [{ label: 'Xem hồ sơ', url: `/profile/athlete/${best.id}` }]
    }
  }

  // 8. Danh sách huấn luyện viên
  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('danh sách') || lowerInput.includes('danh sach'))) {
    if (coachesDatabase.length === 0) return { text: 'Chưa có huấn luyện viên nào.' }
    const list = coachesDatabase
      .map((c, idx) => `${idx + 1}. ${c.name} (${c.specialty || 'N/A'})`)
      .join('\n')
    const links = coachesDatabase.map((c) => ({
      label: `Xem hồ sơ ${c.name}`,
      url: `/profile/coach/${c.id}`
    }))
    return { 
      text: `Danh sách huấn luyện viên:\n${list}`,
      links 
    }
  }

  // 9. Kinh nghiệm huấn luyện viên
  if (lowerInput.includes('kinh nghiệm') || lowerInput.includes('kinh nghiem')) {
    if (coachesDatabase.length === 0) return { text: 'Chưa có dữ liệu huấn luyện viên.' }
    const validCoaches = coachesDatabase.filter((c) => c.experience)
    if (validCoaches.length === 0) return { text: 'Không có thông tin kinh nghiệm.' }
    const avgExp = (validCoaches.reduce((sum, c) => sum + (c.experience || 0), 0) / validCoaches.length).toFixed(1)
    return { text: `Các huấn luyện viên của chúng ta có trung bình ${avgExp} năm kinh nghiệm.` }
  }

  // 10. Chương trình huấn luyện
  if ((lowerInput.includes('chương trình') || lowerInput.includes('chuong trinh'))) {
    const programs = trainingPrograms.map((p) => `${p.name} (${p.duration})`).join(', ')
    return { text: `Chúng ta cung cấp các chương trình huấn luyện sau: ${programs}` }
  }

  // 11. Thống kê
  if ((lowerInput.includes('thống kê') || lowerInput.includes('thong ke') || lowerInput.includes('tổng'))) {
    return { text: `Đây là thống kê hiện tại của chúng ta:
- Tổng Vận Động Viên: ${athletesDatabase.length}
- Tổng Huấn Luyện Viên: ${coachesDatabase.length}
- Chương Trình Huấn Luyện: ${trainingPrograms.length}` }
  }

  // 12. Vận động viên đạt tiêu chuẩn
  if ((lowerInput.includes('đạt tiêu chuẩn') || lowerInput.includes('dat tieu chuan'))) {
    const qualified = athletesDatabase.filter((a) => a.qualified)
    if (qualified.length === 0) return { text: 'Chưa có vận động viên đạt tiêu chuẩn.' }
    const list = qualified
      .map((a, idx) => `${idx + 1}. ${a.name} (${a.sport})`)
      .join('\n')
    const links = qualified.map((a) => ({
      label: `Xem ${a.name}`,
      url: `/profile/athlete/${a.id}`
    }))
    return { 
      text: `Chúng ta có ${qualified.length} vận động viên đạt tiêu chuẩn:\n${list}`,
      links 
    }
  }

  // 13. Hiệu suất trung bình
  if (lowerInput.includes('hiệu suất') || lowerInput.includes('hieu suat')) {
    if (athletesDatabase.length === 0) return { text: 'Chưa có dữ liệu hiệu suất.' }
    const avgPerf = (athletesDatabase.reduce((sum, a) => sum + a.performance, 0) / athletesDatabase.length).toFixed(1)
    return { text: `Điểm hiệu suất trung bình trên tất cả vận động viên là ${avgPerf}%.` }
  }

  // 14. Bộ môn có vận động viên nhiều nhất
  if ((lowerInput.includes('bộ môn') || lowerInput.includes('bo mon')) && (lowerInput.includes('nhiều nhất') || lowerInput.includes('nhieu nhat'))) {
    if (athletesDatabase.length === 0) return { text: 'Chưa có dữ liệu.' }
    const sportCounts: { [key: string]: number } = {}
    athletesDatabase.forEach((a) => {
      sportCounts[a.sport] = (sportCounts[a.sport] || 0) + 1
    })
    const maxSport = Object.entries(sportCounts).reduce((a, b) => (b[1] > a[1] ? b : a))
    return { text: `Bộ môn có số lượng vận động viên nhiều nhất là ${maxSport[0]} với ${maxSport[1]} vận động viên.` }
  }

  // 15. Huy chương
  if ((lowerInput.includes('huy chương') || lowerInput.includes('huy chuong'))) {
    if (athletesDatabase.length === 0) return { text: 'Chưa có dữ liệu huy chương.' }
    let totalGold = 0, totalSilver = 0, totalBronze = 0
    athletesDatabase.forEach((a) => {
      totalGold += a.medals.gold
      totalSilver += a.medals.silver
      totalBronze += a.medals.bronze
    })
    const total = totalGold + totalSilver + totalBronze
    return { text: `Tổng số huy chương: ${total} (${totalGold} vàng, ${totalSilver} bạc, ${totalBronze} đồng).` }
  }

  // 16. Vận động viên chấn thương
  if ((lowerInput.includes('chấn thương') || lowerInput.includes('chan thuong'))) {
    const injured = athletesDatabase.filter((a) => a.injured)
    if (injured.length === 0) return { text: 'Hiện tại không có vận động viên nào bị chấn thương.' }
    return { text: `Hiện có ${injured.length} vận động viên bị chấn thương: ${injured.map((a) => a.name).join(', ')}.` }
  }

  // 17. Vận động viên tiềm năng
  if ((lowerInput.includes('tiềm năng') || lowerInput.includes('tiem nang'))) {
    const potential = athletesDatabase.filter((a) => a.potential && a.performance >= 87)
    if (potential.length === 0) return { text: 'Chưa có vận động viên tiềm năng.' }
    const list = potential
      .map((a, idx) => `${idx + 1}. ${a.name} (${a.performance}%)`)
      .join('\n')
    const links = potential.map((a) => ({
      label: `Xem ${a.name}`,
      url: `/profile/athlete/${a.id}`
    }))
    return { 
      text: `Danh sách vận động viên tiềm năng:\n${list}`,
      links 
    }
  }

  // Greeting
  if (
    lowerInput.includes('xin chào') ||
    lowerInput.includes('xin chao') ||
    lowerInput.includes('hello') ||
    lowerInput.includes('hi')
  ) {
    return { text: 'Xin chào! 👋 Tôi là Trợ Lý Quản Lý Thể Thao. Tôi có thể giúp bạn với thông tin về vận động viên, huấn luyện viên và thống kê hiệu suất. Bạn muốn biết điều gì?' }
  }

  if ((lowerInput.includes('giúp') || lowerInput.includes('giup')) || (lowerInput.includes('có thể') || lowerInput.includes('co the'))) {
    return { text: `Tôi có thể giúp bạn với:
- Danh sách vận động viên theo môn thể thao
- Thông tin chi tiết về vận động viên và huấn luyện viên
- Thống kê và dữ liệu
- Các chương trình huấn luyện
- Vận động viên đạt tiêu chuẩn, tiềm năng, chấn thương

Bạn muốn biết điều gì?` }
  }

  // Default response
  return { text: `Cảm ơn câu hỏi! Hệ thống quản lý thể thao của chúng ta đang giám sát ${athletesDatabase.length} vận động viên và ${coachesDatabase.length} huấn luyện viên. Có gì cụ thể bạn muốn biết?` }
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Xin chào! 👋 Tôi là Trợ Lý Quản Lý Thể Thao. Tôi có thể giúp bạn với thông tin về vận động viên, huấn luyện viên và thống kê. Bạn muốn biết điều gì?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadData()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const typingMessage: Message = {
      id: (Date.now() + 0.5).toString(),
      role: 'assistant',
      content: 'Đang suy nghĩ...',
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    setTimeout(() => {
      const response = generateResponse(input)
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping)
        return [
          ...filtered,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.text,
            timestamp: new Date(),
            links: response.links,
          },
        ]
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30 flex flex-col">
      <CardHeader className="border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <CardTitle className="text-white">Trợ Lý Thể Thao</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-br-none'
                    : `bg-slate-700 text-slate-100 rounded-bl-none ${message.isTyping ? 'animate-pulse' : ''}`
                }`}
              >
                <p className={`text-sm whitespace-pre-wrap ${message.isTyping ? 'italic text-slate-300' : ''}`}>
                  {message.content}
                </p>
                {message.links && message.links.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-center transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex gap-2">
          <Input
            type="text"
            placeholder="Hỏi tôi về vận động viên, huấn luyện viên..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
          >
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
