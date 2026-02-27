"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestLoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePhone = (value: string) => /^\d{10}$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;
  const validateEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validatePhone(phone)) {
      setError("Số điện thoại phải đủ 10 số.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (mode === "register") {
      if (!validateEmail(email)) {
        setError("Vui lòng nhập email hợp lệ.");
        return;
      }
      // Giả lập đăng ký thành công
      const users = JSON.parse(localStorage.getItem("guests") || "[]");
      users.push({ phone, email, password });
      localStorage.setItem("guests", JSON.stringify(users));
      router.push("/xet-tuyen");
      return;
    }

    // mode === "login"
    // Giả lập đăng nhập thành công (nên kiểm tra thông tin đã đăng ký)
    localStorage.setItem("guest_phone", phone);
    router.push("/xet-tuyen");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Đăng nhập Khách vãng lai" : "Đăng ký tài khoản"}
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
              setPhone("");
              setPassword("");
              setEmail("");
            }}
            className={`px-4 py-2 rounded ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
              setPhone("");
              setPassword("");
              setEmail("");
            }}
            className={`px-4 py-2 rounded ${mode === "register" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Đăng ký
          </button>
        </div>

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

        {mode === "register" && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập email"
            />
          </div>
        )}

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
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
