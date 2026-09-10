import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { formatCurrency } from "@/utils/formatCurrency";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Your cart is empty</h1>
        <p className="text-neutral-500 max-w-sm mx-auto">
          Explore the NOVA line-up and choose your flagship device.
        </p>
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-500 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{item.product.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Color: {item.selectedColor} • Storage: {item.selectedStorage}
                </p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white mt-2">
                  {formatCurrency(item.product.price)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden text-xs">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedColor,
                        item.selectedStorage,
                        item.quantity - 1
                      )
                    }
                    className="px-2.5 py-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-semibold text-neutral-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedColor,
                        item.selectedStorage,
                        item.quantity + 1
                      )
                    }
                    className="px-2.5 py-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeItem(item.product.id, item.selectedColor, item.selectedStorage)
                  }
                  className="text-neutral-400 hover:text-red-500 transition p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-6 h-fit">
          <h2 className="text-xl font-bold border-b border-neutral-800 pb-4">Order Summary</h2>
          
          <div className="space-y-3 text-sm text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-medium">{formatCurrency(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-400 font-medium">Free Express</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex justify-between text-lg font-bold text-white">
            <span>Total</span>
            <span>{formatCurrency(getTotalPrice())}</span>
          </div>

          <button
            onClick={() => alert("Checkout integration will be implemented in Phase 4.")}
            className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
