'use client'

import { useState } from 'react'
import { Cpu, X, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Chatbot } from '@/components/chatbot'

export function FloatingChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-bounce"
        title="Mở ChatBot AI"
      >
        {isOpen ? <X size={24} /> : <Cpu size={24} />}
      </button>

      {/* Chatbot Modal - Mini or Maximized */}
      {isOpen && (
        <>
          {/* Backdrop - Only show when maximized */}
          {isMaximized && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsMaximized(false)}
            ></div>
          )}

          {/* Chat Window */}
          <div
            className={`fixed z-50 rounded-lg shadow-2xl border border-blue-600/50 bg-slate-950 flex flex-col transition-all duration-300 ${
              isMaximized
                ? 'inset-4 md:inset-2'
                : 'bottom-24 right-6 w-96 h-[600px]'
            }`}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-600/50 bg-gradient-to-r from-blue-700 to-blue-500">
              <div className="flex items-center gap-2">
                <Cpu size={20} className="text-white" />
                <h3 className="text-white font-semibold">Trợ Lý Thể Thao</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title={isMaximized ? 'Thu nhỏ' : 'Phóng to'}
                >
                  {isMaximized ? (
                    <Minimize2 size={18} className="text-white" />
                  ) : (
                    <Maximize2 size={18} className="text-white" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Đóng"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <Chatbot />
            </div>
          </div>
        </>
      )}
    </>
  )
}
