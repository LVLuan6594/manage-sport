"use client";
import "./fileinput.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sports = [
  "Bóng đá",
  "Bơi lội",
  "Điền kinh",
  "Cầu lông",
  "Bóng rổ",
  "Võ thuật",
  "Bóng bàn",
];

const registerTypes = [
  "Huấn luyện dài hạn",
  "Đào tạo năng khiếu",
  "Tuyển chọn bổ sung",
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
    if (!form.fullName || !form.dob || !form.idNumber || !form.address || !form.phone || !form.email) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Số điện thoại phải đủ 10 số.");
      return false;
    }
    if (!form.agree) {
      setError("Bạn phải xác nhận cam kết thông tin chính xác.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Giả lập gửi dữ liệu
    setSuccess(true);
    setTimeout(() => {
      router.push("/xet-tuyen");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Nộp hồ sơ đăng ký huấn luyện thể thao</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Họ và tên *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Ngày sinh *</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Giới tính</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded px-2 py-1">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>
          <div>
            <label>Số CCCD/CMND *</label>
            <input name="idNumber" value={form.idNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Địa chỉ thường trú *</label>
            <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Số điện thoại *</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-2 py-1" maxLength={10} />
          </div>
          <div>
            <label>Email liên hệ *</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Trường học/đơn vị</label>
            <input name="school" value={form.school} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Bộ môn đăng ký</label>
            <select name="sport" value={form.sport} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {sports.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Hình thức đăng ký</label>
            <select name="registerType" value={form.registerType} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {registerTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Thời gian mong muốn tham gia</label>
            <input name="trainingTime" value={form.trainingTime} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Chiều cao (cm)</label>
            <input name="height" value={form.height} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label>Cân nặng (kg)</label>
            <input name="weight" value={form.weight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>
        <div>
          <label>Thành tích thể thao đã đạt</label>
          <textarea name="achievements" value={form.achievements} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label>Kinh nghiệm tập luyện trước đây</label>
          <textarea name="experience" value={form.experience} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label>Nhận xét cá nhân về năng khiếu/thế mạnh</label>
          <textarea name="talent" value={form.talent} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Ảnh chân dung</label>
            <input type="file" name="avatar" accept="image/*" onChange={handleFile} className="file-input w-full" />
          </div>
          <div>
            <label>Giấy khám sức khỏe (scan)</label>
            <input type="file" name="health" accept="application/pdf,image/*" onChange={handleFile} className="file-input w-full" />
          </div>
          <div>
            <label>Bản sao giấy khai sinh/CCCD</label>
            <input type="file" name="idDoc" accept="application/pdf,image/*" onChange={handleFile} className="file-input w-full" />
          </div>
          <div>
            <label>Giấy xác nhận địa phương/trường</label>
            <input type="file" name="confirmDoc" accept="application/pdf,image/*" onChange={handleFile} className="file-input w-full" />
          </div>
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mr-2" />
          <label>Tôi cam kết thông tin đã khai là chính xác</label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600 font-semibold">Nộp hồ sơ thành công! Đang chuyển về trang xét tuyển...</div>}
        <button
          type="submit"
          className="bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold border border-blue-300 transition-colors duration-150 hover:bg-white hover:text-blue-700 hover:border-blue-500"
        >
          Nộp hồ sơ
        </button>
      </form>
    </div>
  );
}