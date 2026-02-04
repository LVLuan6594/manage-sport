"use client"

import { useEffect, useState } from 'react'

interface Application {
  id: string
  createdAt: string
  fullName: string
  dob?: string
  gender?: string
  idNumber?: string
  address?: string
  phone?: string
  email?: string
  sport?: string
  registerType?: string
  trainingTime?: string
  height?: string
  weight?: string
  achievements?: string
  experience?: string
  talent?: string
  avatarName?: string | null
  healthDocName?: string | null
  idDocName?: string | null
  confirmDocName?: string | null
}

export default function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/applications')
        if (res.ok) setItems(await res.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Quản lý hồ sơ ứng tuyển</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Họ và tên</th>
                <th className="px-4 py-2 text-left">Bộ môn</th>
                <th className="px-4 py-2 text-left">SĐT</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Ngày nộp</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-sm text-slate-500">Đang tải...</td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-sm text-slate-500">Chưa có hồ sơ nào.</td>
                </tr>
              )}
              {items.map((it) => (
                <tr key={it.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{it.id}</td>
                  <td className="px-4 py-3 border-b">{it.fullName}</td>
                  <td className="px-4 py-3 border-b">{it.sport}</td>
                  <td className="px-4 py-3 border-b">{it.phone}</td>
                  <td className="px-4 py-3 border-b">{it.email}</td>
                  <td className="px-4 py-3 border-b">{new Date(it.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
