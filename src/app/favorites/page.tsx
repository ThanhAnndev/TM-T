"use client"

import { useState } from "react"
import { useProductStore } from "@/store/productStore"
import ProductCard from "@/components/ProductCard"
import ProductDetailModal from "@/components/ProductDetailModal"
import { Product } from "@/types/product"
import Link from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"


export default function FavoritesPage() {
  const { favorites } = useProductStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <main className="p-4 sm:p-6 max-w-7xl mx-auto font-sans text-gray-800">

      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-medium text-sm sm:text-base"
        >
          <ArrowBackIcon fontSize="small" />
          Quay lại trang chủ
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight">
         Sản phẩm đã yêu thích
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-base sm:text-lg">
          Bạn chưa yêu thích sản phẩm nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={setSelectedProduct}
            />
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}
