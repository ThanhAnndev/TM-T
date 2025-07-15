"use client"
import { Product } from "@/types/product"
import { useProductStore } from "@/store/productStore"
import Image from "next/image"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notiflix from "notiflix"

export default function ProductCard({
  product,
  onViewDetail,
}: {
  product: Product
  onViewDetail: (p: Product) => void
}) {
  const { favorites, toggleFavorite, addViewed, addToCart } = useProductStore()
  const isFav = favorites.some((p) => p.id === product.id)

  const handleViewDetail = () => {
    addViewed(product)
    onViewDetail(product)
  }

  const handleAddToCart = () => {
    addToCart(product)
    Notiflix.Notify.success(`${product.name} đã được thêm vào giỏ hàng`, {
      timeout: 1500,
      position: "right-top",
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    Notiflix.Notify.success(
      isFav ? "Đã xoá khỏi danh sách yêu thích " : "Đã thêm vào yêu thích ",
      { timeout: 1500, position: "right-top" }
    )
  }

  return (
    <div className="border rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-white p-4 flex flex-col">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={200}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold text-gray-800 mt-3">{product.name}</h2>
      <p className="text-sm text-gray-600 mt-1">{product.shortDesc}</p>
      <p className="text-blue-600 font-bold text-base mt-2">{product.price.toLocaleString()}đ</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleViewDetail}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Xem chi tiết
        </button>
        <button
  onClick={handleToggleFavorite}
  className={`text-sm px-4 py-2 rounded-md transition flex items-center gap-1
    ${isFav
      ? "bg-red-500 hover:bg-red-600 text-white"
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
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition"
        >
          <ShoppingCartIcon /> Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}
