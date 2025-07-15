import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "@/types/product"

type ProductStore = {
  products: Product[]
  favorites: Product[]
  viewed: Product[]
  cart: Product[]                           // ✅ THÊM cart
  setProducts: (ps: Product[]) => void
  addFavorite: (p: Product) => void
  toggleFavorite: (p: Product) => void
  addViewed: (p: Product) => void
  clearViewed: () => void
  addToCart: (p: Product) => void             // ✅ THÊM
  removeFromCart: (id: number) => void        // ✅ THÊM
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      favorites: [],
      viewed: [],
      cart: [] as Product[],                              // ✅ THÊM cart

      setProducts: (ps) => set({ products: ps }),

      addFavorite: (p) =>
        set((state) => ({
          favorites: [...state.favorites.filter((f) => f.id !== p.id), p],
        })),

      toggleFavorite: (p) => {
        const { favorites } = get()
        const exists = favorites.find((f) => f.id === p.id)
        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== p.id) })
        } else {
          set({ favorites: [...favorites, p] })
        }
      },

      addViewed: (p) =>
        set((state) => ({
          viewed: [...state.viewed.filter((v) => v.id !== p.id), p],
        })),

      clearViewed: () => set({ viewed: [] }),

      addToCart: (p) =>
        set((state) => ({
          cart: [...state.cart.filter((c) => c.id !== p.id), p],
        })),

      removeFromCart: (id: number) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "product-store",
      partialize: (state) => ({
        favorites: state.favorites,
        viewed: state.viewed,
        cart: state.cart, 
      }),
    }
  )
)
