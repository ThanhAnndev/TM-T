"use client"

import { Product } from "@/types/product"
import Image from "next/image"
import { useProductStore } from "@/store/productStore"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notiflix from "notiflix"

export default function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const { favorites, toggleFavorite, addToCart } = useProductStore()

  if (!product) return null

  const isFav = favorites.some((p) => p.id === product.id)

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    Notiflix.Notify.success(
      isFav ? "Đã bỏ khỏi yêu thích!" : "Đã thêm vào yêu thích "
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    Notiflix.Notify.success("Đã thêm vào giỏ hàng ")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition text-lg"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={240}
            className="w-full h-60 object-cover rounded-md shadow"
          />
          <p className="text-gray-700 text-sm sm:text-base">{product.fullDesc}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2">
            <p className="text-blue-600 font-semibold text-lg">
              {product.price.toLocaleString()}đ
            </p>
            <p className="text-yellow-600 text-sm sm:text-base">⭐ {product.rating}</p>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
  onClick={handleToggleFavorite}
  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2
    ${isFav
      ? "bg-red-500 text-white hover:bg-red-600"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100"}
  `}
>
  {isFav ? (
    <FavoriteIcon fontSize="small" className="text-white" />
  ) : (
    <FavoriteBorderIcon fontSize="small" className="text-gray-700" />
  )}
  {isFav ? "Đã thích" : "Yêu thích"}

          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
          >
            <ShoppingCartIcon /> Thêm vào giỏ
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
