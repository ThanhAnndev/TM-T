"use client"

import { useProductStore } from "@/store/productStore"
import Image from "next/image"
import Link from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Notiflix from "notiflix"

export default function CartPage() {
  const { cart, favorites, removeFromCart } = useProductStore()

  const handleRemove = (id: number) => {
    removeFromCart(id)
    Notiflix.Notify.info(" Đã xoá khỏi giỏ hàng", {
      timeout: 2000,
      position: "right-top",
    })
  }

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6 font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
          <ShoppingCartIcon fontSize="small" className="text-blue-600" />
          Giỏ hàng của bạn
        </h1>
        <Link
          href="/"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition text-sm sm:text-base"
        >
          <ArrowBackIcon fontSize="small" />
          Quay lại trang sản phẩm
        </Link>
      </div>

      {/* Nội dung */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          Không có sản phẩm nào trong giỏ hàng <ShoppingCartIcon fontSize="small"/>
        </p>
      ) : (
        <div className="grid gap-4">
          {cart.map((product) => {
            const isFav = favorites.some((f) => f.id === product.id)

            return (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 items-center sm:items-start border border-gray-200 rounded-xl p-4 bg-white shadow hover:shadow-md transition"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={80}
                  className="w-full sm:w-28 h-24 object-cover rounded-lg"
                />

                {/* Thông tin sản phẩm */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-gray-800">
                      {product.name}
                    </h2>
                    {isFav && (
                      <span className="text-red-500 text-sm flex items-center gap-1">
                        <FavoriteIcon fontSize="small" />
                        Đã thích
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.shortDesc}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    {product.price.toLocaleString()}đ
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-white bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-md text-sm w-full sm:w-auto"
                >
                   Xoá
                </button>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
