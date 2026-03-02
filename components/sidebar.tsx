'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, Dumbbell, Castle as Whistle, Settings, LogOut, Menu, X, FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const adminNavItems = [
  { href: '/dashboard', label: 'Thống kê dữ liệu', icon: BarChart3 },
  { href: '/dashboard/athletes', label: 'Vận Động Viên', icon: Dumbbell },
  { href: '/dashboard/coaches', label: 'Huấn Luyện Viên', icon: Whistle },
  { href: '/dashboard/users', label: 'Quản lý tài khoản', icon: Users },
  { href: '/dashboard/settings', label: 'Cài đặt hệ thống', icon: Settings },
];

const coachNavItems = [
  { href: '/coach', label: 'Bảng Điều Khiển', icon: BarChart3 },
  { href: '/coach/training-plans/new', label: 'Tạo Kế Hoạch', icon: FileText },
  { href: '/dashboard/settings', label: 'Cài Đặt', icon: Settings },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const navItems = user?.role === 'coach' ? coachNavItems : adminNavItems

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

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

        {/* <div className="p-4 border-t border-blue-200 space-y-3">
          <div className="px-4 py-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-600">Đã đăng nhập</p>
            <p className="text-sm font-semibold text-blue-900">{user?.username}</p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Đăng Xuất
            </Button>
          </div>
        </div> */}

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


