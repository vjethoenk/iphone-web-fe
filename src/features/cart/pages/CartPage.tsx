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
          to={ROUTES.PRODUCTS}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse products
        </Link>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-neutral-500 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="flex gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
          >
            {item.thumbnail && (
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 dark:text-white truncate">{item.name}</p>
              {item.variantLabel && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {item.variantLabel}
                </p>
              )}
              <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                {formatCurrency(item.price)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                onClick={() => removeItem(item.productId, item.variantId)}
                className="text-neutral-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity - 1)
                  }
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity + 1)
                  }
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
        <div className="flex items-center justify-between text-xl font-bold text-neutral-900 dark:text-white">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <Link
          to={ROUTES.CHECKOUT ?? "/checkout"}
          className="block w-full text-center py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
