"use client"

import { useProductStore } from "@/store/productStore"
import ProductCard from "@/components/ProductCard"
import { Product } from "@/types/product"

type Props = {
  onViewDetail: (p: Product) => void
}

export default function ViewedList({ onViewDetail }: Props) {
  const { viewed } = useProductStore()

  if (viewed.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        Bạn chưa xem sản phẩm nào.
      </div>
    )
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Lịch sử xem gần đây
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewed.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </section>
  )
}
