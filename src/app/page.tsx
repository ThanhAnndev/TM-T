"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/lib/api/index"
import { useProductStore } from "@/store/productStore"
import ProductDetailModal from "@/components/ProductDetailModal"
import FilterBar from "@/components/FilterBar"
import SuggestionButton from "@/components/SuggestionButton"
import { Product } from "@/types/product"
import ProductList from "@/components/ProductList"
import ChatbotWidget from "@/components/ChatbotWidget" 
import Link from "next/link"
import FavoriteIcon from "@mui/icons-material/Favorite"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function HomePage() {
  const { products, setProducts } = useProductStore()
  const [filtered, setFiltered] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [setProducts])

  useEffect(() => {
    setFiltered(products)
  }, [products])

  const handleSearch = (q: string) => {
    setFiltered(
      products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      )
    )
  }

  const handleFilter = (range: string) => {
    let res = products
    if (range === "low") res = products.filter((p) => p.price < 500000)
    else if (range === "mid")
      res = products.filter((p) => p.price >= 500000 && p.price <= 1000000)
    else if (range === "high") res = products.filter((p) => p.price > 1000000)
    setFiltered(res)
  }

  return (
    <main className="p-4 sm:p-6 max-w-6xl mx-auto font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
           Danh sách sản phẩm giáo dục
        </h1>
        <div className="flex gap-4 text-sm sm:text-base">
          <Link
            href="/favorites"
            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-medium"
          >
            <FavoriteIcon fontSize="small" /> Yêu thích
          </Link>
          <Link
            href="/viewed"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition font-medium"
          >
            <VisibilityIcon fontSize="small" /> Đã xem
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1 text-green-600 hover:text-green-700 transition font-medium"
          >
            <ShoppingCartIcon fontSize="small" /> Giỏ hàng
          </Link>
        </div>
      </div>

      <FilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <SuggestionButton />
      <ProductList products={filtered} onViewDetail={setSelectedProduct} />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <ChatbotWidget /> 
    </main>
  )
}
