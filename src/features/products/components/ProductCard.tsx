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
            className="
                group
                relative
                bg-white dark:bg-neutral-950
                border border-neutral-200 dark:border-neutral-800
                rounded-3xl
                p-6 md:p-8
                flex flex-col
                justify-between
                shadow-sm
                hover:shadow-2xl
                hover:border-neutral-300 dark:hover:border-neutral-700
                transition-all duration-500
                cursor-pointer
            "
        >
            {/* Thumbnail */}
            <div
                className="
                    relative
                    w-full
                    aspect-square
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                "
            >
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="
                        w-full
                        h-full
                        object-contain
                        p-6
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Product Content */}
            <div className="mt-6 space-y-4">
                <h3
                    className="
                        text-xl md:text-2xl
                        text-center
                        font-bold
                        tracking-tight
                        text-neutral-900 dark:text-white
                    "
                >
                    {product.name}
                </h3>

                {/* Pricing */}
                <div className="pt-1">
                    <div
                        className="
                            text-lg
                            text-center
                            font-bold
                            tracking-tight
                            text-blue-500
                        "
                    >
                        {formatCurrency(product.price)}
                    </div>
                </div>
            </div>
        </Link>
    );
};