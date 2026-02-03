'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Bell, Lock, User, Volume2 } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cài Đặt</h1>
          <p className="text-slate-400">Quản lý tài khoản và tùy chọn hệ thống của bạn</p>
        </div>

        {/* Account Settings */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="text-blue-500" size={24} />
              <div>
                <CardTitle className="text-white">Cài Đặt Tài Khoản</CardTitle>
                <CardDescription className="text-slate-400">Quản lý thông tin tài khoản của bạn</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Họ và Tên</Label>
              <Input
                value="Quản Trị Viên"
                readOnly
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Địa Chỉ Email</Label>
              <Input
                value="admin@sportshub.com"
                readOnly
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Vai Trò</Label>
              <Input
                value="Quản Trị Viên Hệ Thống"
                readOnly
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="text-orange-500" size={24} />
              <div>
                <CardTitle className="text-white">Bảo Mật</CardTitle>
                <CardDescription className="text-slate-400">Cập nhật mật khẩu và cài đặt bảo mật của bạn</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Mật Khẩu Hiện Tại</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Mật Khẩu Mới</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Xác Nhận Mật Khẩu</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Cập Nhật Mật Khẩu
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/30 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="text-green-500" size={24} />
              <div>
                <CardTitle className="text-white">Thông Báo</CardTitle>
                <CardDescription className="text-slate-400">Quản lý tùy chọn thông báo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <div>
                <p className="font-medium text-white">Thông Báo Đẩy</p>
                <p className="text-sm text-slate-400">Nhận thông báo đẩy cho các cập nhật quan trọng</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <div>
                <p className="font-medium text-white">Cảnh Báo Email</p>
                <p className="text-sm text-slate-400">Nhận thông báo email về hiệu suất vận động viên</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Thông Báo Âm Thanh</p>
                <p className="text-sm text-slate-400">Kích hoạt âm thanh cho các cảnh báo quan trọng</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Volume2 className="text-purple-500" size={24} />
              <div>
                <CardTitle className="text-white">Cài Đặt Âm Thanh</CardTitle>
                <CardDescription className="text-slate-400">Điều chỉnh tùy chọn âm thanh</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white">Âm Lượng</Label>
                <span className="text-sm text-slate-400">80%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-700 pt-4">
              <div>
                <p className="font-medium text-white">Âm Thanh Cảnh Báo</p>
                <p className="text-sm text-slate-400">Chọn âm thanh thông báo</p>
              </div>
              <select className="bg-slate-700/50 border border-slate-600 text-white px-3 py-2 rounded-lg">
                <option>Mặc Định</option>
                <option>Chuông</option>
                <option>Âm Thanh</option>
                <option>Kỹ Thuật Số</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">
            💡 <span className="ml-2">Các thay đổi được lưu tự động. Liên hệ hỗ trợ nếu bạn cần hỗ trợ.</span>
          </p>
        </div>
      </div>
    </main>
  )
}
