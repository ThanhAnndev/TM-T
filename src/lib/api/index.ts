import { mockProducts } from "@/lib/mockData"
import { Product } from "@/types/product"
import { useProductStore } from "@/store/productStore"

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 300)) 
  return mockProducts
}

export const getSuggestedProducts = async (userId: string): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 300))
  console.log("UserId:", userId)

  const { favorites, viewed, cart } = useProductStore.getState()

  const favIds = new Set(favorites.map((p) => p.id))
  const viewedIds = new Set(viewed.map((p) => p.id))
  const cartIds = new Set(cart.map((p) => p.id))

  const scoredProducts = mockProducts.map((p) => {
    let score = 0
    if (favIds.has(p.id)) score += 3
    if (viewedIds.has(p.id)) score += 2
    if (cartIds.has(p.id)) score += 5
    return { product: p, score }
  })

  // Sắp xếp giảm dần theo điểm
  const sorted = scoredProducts
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score > 0)
    .map((s) => s.product)

  // Nếu không có điểm ưu tiên, fallback về top 2
  return sorted.length > 0 ? sorted.slice(0, 3) : mockProducts.slice(0, 2)
}
