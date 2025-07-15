"use client"

import { useState } from "react"
import Link from "next/link"
import ViewedList from "@/components/ViewedList"
import ProductDetailModal from "@/components/ProductDetailModal"
import { Product } from "@/types/product"
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useProductStore } from "@/store/productStore"
import Notiflix from "notiflix"

export default function ViewedPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { clearViewed, viewed } = useProductStore()

  return (
    <main className="px-4 py-6 sm:p-6 max-w-6xl mx-auto font-sans text-gray-800">
     
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition duration-200"
        >
          <ArrowBackIcon fontSize="small" />
          <span>Quay lại trang chủ</span>
        </Link>

        {viewed.length > 0 && (
  <button
    onClick={() => {
      clearViewed()
      Notiflix.Notify.success("Đã xoá toàn bộ lịch sử xem!")
    }}
    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
  >
    <DeleteIcon fontSize="small" />
    <span>Xoá toàn bộ lịch sử xem</span>
  </button>
)}
      </div>

      
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
         Lịch sử xem sản phẩm
      </h1>

     
      {viewed.length === 0 ? (
        <p className="text-gray-500 text-base mt-10 text-center">
          Bạn chưa xem sản phẩm nào gần đây.
        </p>
      ) : (
        <ViewedList onViewDetail={setSelectedProduct} />
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}
