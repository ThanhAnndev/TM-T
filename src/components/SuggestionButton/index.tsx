"use client"

import { getSuggestedProducts } from "@/lib/api"
import { useProductStore } from "@/store/productStore"
import SuggestionSkeleton from "@/components/SuggestionSkeleton"
import { useState } from "react"
import Notiflix from "notiflix"

export default function SuggestionButton() {
  const { setProducts } = useProductStore()
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleClick = async () => {
    setLoadingSuggestions(true)
    try {
      const suggestions = await getSuggestedProducts("user123")
      setProducts(suggestions)
      Notiflix.Notify.success("Đã gợi ý sản phẩm phù hợp!")
    } catch (err) {
      console.error("Lỗi khi lấy gợi ý sản phẩm:", err)
      Notiflix.Notify.failure("Không thể lấy gợi ý lúc này. Vui lòng thử lại sau!")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  return (
    <div className="w-full flex justify-center my-6">
      <button
        onClick={handleClick}
        disabled={loadingSuggestions}
        className={`flex items-center gap-2 text-white px-5 py-2 rounded-lg transition duration-300 shadow-md
          ${loadingSuggestions ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}
        `}
      >
        {loadingSuggestions ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>Đang gợi ý...</span>
          </>
        ) : (
          <>
            <span>Gợi ý sản phẩm phù hợp (AI)</span>
          </>
        )}
      </button>

      {loadingSuggestions && (
        <div className="mt-4 w-full">
          <SuggestionSkeleton />
        </div>
      )}
    </div>
  )
}
