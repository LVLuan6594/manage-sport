'use client'

import { MapPin, Phone, Mail, Facebook, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FooterSettings, getFooterSettings } from '@/lib/footer-settings'

export function Footer() {
  const [settings, setSettings] = useState<FooterSettings | null>(null)

  useEffect(() => {
    setSettings(getFooterSettings())

    const handler = () => {
      setSettings(getFooterSettings())
    }
    window.addEventListener('storage', handler)
    window.addEventListener('footerChange', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('footerChange', handler)
    }
  }, [])

  if (!settings) {
    // while loading, render nothing or a simple placeholder
    return null
  }

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Column 1: Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 whitespace-nowrap">
              <span className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">📋</span>
              <span>Thông Tin Liên Hệ</span>
            </h3>
            <div className="space-y-2 text-blue-100 text-sm">
              <div>
                <p className="text-base leading-snug">{settings.orgName}</p>
              </div>
              <div className="flex gap-2">
                <MapPin size={18} className="text-blue-300 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm mb-0.5">Địa Chỉ</p>
                  <p className="text-xs">{settings.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone size={18} className="text-blue-300 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-semibold text-white text-xs mb-0.5">Điện thoại</p>
                  <p className="text-xs">
                    <a href="tel:02703862071" className="hover:text-blue-300 transition break-all">
                      {settings.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Communication Channels */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 whitespace-nowrap">
              <span className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">💬</span>
              <span>Kênh Liên Hệ</span>
            </h3>
            <div className="space-y-2">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg transition-all hover:translate-x-1"
              >
                <Facebook size={20} className="text-blue-300 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-xs">Facebook</p>
                  <p className="text-xs text-blue-200 truncate">Theo dõi tin tức</p>
                </div>
              </a>

              <a
                href={settings.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg transition-all hover:translate-x-1"
              >
                <MessageCircle size={20} className="text-blue-300 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-xs">ZaloOA</p>
                  <p className="text-xs text-blue-200 truncate">Tư vấn trực tiếp</p>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 p-2 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg transition-all hover:translate-x-1"
              >
                <Mail size={20} className="text-blue-300 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-xs">Email</p>
                  <p className="text-xs text-blue-200 truncate">tttdtt.svhttdl@vinhlong.gov.vn</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Map Location */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 whitespace-nowrap">
              <span className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">🗺️</span>
              <span>Vị Trí Đơn Vị</span>
            </h3>
            <div className="rounded-lg overflow-hidden shadow-lg border-2 border-blue-700 h-48 sm:h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.7989221615967!2d105.96879!3d10.239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08f61d1e30000%3A0x1234567890!2sVinh%20Long%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-xs text-blue-200 text-center leading-snug">
              Bấm vào bản đồ để xem chi tiết
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-center sm:text-left text-blue-200 text-xs">
          <div>
              <p className="leading-snug">© {new Date().getFullYear()} {settings.orgName}. <br></br>All Rights Reserved.</p>
          </div>
          <div className="flex justify-center sm:justify-start gap-2 flex-wrap">
            <a href="#" className="hover:text-blue-300 transition">Chính Sách</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300 transition">Điều Khoản</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300 transition">Liên Hệ</a>
          </div>
          <div className="sm:text-right">
            <p className="leading-snug">Phiên bản: {settings.version} | Cập nhật: {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
