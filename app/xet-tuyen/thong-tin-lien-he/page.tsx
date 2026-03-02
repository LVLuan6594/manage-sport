"use client";
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThongTinLienHePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          Thông Tin Liên Hệ
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Address */}
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-start gap-4">
              <MapPin size={32} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">Địa Chỉ</h2>
                <p className="text-blue-800 leading-relaxed">
                  Trung tâm Huấn luyện và Thi đấu Thể thao tỉnh Vĩnh Long<br />
                  79 Nguyễn Huệ, Phường Long Châu, Tỉnh Vĩnh Long
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500">
            <div className="flex items-start gap-4">
              <Phone size={32} className="text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">Điện Thoại</h2>
                <p className="text-blue-800 mb-2">
                  <a
                    href="tel:02703891234"
                    className="hover:text-blue-600 transition-colors font-semibold"
                  >
                    0270 389 1234
                  </a>
                </p>
                <p className="text-sm text-blue-600">Hotline hỗ trợ tuyển sinh</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 border-purple-500">
            <div className="flex items-start gap-4">
              <Mail size={32} className="text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">Email</h2>
                <p className="text-blue-800 mb-2">
                  <a
                    href="mailto:tuyensinh@vitinhsport.vn"
                    className="hover:text-blue-600 transition-colors font-semibold"
                  >
                    tuyensinh@vitinhsport.vn
                  </a>
                </p>
                <p className="text-sm text-blue-600">Liên hệ trực tiếp qua email</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 border-orange-500">
            <div className="flex items-start gap-4">
              <Clock size={32} className="text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">Giờ Làm Việc</h2>
                <ul className="text-blue-800 space-y-1">
                  <li><strong>Thứ Hai - Thứ Sáu:</strong> 7:00 - 17:00</li>
                  <li><strong>Thứ Bảy:</strong> 7:00 - 12:00</li>
                  <li><strong>Chủ Nhật:</strong> Đóng cửa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-lg p-8 shadow-md mb-12 border-l-4 border-blue-500">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Gửi Pesan Cho Chúng Tôi</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-blue-900 font-semibold mb-2">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-blue-900 font-semibold mb-2">
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-blue-900 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-blue-900 font-semibold mb-2">
                Nội Dung
              </label>
              <textarea
                id="message"
                placeholder="Nhập nội dung tin nhắn của bạn"
                rows={5}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-all hover:shadow-lg"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div>

        {/* Map or Additional Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 shadow-md text-white">
          <h2 className="text-3xl font-bold mb-4">Vị Trí Trung Tâm</h2>
          <p className="text-blue-100 mb-4">
            Trung tâm Huấn luyện và Thi đấu Thể thao tỉnh Vĩnh Long nằm ở vị trí chiến lược, 
            dễ tiếp cận từ các huyện và TP. Vĩnh Long.
          </p>
          <div className="rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15704.710232692289!2d105.94996349845465!3d10.247259403281523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a830028f16651%3A0x49073f6dd7927324!2zVHJ1bmcgdMOibSBIdXXhuqVuIGx1eHXOhyBuIHbDoCB0aGkgxJHhu41dSB0aOG7gyB0aGFvIFbEqW5oIExvbmc!5e0!3m2!1sen!2s!4v1772412390868!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
