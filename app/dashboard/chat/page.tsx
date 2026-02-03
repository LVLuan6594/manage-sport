'use client'

import { Chatbot } from '@/components/chatbot'

export default function ChatPage() {
  return (
    <main className="p-4 lg:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 h-screen lg:h-screen overflow-hidden flex flex-col">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <div className="mb-4 lg:mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">ChatBot AI</h1>
          <p className="text-slate-400">Nhận thông tin tức thì về vận động viên, huấn luyện viên và chương trình huấn luyện</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <Chatbot />
        </div>
      </div>
    </main>
  )
}
