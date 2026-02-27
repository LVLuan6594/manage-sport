"use client";
import "./fileinput.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sports = [
  "⚽ Bóng đá",
  "🏊 Bơi lội",
  "🏃 Điền kinh",
  "🏸 Cầu lông",
  "🏀 Bóng rổ",
  "🥊 Võ thuật",
  "🏓 Bóng bàn",
];

const registerTypes = [
  "Huấn luyện dài hạn",
  "Đào tạo năng khiếu",
];

export default function AthleteRegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "Nam",
    idNumber: "",
    address: "",
    phone: "",
    email: "",
    school: "",
    sport: sports[0],
    registerType: registerTypes[0],
    trainingTime: "",
    height: "",
    weight: "",
    achievements: "",
    experience: "",
    talent: "",
    avatar: undefined as File | undefined,
    health: undefined as File | undefined,
    idDoc: undefined as File | undefined,
    confirmDoc: undefined as File | undefined,
    agree: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const validate = () => {
    // Kiểm tra các trường bắt buộc
    if (!form.fullName?.trim()) {
      setError("Vui lòng nhập họ và tên.");
      return false;
    }
    if (!form.address?.trim()) {
      setError("Vui lòng nhập địa chỉ.");
      return false;
    }
    if (!form.phone?.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return false;
    }
    if (!form.email?.trim()) {
      setError("Vui lòng nhập email.");
      return false;
    }

    // Kiểm tra định dạng số điện thoại (10 số)
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Số điện thoại phải đúng 10 số.");
      return false;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Email không hợp lệ. Vui lòng kiểm tra lại.");
      return false;
    }

    // Kiểm tra các trường khác
    if (!form.dob) {
      setError("Vui lòng nhập ngày sinh.");
      return false;
    }
    if (!form.idNumber?.trim()) {
      setError("Vui lòng nhập số CCCD/CMND.");
      return false;
    }
    if (!form.agree) {
      setError("Bạn phải xác nhận cam kết thông tin chính xác.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert avatar file to base64 if exists
    let avatarData: string | null = null;
    if (form.avatar) {
      const reader = new FileReader();
      reader.onload = async () => {
        avatarData = reader.result as string;
        sendPayload(avatarData);
      };
      reader.readAsDataURL(form.avatar);
      return; // wait for async FileReader
    } else {
      sendPayload(null);
    }

    async function sendPayload(avatarData: string | null) {
      const payload = {
        fullName: form.fullName,
        dob: form.dob,
        gender: form.gender,
        idNumber: form.idNumber,
        address: form.address,
        phone: form.phone,
        email: form.email,
        school: form.school,
        sport: form.sport,
        registerType: form.registerType,
        trainingTime: form.trainingTime,
        height: form.height,
        weight: form.weight,
        achievements: form.achievements,
        experience: form.experience,
        talent: form.talent,
        avatarData: avatarData, // base64 string or null
        healthDocName: form.health?.name || null,
        idDocName: form.idDoc?.name || null,
        confirmDocName: form.confirmDoc?.name || null,
        status: 'pending',
        agree: form.agree,
      };

      try {
        const res = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Lỗi khi gửi hồ sơ');

        setSuccess(true);
        setTimeout(() => {
          router.push('/xet-tuyen');
        }, 1500);
      } catch (err: any) {
        setError(err?.message || 'Không thể gửi hồ sơ. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-2">HỒ SƠ ĐĂNG KÝ NHẬP HỌC</h2>
          <p className="text-blue-100">Trung Tâm Huấn Luyện và Thi Đấu Thể Thao Tỉnh Vĩnh Long</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg p-8 space-y-6">
          {/* Thông tin cá nhân */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Thông Tin Cá Nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Ngày sinh <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Giới tính</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Số CCCD/CMND <span className="text-red-500">*</span></label>
                <input
                  name="idNumber"
                  value={form.idNumber}
                  onChange={handleChange}
                  placeholder="Nhập số CCCD/CMND"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Địa chỉ thường trú <span className="text-red-500">*</span></label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="VD: 0123456789"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                  maxLength={10}
                  pattern="\d{10}"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-blue-900 mb-2">Email liên hệ <span className="text-red-500">*</span></label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="VD: email@example.com"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Trường học/đơn vị</label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Nhập trường/đơn vị"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Thông tin tuyển sinh */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Thông Tin Tuyển Sinh
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Bộ môn đăng ký</label>
                <select
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                >
                  {sports.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Hình thức đăng ký</label>
                <select
                  name="registerType"
                  value={form.registerType}
                  onChange={handleChange}
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                >
                  {registerTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Thời gian mong muốn tham gia</label>
                <input
                  name="trainingTime"
                  value={form.trainingTime}
                  onChange={handleChange}
                  placeholder="VD: Sáng/Chiều/Tối"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Chiều cao (cm)</label>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  type="number"
                  placeholder="VD: 170"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Cân nặng (kg)</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  type="number"
                  placeholder="VD: 65"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Thông Tin Bổ Sung
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Thành tích thể thao đã đạt</label>
                <textarea
                  name="achievements"
                  value={form.achievements}
                  onChange={handleChange}
                  placeholder="Mô tả thành tích, giải thưởng (nếu có)"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Kinh nghiệm tập luyện trước đây</label>
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Mô tả kinh nghiệm tập luyện"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Nhận xét cá nhân về năng khiếu/thế mạnh</label>
                <textarea
                  name="talent"
                  value={form.talent}
                  onChange={handleChange}
                  placeholder="Mô tả điểm mạnh của bạn"
                  className="w-full border-2 border-blue-200 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Tài liệu đính kèm */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Tài Liệu Đính Kèm
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Ảnh chân dung</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFile}
                  className="file-input w-full border-2 border-dashed border-blue-300 rounded px-3 py-2"
                />
                <p className="text-xs text-blue-500 mt-1">Định dạng: JPG, PNG (Max: 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Giấy khám sức khỏe (scan)</label>
                <input
                  type="file"
                  name="health"
                  accept="application/pdf,image/*"
                  onChange={handleFile}
                  className="file-input w-full border-2 border-dashed border-blue-300 rounded px-3 py-2"
                />
                <p className="text-xs text-blue-500 mt-1">Định dạng: PDF, JPG, PNG (Max: 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Bản sao giấy khai sinh/CCCD</label>
                <input
                  type="file"
                  name="idDoc"
                  accept="application/pdf,image/*"
                  onChange={handleFile}
                  className="file-input w-full border-2 border-dashed border-blue-300 rounded px-3 py-2"
                />
                <p className="text-xs text-blue-500 mt-1">Định dạng: PDF, JPG, PNG (Max: 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Giấy xác nhận địa phương/trường</label>
                <input
                  type="file"
                  name="confirmDoc"
                  accept="application/pdf,image/*"
                  onChange={handleFile}
                  className="file-input w-full border-2 border-dashed border-blue-300 rounded px-3 py-2"
                />
                <p className="text-xs text-blue-500 mt-1">Định dạng: PDF, JPG, PNG (Max: 5MB)</p>
              </div>
            </div>
          </div>

          {/* Xác nhận */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded mt-1 cursor-pointer"
              />
              <label className="text-sm text-blue-900">
                Tôi cam kết thông tin đã khai là chính xác, đầy đủ và chịu trách nhiệm pháp lý về tính xác thực của các thông tin đã cung cấp.
              </label>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="text-red-700 bg-red-50 p-4 rounded-lg border border-red-200 border-l-4 border-l-red-500">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="text-green-700 bg-green-50 p-4 rounded-lg border border-green-200 border-l-4 border-l-green-500 font-semibold text-center">
              ✅ Bạn đã nộp hồ sơ thành công! Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </div>
          )}

          {/* Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition-all text-lg"
            >
              Quay Lại
            </button>
            <button
              type="submit"
              disabled={success}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all text-lg"
            >
              {success ? "✅ Hồ sơ đã được gửi" : "Nộp Hồ Sơ"}
            </button>
          </div>

          {success && (
            <p className="text-center text-blue-600 text-sm">Đang chuyển hướng...</p>
          )}
        </form>
      </div>
    </div>
  );
}