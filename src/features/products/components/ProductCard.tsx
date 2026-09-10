import React from "react";
import type { Product } from "../types/product.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500">
      <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center overflow-hidden rounded-2xl group-hover:scale-[1.03] transition-transform duration-500">
        <img
          src={product.thumbnail}
          className="h-52 object-cover"
        />
      </div>

      {/* Product Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl text-center font-bold tracking-tight text-neutral-900 dark:text-white">
            {product.name}
          </h3>

        </div>

        {/* Pricing*/}
        <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 ">

          <div className="text-lg text-center font-bold tracking-tight text-neutral-900 dark:text-white">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    </div>
  );
};
