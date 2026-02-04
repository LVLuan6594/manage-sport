"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Users, Clock, Target, CheckCircle, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const mockRecruitmentInfo = {
  title: "Tuyển sinh Vận động viên năm 2026",
  subtitle: "Trung tâm Huấn luyện và Thi đấu Thể thao tỉnh Vĩnh Long",
  description:
    "Trung tâm Thể thao thông báo tuyển sinh các bộ môn: Bóng đá, Bơi lội, Điền kinh, Cầu lông và nhiều bộ môn khác. Dành cho học sinh, thanh thiếu niên, vận động viên tự do có đam mê và năng khiếu thể thao.",
  highlights: [
    { icon: "🏆", title: "Đào tạo chuyên nghiệp", desc: "Huấn luyện viên giàu kinh nghiệm quốc tế" },
    { icon: "🏅", title: "Trang thiết bị hiện đại", desc: "Cơ sở vật chất đạt tiêu chuẩn quốc tế" },
    { icon: "👥", title: "Cộng đồng mạnh mẽ", desc: "Kết nối với VĐV tài năng trên khắp đất nước" },
    { icon: "🎯", title: "Hỗ trợ toàn diện", desc: "Hỗ trợ học tập, tập luyện, cấp cứu y tế" },
  ],
  sports: [
    { label: "⚽ Bóng đá", key: "Football", description: "Bóng đá là môn thể thao đồng đội, mỗi đội 11 người, yêu cầu kỹ thuật, phối hợp và chiến thuật." },
    { label: "🏊 Bơi lội", key: "Swimming", description: "Bơi lội gồm các nội dung tự do, ếch, ngửa, bướm; phát triển sức bền và kỹ thuật cá nhân." },
    { label: "🏃 Điền kinh", key: "Athletics", description: "Điền kinh bao gồm các nội dung chạy, nhảy và ném, tập trung vào tốc độ, sức bền và kỹ thuật." },
    { label: "🏸 Cầu lông", key: "Badminton", description: "Cầu lông thi đấu đơn và đôi, yêu cầu phản xạ nhanh, kỹ thuật đánh và di chuyển nhạy bén." },
    { label: "🏀 Bóng rổ", key: "Basketball", description: "Bóng rổ là môn đối kháng có đội hình 5 người, chú trọng ném rổ, phối hợp tấn công và phòng ngự." },
    { label: "🥊 Võ thuật", key: "MartialArts", description: "Võ thuật gồm các môn như Taekwondo, Karate, Judo... tập trung vào đối kháng, kỹ thuật và kỷ luật." },
  ],
  requirements: [
    { icon: "👤", text: "Độ tuổi: 10-18 tuổi" },
    { icon: "💪", text: "Có sức khỏe tốt, đam mê thể thao" },
    { icon: "🌟", text: "Ưu tiên có thành tích hoặc năng khiếu nổi bật" },
    { icon: "📋", text: "Có giấy tờ tùy thân hợp pháp" },
  ],
  schedule: {
    start: "01/02/2026",
    
    end: "31/03/2026",
    testing: "01/04/2026 - 30/04/2026",
  },
  benefits: [
    "Đào tạo kỹ năng chuyên sâu",
    "Cấp bằng chứng chỉ quốc tế",
    "Cơ hội thi đấu quốc tế",
    "Hỗ trợ học bổng",
  ],
};

