import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative bg-white border border-none shadow-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 hover:cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center overflow-hidden rounded-2xl group-hover:scale-[1.03] transition-transform duration-500">
        <img
          src={product.thumbnail}
          alt={product.name}
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

        {/* Pricing */}
        <div className="pt-1">
          <div className="text-lg text-center font-bold tracking-tight text-blue-500">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    </Link>
  );
};
