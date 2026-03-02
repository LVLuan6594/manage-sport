"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LichSuHinhThanhPage() {
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
          Lịch Sử Hình Thành
        </h1>

        {/* Content */}
        <div className="bg-white rounded-lg p-8 shadow-md mb-8">
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              🏛️ Từ Đơn Giản Đến Vĩ Đại
            </h2>
            <p className="text-blue-800 leading-relaxed mb-4">
              Trung tâm Huấn luyện và Thi đấu Thể thao tỉnh Vĩnh Long được thành lập vào năm 2004, 
              với mục tiêu phát triển các tài năng thể thao của tỉnh và nâng cao chất lượng cuộc sống 
              của người dân thông qua các hoạt động thể thao.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              📈 Giai Đoạn Phát Triển
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 pb-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">2004-2008: Khởi Đầu</h3>
                <p className="text-blue-800">
                  Thành lập Trung tâm với 3 bộ môn chính: Bóng đá, Bơi lội, Điền kinh. 
                  Cơ sở vật chất còn khiêm tốn nhưng tinh thần huấn luyện rất cao.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6 pb-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">2008-2015: Mở Rộng</h3>
                <p className="text-blue-800">
                  Nâng cấp cơ sở vật chất, mở rộng thêm 3 bộ môn mới: Cầu lông, Bóng rổ, Võ thuật. 
                  Đạt được nhiều thành tích quốc gia và quốc tế.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6 pb-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">2015-2023: Trưởng Thành</h3>
                <p className="text-blue-800">
                  Trở thành một trong những trung tâm thể thao hàng đầu South East Asia. 
                  Đã nuôi dạy hơn 500 vận động viên, giành được 50+ huy chương quốc gia và quốc tế.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6 pb-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">2023-Nay: Hiện Đại Hóa</h3>
                <p className="text-blue-800">
                  Đầu tư vào công nghệ hiện đại, tuyển dụng các huấn luyện viên quốc tế, 
                  phát triển chương trình đào tạo toàn diện cho các tài năng trẻ.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              🎯 Thành Tích Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-700 mb-2">500+</div>
                <p className="text-blue-900 font-semibold">Vận Động Viên Đã Đào Tạo</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
                <div className="text-3xl font-bold text-green-700 mb-2">50+</div>
                <p className="text-green-900 font-semibold">Huy Chương Quốc Gia/Quốc Tế</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-700 mb-2">20+</div>
                <p className="text-purple-900 font-semibold">Năm Kinh Nghiệm Đào Tạo</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              💡 Tầm Nhìn & Sứ Mạng
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-900 leading-relaxed mb-4">
                <strong>Tầm Nhìn:</strong> Trở thành trung tâm thể thao hàng đầu khu vực Đông Nam Á, 
                nơi phát triển các tài năng thể thao trong môi trường chuyên nghiệp, hiện đại và an toàn.
              </p>
              <p className="text-blue-900 leading-relaxed">
                <strong>Sứ Mạng:</strong> Phát triển các tài năng thể thao, nâng cao sức khỏe cộng đồng, 
                và đóng góp vào sự phát triển thể thao quốc gia thông qua đào tạo chất lượng cao và giáo dục toàn diện cho các vận động viên trẻ.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
