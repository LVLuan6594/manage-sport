"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LichSuHinhThanhPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 text-center">
          Lịch Sử Hình Thành
        </h1>

        {/* Overview Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">🏛️ Từ Đơn Giản Đến Vĩ Đại</h2>
          <p className="text-blue-700 leading-relaxed">
            Trung tâm Huấn luyện và Thi đấu Thể thao Vĩnh Long là đơn vị sự nghiệp trực thuộc Sở Văn hóa, Thể thao và Du lịch tỉnh Vĩnh Long. Chức năng của Trung tâm là tổ chức, tuyển chọn, quản lý và huấn luyện các đội tuyển thể thao của tỉnh để tham gia thi đấu các giải thể thao khu vực, toàn quốc và quốc tế; quản lý và khai thác có hiệu quả các công trình thể thao của tỉnh.
            <br />
            Trung tâm Huấn luyện và Thi đấu Thể thao có 175 viên chức và người lao động; 05 phòng chuyên môn (Phòng Hành chính tổng hợp; Phòng Đào tạo và Huấn luyện, Phòng Tổ chức thi đấu và Phát triển thể thao phong trào, Phòng Quản lý cơ sở vật chất và khai thác dịch vụ và Phòng Quản lý vận động viên); Quản lý 21 đội thể thao (đội Tuyển tỉnh, đội Trẻ và đội Năng khiếu) với gần 800 vận động viên.
          </p>
        </div>

        {/* Timeline Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">📈 Giai Đoạn Phát Triển</h2>
          <div className="relative border-l-2 border-blue-200 pl-10">
            <div className="mb-8 relative">
              <h3 className="text-lg font-bold text-blue-900 mb-1"> 2004-2008: Khởi Đầu</h3>
              <p className="text-blue-700">
                Thành lập Trung tâm với 3 bộ môn chính: Bóng đá, Bơi lội, Điền kinh. Cơ sở vật chất còn khiêm tốn nhưng tinh thần huấn luyện rất cao.
              </p>
            </div>
            <div className="mb-8 relative">
              <h3 className="text-lg font-bold text-blue-900 mb-1">2008-2015: Mở Rộng</h3>
              <p className="text-blue-700">
                Nâng cấp cơ sở vật chất, mở rộng thêm 3 bộ môn mới: Cầu lông, Bóng rổ, Võ thuật. Đạt được nhiều thành tích quốc gia và quốc tế.
              </p>
            </div>
            <div className="mb-8 relative">
              <h3 className="text-lg font-bold text-blue-900 mb-1">2015-2023: Trưởng Thành</h3>
              <p className="text-blue-700">
                Trở thành một trong những trung tâm thể thao hàng đầu South East Asia. Đã nuôi dạy hơn 500 vận động viên, giành được 50+ huy chương quốc gia và quốc tế.
              </p>
            </div>
            <div className="relative">
              <h3 className="text-lg font-bold text-blue-900 mb-1">2023-Nay: Hiện Đại Hóa</h3>
              <p className="text-blue-700">
                Đầu tư vào công nghệ hiện đại, tuyển dụng các huấn luyện viên quốc tế, phát triển chương trình đào tạo toàn diện cho các tài năng trẻ.
              </p>
            </div>
          </div>
        </div>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">🎯 Thành Tích Nổi Bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-extrabold text-blue-700 mb-2">500+</div>
                <p className="text-blue-800 font-medium">Vận Động Viên Đã Đào Tạo</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-extrabold text-green-700 mb-2">50+</div>
                <p className="text-green-800 font-medium">Huy Chương Quốc Gia/Quốc Tế</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-extrabold text-purple-700 mb-2">20+</div>
                <p className="text-purple-800 font-medium">Năm Kinh Nghiệm Đào Tạo</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">🏢 Ban Lãnh Đạo & Các Phòng Ban</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-800">
              <div>
                <p className="font-bold mb-2">I. Ban Giám Đốc</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Đồng chí NGUYỄN MINH HIỀN; Nam; Giám đốc; 0982259090</li>
                  <li>Đồng chí NGUYỄN HOÀNG HUẤN; Nam; Phó Giám đốc; 0908111651</li>
                  <li>Đồng chí NGUYỄN CƯƠNG LĨNH; Nam; Phó Giám đốc; 0979275959</li>
                  <li>Đồng chí THÁI ANH TUẤN; Nam; Phó Giám đốc; 0845557456</li>
                  <li>Đồng chí LÝ TRUNG HẬU; Nam; Phó Giám đốc; 0913083113</li>
                  <li>Đồng chí VÕ THỊ ANH THƯ; Nữ; Phó Giám đốc; 0913644488</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">Phòng chuyên môn</p>
                <ul className="space-y-2">
                  <li>Hành chính tổng hợp – TỐNG THỊ HỒNG PHƯƠNG (Nữ, Quyền Trưởng Phòng) – 0947488869</li>
                  <li>Đào tạo và huấn luyện – PHAN QUANG MINH QUÂN (Nam, Trưởng Phòng) – 0989220556</li>
                  <li>Tổ chức thi đấu & phát triển phong trào – PHẠM TRUNG NGHĨA (Nam, Quyền Trưởng Phòng) – 0907171559</li>
                  <li>Quản lý cơ sở vật chất & khai thác dịch vụ – HỒ THANH SANG (Nam, Trưởng Phòng) – 0904050881</li>
                  <li>Quản lý vận động viên – TRẦN LÊ THÙY TRÂN (Nữ, Trưởng Phòng) – 0949555548</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">💡 Tầm Nhìn & Sứ Mạng</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-blue-700 leading-relaxed mb-4">
                <strong>Tầm Nhìn:</strong> Trở thành trung tâm thể thao hàng đầu khu vực Đông Nam Á, nơi phát triển các tài năng thể thao trong môi trường chuyên nghiệp, hiện đại và an toàn.
              </p>
              <p className="text-blue-700 leading-relaxed">
                <strong>Sứ Mạng:</strong> Phát triển các tài năng thể thao, nâng cao sức khỏe cộng đồng, và đóng góp vào sự phát triển thể thao quốc gia thông qua đào tạo chất lượng cao và giáo dục toàn diện cho các vận động viên trẻ.
              </p>
            </div>
          </section>
        </div>
      </div>
  );
}
