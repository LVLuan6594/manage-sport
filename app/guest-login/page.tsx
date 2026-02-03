"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestLoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePhone = (value: string) => /^\d{10}$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError("Số điện thoại phải đủ 10 số.");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }
    // Giả lập đăng nhập thành công
    localStorage.setItem("guest_phone", phone);
    router.push("/xet-tuyen");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập Khách vãng lai</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Nhập số điện thoại 10 số"
            maxLength={10}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Nhập mật khẩu"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập / Đăng ký
        </button>
      </form>
    </div>
  );
}
