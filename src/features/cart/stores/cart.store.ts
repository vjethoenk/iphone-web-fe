import { create } from "zustand";
import type { Product } from "@/features/products/types/product.types";

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedStorage: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedColor: string, selectedStorage: string) => void;
  removeItem: (productId: string, selectedColor: string, selectedStorage: string) => void;
  updateQuantity: (productId: string, selectedColor: string, selectedStorage: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}
  
export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, selectedColor, selectedStorage) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += 1;
        return { items: newItems };
      }

      return {
        items: [...state.items, { product, selectedColor, selectedStorage, quantity: 1 }],
      };
    });
  },

  removeItem: (productId, selectedColor, selectedStorage) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedStorage === selectedStorage
          )
      ),
    }));
  },

  updateQuantity: (productId, selectedColor, selectedStorage, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, selectedColor, selectedStorage);
      return;
    }

    set((state) => ({
      items: state.items.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
        ) {
          return { ...item, quantity };
        }
        return item;
      }),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalCount: () => get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
}));
