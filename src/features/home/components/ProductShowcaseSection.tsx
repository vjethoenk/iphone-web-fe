import React from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Loading } from "@/components/common/Loading";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export const ProductShowcaseSection: React.FC = () => {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <section id="showcase" className="py-24 md:py-36 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Explore the iPhone lineup.
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Choose the iPhone that fits your world. Designed to perform. Built to inspire.
          </p>
        </div>

        {/* Product Cards Grid */}
        <ErrorBoundary>
          {isLoading ? (
            <Loading message="Loading iPhone lineup..." />
          ) : isError ? (
            <div className="text-center p-12 text-red-500">Failed to load product showcase.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {products?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </section>
  );
};
