import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price: number
  srcUrl: string
  quantity: number
  color?: string
  selectedSize?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, color?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item, quantity = 1) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (i) => i.id === item.id && i.color === item.color
        )
        
        if (existingItemIndex > -1) {
          // If item exists, increase quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // If item doesn't exist, add new item
          set({ items: [...items, { ...item, quantity }] })
        }
      },
      
      removeItem: (id, color) => {
        const items = get().items
        const updatedItems = items.filter(
          (item) => !(item.id === id && item.color === color)
        )
        set({ items: updatedItems })
      },
      
      updateQuantity: (id, quantity, color) => {
        if (quantity <= 0) {
          get().removeItem(id, color)
          return
        }
        
        const items = get().items
        const updatedItems = items.map((item) =>
          item.id === id && item.color === color
            ? { ...item, quantity }
            : item
        )
        set({ items: updatedItems })
      },
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      getTotalItems: () => {
        const items = get().items
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        const items = get().items
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
