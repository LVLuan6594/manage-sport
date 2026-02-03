"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const mockRecruitmentInfo = {
  title: "Tuyển sinh Vận động viên năm 2026",
  description:
    "Trung tâm Thể thao thông báo tuyển sinh các bộ môn: Bóng đá, Bơi lội, Điền kinh, Cầu lông... Dành cho học sinh, thanh thiếu niên, VĐV tự do có đam mê và năng khiếu thể thao. Thời gian nhận hồ sơ: 01/02/2026 - 31/03/2026.",
  requirements: [
    "Độ tuổi: 10-18 tuổi",
    "Có sức khỏe tốt, đam mê thể thao",
    "Ưu tiên có thành tích hoặc năng khiếu nổi bật",
  ],
};

export default function XetTuyenPage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    setPhone(localStorage.getItem("guest_phone"));
    if (!localStorage.getItem("guest_phone")) {
      router.push("/guest-login");
    }
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{mockRecruitmentInfo.title}</h1>
      <p className="mb-4">{mockRecruitmentInfo.description}</p>
      <ul className="mb-6 list-disc pl-6">
        {mockRecruitmentInfo.requirements.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
        onClick={() => router.push("/xet-tuyen/ung-tuyen")}
      >
        Nộp hồ sơ
      </button>
    </div>
  );
}
