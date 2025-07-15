"use client"

import ProductCard from "@/components/ProductCard"
import { Product } from "@/types/product"

export default function ProductList({
  products,
  onViewDetail,
}: {
  products: Product[]
  onViewDetail: (product: Product) => void
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-4 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2h6v2a2 2 0 002 2h1a1 1 0 001-1v-5a5 5 0 00-5-5H9a5 5 0 00-5 5v5a1 1 0 001 1h1a2 2 0 002-2z" />
        </svg>
        <p className="text-lg font-medium">Không có sản phẩm nào được tìm thấy</p>
        <p className="text-sm text-gray-400 mt-1">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} />
      ))}
    </div>
  )
}
