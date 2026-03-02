'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/app/auth-context'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bell, LogOut, Lock, User, Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
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

  // Load avatar from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user_avatar')
      if (stored) setAvatarUrl(stored)
    } catch {}
  }, [])

  // Close dropdown when clicking outside
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
    // Simulate password change
    alert('Mật khẩu đã được thay đổi thành công')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setDropdownOpen(false)
  }

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      {/* Notification Bell */}
      <div className="relative">
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

        {/* Notification Dropdown */}
        {notificationOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-blue-300 z-50">
            <div className="p-4 border-b border-blue-200 flex justify-between items-center">
              <h3 className="font-bold text-blue-900">Thông Báo</h3>
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Đánh dấu đã xem
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto">
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

      {/* Notification detail dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông Báo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-blue-900">{selectedNotification?.message}</p>
            <p className="text-xs text-blue-600">{selectedNotification?.time}</p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setDetailDialogOpen(false)}
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-blue-300 hover:bg-blue-50 transition-colors shadow-sm"
        >
          <div className="text-right">
            <p className="text-xs text-blue-600">Đã đăng nhập</p>
            <p className="text-sm font-bold text-blue-900">{user?.username || 'Admin'}</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-blue-300">
            <AvatarImage src={avatarUrl ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} alt="User" />
            <AvatarFallback className="bg-blue-500 text-white">{user?.username?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
          </Avatar>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden z-50">
            <div className="p-3 border-b border-blue-200 bg-blue-50">
              <p className="text-sm font-semibold text-blue-900">Cài đặt Tài Khoản</p>
            </div>

            {/* Change Avatar */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full px-4 py-2 text-left text-sm text-blue-900 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                  <Upload size={16} />
                  Đổi Avatar
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Đổi Avatar</DialogTitle>
                  <DialogDescription>Chọn ảnh đại diện mới cho tài khoản của bạn</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Avatar className="h-24 w-24 border-2 border-blue-300">
                      <AvatarImage src={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} />
                      <AvatarFallback className="bg-blue-500 text-white text-2xl">A</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <Label className="text-blue-900">Chọn file ảnh</Label>
                    <div className="mt-2">
                      <input
                        ref={fileInputRef}
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Chọn Ảnh
                      </Button>
                    </div>
                  </div>
                  <Button onClick={() => setDropdownOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700">
                    Lưu Avatar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Change Password */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full px-4 py-2 text-left text-sm text-blue-900 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                  <Lock size={16} />
                  Đổi Mật Khẩu
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Đổi Mật Khẩu</DialogTitle>
                  <DialogDescription>Cập nhật mật khẩu của tài khoản của bạn</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-pwd" className="text-blue-900">Mật Khẩu Hiện Tại</Label>
                    <Input
                      id="current-pwd"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-pwd" className="text-blue-900">Mật Khẩu Mới</Label>
                    <Input
                      id="new-pwd"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-pwd" className="text-blue-900">Xác Nhận Mật Khẩu</Label>
                    <Input
                      id="confirm-pwd"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full bg-blue-600 hover:bg-blue-700">
                    Cập Nhật Mật Khẩu
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Profile (separator) */}
            <div className="border-b border-blue-200"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
            >
              <LogOut size={16} />
              Đăng Xuất
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
