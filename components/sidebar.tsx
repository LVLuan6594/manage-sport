'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, Dumbbell, Castle as Whistle, Settings, LogOut, Menu, X, FileText, Bell, Upload, Lock, User } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const adminNavItems = [
  { href: '/dashboard', label: 'Thống kê dữ liệu', icon: BarChart3 },
  { href: '/dashboard/athletes', label: 'Vận Động Viên', icon: Dumbbell },
  { href: '/dashboard/coaches', label: 'Huấn Luyện Viên', icon: Whistle },
  { href: '/dashboard/users', label: 'Quản lý tài khoản', icon: Users },
  { href: '/dashboard/settings', label: 'Cài đặt hệ thống', icon: Settings },
];

const coachNavItems = [
  { href: '/coach', label: 'Bảng Điều Khiển', icon: BarChart3 },
  { href: '/coach/athletes', label: 'Vận Động Viên Được Phân Công', icon: Dumbbell },
  { href: '/coach/training-plans/new', label: 'Tạo Kế Hoạch Huấn Luyện', icon: FileText },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { logout, user } = useAuth()

  // notification and avatar states moved from UserMenu
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Vận động viên mới đăng ký', time: '5p trước' },
    { id: 2, message: 'Huy chương mới được ghi nhận', time: '1h trước' },
  ])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<{id:number;message:string;time:string}|null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // load stored avatar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user_avatar')
      if (stored) setAvatarUrl(stored)
    } catch {}
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        setAvatarUrl(dataUrl)
        try {
          localStorage.setItem('user_avatar', dataUrl)
        } catch (err) {
          console.error('Failed to save avatar', err)
        }
      }
      reader.readAsDataURL(file)
      alert(`Avatar đã được cập nhật: ${file.name}`)
      setDropdownOpen(false)
    }
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp')
      return
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }
    alert('Mật khẩu đã được thay đổi thành công')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setDropdownOpen(false)
  }

  const navItems = user?.role === 'coach' ? coachNavItems : adminNavItems

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-blue-700 hover:bg-blue-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed lg:static inset-0 lg:flex flex-col w-64 bg-gradient-to-b from-slate-50 to-white border-r border-blue-200 ${
          isOpen ? 'z-30' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300`}
      >
        <div className="p-6 border-b border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h1 className="text-xl font-bold text-blue-900">Quản lý Dữ liệu - Ngành Thể thao</h1>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white'
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-blue-200 space-y-3 relative">
          {/* notification bell */}
          <div className="relative mb-3">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-lg bg-white border border-blue-300 hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Bell size={20} className="text-blue-600" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {notificationOpen && (
              <div className="absolute left-full top-0 ml-2 w-72 bg-white rounded-lg shadow-lg border border-blue-300 z-40">
                <div className="p-4 border-b border-blue-200 flex justify-between items-center">
                  <h3 className="font-bold text-blue-900">Thông Báo</h3>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Đánh dấu đã xem
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          setSelectedNotification(notif)
                          setDetailDialogOpen(true)
                          setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
                        }}
                        className="p-3 border-b border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-blue-900">{notif.message}</p>
                        <p className="text-xs text-blue-600 mt-1">{notif.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-center text-slate-500 text-sm">Không có thông báo nào</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* avatar/dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-blue-300 hover:bg-blue-50 transition-colors shadow-sm w-full"
            >
              <Avatar className="h-8 w-8 border-2 border-blue-300">
                <AvatarImage src={avatarUrl ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} alt="User" />
                <AvatarFallback className="bg-blue-500 text-white">{user?.username?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
              </Avatar>
              <span className="flex-1 text-left text-sm font-semibold text-blue-900 truncate">{user?.username || 'Admin'}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden z-50">
                <div className="p-3 border-b border-blue-200 bg-blue-50">
                  <p className="text-sm font-semibold text-blue-900">Cài đặt Tài Khoản</p>
                </div>

                {/* Change Avatar */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50">Đổi Avatar</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thay Avatar</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Change Password */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50">Đổi Mật Khẩu</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Đổi Mật Khẩu</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Mật khẩu hiện tại</Label>
                        <Input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Mật khẩu mới</Label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Xác nhận mật khẩu mới</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <Button onClick={handlePasswordChange} className="bg-blue-600 hover:bg-blue-700">Lưu</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Đăng Xuất
                </button>
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </>
  )
}