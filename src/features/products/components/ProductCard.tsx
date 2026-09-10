import React, { useState } from "react";
import type { Product } from "../types/product.types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { Check, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0] || "");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedStorage);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-neutral-900 text-white dark:bg-white dark:text-black">
            {product.badge}
          </span>
        </div>
      )}

      {/* Visual Product Display Placeholder Frame */}
      <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-transparent via-neutral-200/30 dark:via-neutral-800/30 to-transparent group-hover:scale-[1.03] transition-transform duration-500">
        <div className="relative w-36 h-64 md:w-44 md:h-72 rounded-[36px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black p-2 shadow-2xl border-4 border-neutral-700/60 dark:border-neutral-600 flex flex-col justify-between overflow-hidden">
          {/* Dynamic Screen simulation */}
          <div className="relative w-full h-full rounded-[28px] bg-neutral-950 overflow-hidden flex flex-col justify-between p-3 border border-neutral-800">
            {/* Dynamic Island / Notch */}
            <div className="w-16 h-3 bg-black rounded-full mx-auto shadow-inner" />
            
            {/* Inner Graphics */}
            <div className="my-auto text-center space-y-1">
              <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {product.name}
              </span>
              <p className="text-[9px] text-neutral-400 tracking-wide uppercase">A1 Pro Power</p>
            </div>

            <div className="flex justify-between items-center text-[8px] text-neutral-500">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <span className="text-xs text-neutral-400 font-medium">Color: {selectedColor}</span>
          <div className="flex items-center gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select color ${color.name}`}
                className={`w-6 h-6 rounded-full ${color.bgClass} transition-all duration-200 ${
                  selectedColor === color.name
                    ? "ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-black scale-110"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Storage Selection */}
        <div className="space-y-2">
          <span className="text-xs text-neutral-400 font-medium">Storage</span>
          <div className="flex items-center gap-2">
            {product.storage.map((stg) => (
              <button
                key={stg}
                onClick={() => setSelectedStorage(stg)}
                aria-label={`Select storage ${stg}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition ${
                  selectedStorage === stg
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                    : "bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block">From</span>
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Buy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