export default function XetTuyenPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<null | { label: string; description: string }>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sportsList, setSportsList] = useState(mockRecruitmentInfo.sports);

  useEffect(() => {
    setPhone(localStorage.getItem("guest_phone"));
    if (!localStorage.getItem("guest_phone")) {
      router.push("/guest-login");
    }
  }, [router]);

  useEffect(() => {
    let mounted = true;
    fetch('/data/sports.json')
      .then((res) => res.json())
      .then((data: Array<any>) => {
        if (!mounted) return;
        const updated = mockRecruitmentInfo.sports.map((s) => {
          const found = data.find((d) => d.name === s.key || d.name === s.label || d.name === (s.key ?? ''));
          return {
            ...s,
            description: found?.description ?? s.description,
          };
        });
        setSportsList(updated);
      })
      .catch(() => {
        // ignore fetch errors and keep defaults
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}>⚽</div>
        <div className="absolute top-32 right-20 text-7xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>🏊</div>
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>🏃</div>
        <div className="absolute bottom-20 right-1/3 text-7xl opacity-10 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}>🏆</div>
        <div className="absolute top-1/2 right-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3s', animationDelay: '2s'}}>🥇</div>
        <div className="absolute bottom-40 right-20 text-7xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '2.5s'}}>💪</div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4 animate-pulse">
              <h2 className="text-2xl md:text-3xl font-bold">
                🎯 Chương Trình Tuyển Sinh 2026
              </h2>
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{mockRecruitmentInfo.title}</h1>
          <p className="text-xl text-blue-100 mb-2 drop-shadow-md">{mockRecruitmentInfo.subtitle}</p>
          <p className="text-blue-200 max-w-3xl mx-auto drop-shadow-md">{mockRecruitmentInfo.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {mockRecruitmentInfo.highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500 hover:scale-105 transform transition-transform duration-300"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-sm text-blue-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Sports Available */}
        <div className="bg-white rounded-lg p-8 shadow-md mb-12 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <Target size={32} className="text-green-500 animate-pulse" />
            Các Bộ Môn Tuyển Sinh
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sportsList.map((sport, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-200 hover:border-green-400 transition-all hover:scale-110 transform hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => {
                  setSelectedSport({ label: sport.label, description: sport.description });
                  setDialogOpen(true);
                }}
              >
                <p className="font-semibold text-blue-900 text-lg text-center">{sport.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-orange-500">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              <Award size={32} className="text-orange-500" />
              Yêu Cầu Cơ Bản
            </h2>
            <ul className="space-y-4">
              {mockRecruitmentInfo.requirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-2xl">{req.icon}</span>
                  <span className="text-blue-900">{req.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              <Clock size={32} className="text-purple-500" />
              Lịch Tuyển Sinh
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Nhận hồ sơ</p>
                <p className="text-lg font-bold text-blue-900">
                  {mockRecruitmentInfo.schedule.start} - {mockRecruitmentInfo.schedule.end}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Thi tuyển</p>
                <p className="text-lg font-bold text-green-900">{mockRecruitmentInfo.schedule.testing}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 shadow-lg text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users size={32} />
            Quyền Lợi & Lợi Ích
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecruitmentInfo.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <CheckCircle size={24} className="text-green-300 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg p-8 shadow-md border-t-4 border-green-500 text-center hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-blue-900 mb-3 animate-pulse">Sẵn Sàng Tham Gia?</h3>
          <p className="text-blue-600 mb-6">Nộp hồ sơ ngay hôm nay và bắt đầu hành trình thể thao của bạn!</p>
          <button
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2 mx-auto"
            onClick={() => router.push("/xet-tuyen/ung-tuyen")}
          >
            <span>Nộp Hồ Sơ Ngay</span>
            <ArrowRight size={20} className="animate-pulse" />
          </button>
          <p className="text-sm text-blue-500 mt-4">⏰ Hạn chót: {mockRecruitmentInfo.schedule.end}</p>
        </div>
      </div>

      {/* Dialog: Sport Details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle className="text-xl">{selectedSport?.label}</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-700">{selectedSport?.description}</DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Footer Stats */}
      <div className="bg-blue-900 text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
            <p className="text-blue-200">Vận Động Viên Tại Trung Tâm</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
            <p className="text-blue-200">Huy Chương Quốc Gia/Quốc Tế</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
            <p className="text-blue-200">Năm Kinh Nghiệm Đào Tạo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
