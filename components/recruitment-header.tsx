"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecruitmentHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/xet-tuyen" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-blue-700 text-xl">
              ⚽
            </div>
            <div>
              <div className="font-bold text-xl">TUYỂN SINH</div>
              <div className="text-xs text-blue-100">Trung Tâm Thể Thao</div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-8">
            <Link
              href="/xet-tuyen"
              className={`pb-2 border-b-2 transition-all font-medium ${
                isActive("/xet-tuyen")
                  ? "border-green-400 text-white"
                  : "border-transparent text-blue-100 hover:text-white"
              }`}
            >
              Trang Chủ
            </Link>
            <Link
              href="/xet-tuyen/lich-su-hinh-thanh"
              className={`pb-2 border-b-2 transition-all font-medium ${
                isActive("/xet-tuyen/lich-su-hinh-thanh")
                  ? "border-green-400 text-white"
                  : "border-transparent text-blue-100 hover:text-white"
              }`}
            >
              Lịch Sử Hình Thành
            </Link>
            <Link
              href="/xet-tuyen/thong-tin-lien-he"
              className={`pb-2 border-b-2 transition-all font-medium ${
                isActive("/xet-tuyen/thong-tin-lien-he")
                  ? "border-green-400 text-white"
                  : "border-transparent text-blue-100 hover:text-white"
              }`}
            >
              Thông Tin Liên Hệ
            </Link>
            {/* login button */}
            <Link
              href="/login"
              className="ml-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Đăng Nhập
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
