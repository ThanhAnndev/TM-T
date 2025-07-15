"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import { mockProducts } from "@/lib/mockData"
import Link from "next/link"

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string; suggestions?: Product[] }[]
  >([])

  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { role: "user" as const, text: input }

    const normalizedInput = removeVietnameseTones(input)

    // Danh sách từ dừng không cần dùng trong tìm kiếm
    const stopWords = new Set([
      "toi", "muon", "voi", "la", "cua", "va", "mot", "nhung", "cho", "duoc", "cach", "lam", "ve", "hoc", "nguoi"
    ])

    // Lấy keyword thực sự (bỏ từ ngắn và từ dừng)
    const keywords = normalizedInput
      .split(/\s+/)
      .filter((word) => word.length >= 3 && !stopWords.has(word))

    // So khớp với sản phẩm
    const suggestions = mockProducts.filter((p) => {
      const normalizedName = removeVietnameseTones(p.name)
      return keywords.some((k) => normalizedName.includes(k))
    })

    const botMsg = {
      role: "bot" as const,
      text: suggestions.length
        ? "Đây là một số sản phẩm bạn có thể quan tâm:"
        : "Xin lỗi, tôi chưa tìm được sản phẩm phù hợp. Bạn có thể thử lại với từ khóa khác.",
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[75vh] bg-white rounded-xl shadow-lg flex flex-col z-50 overflow-hidden border">
          <div className="bg-blue-600 text-white p-3 font-bold flex justify-between items-center">
            Chatbot tư vấn sản phẩm
            <button onClick={() => setOpen(false)} className="text-white">
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`text-${msg.role === "user" ? "right" : "left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                  } max-w-[85%]`}
                >
                  {msg.text}
                </div>

                {msg.role === "bot" && msg.suggestions && msg.suggestions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {msg.suggestions.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/#product-${p.id}`}
                          className="text-blue-600 hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          • {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border rounded px-3 py-1 text-sm"
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  handleSend()
                }
              }}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600 transition text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
