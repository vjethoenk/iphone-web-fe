import React from "react";
import { useGetProducts } from "@/features/products/hooks/useProducts";
import { formatCurrency } from "@/utils/formatCurrency";

export const ComparisonSection: React.FC = () => {
  const { data: products } = useGetProducts();

  const comparisonRows = [
    { label: "Display Size", key: "display", getValue: (p: any) => p.specifications?.display },
    { label: "Chipset", key: "chip", getValue: (p: any) => p.specifications?.chip },
    { label: "Camera System", key: "camera", getValue: (p: any) => p.specifications?.camera },
    { label: "Battery Life", key: "battery", getValue: (p: any) => p.specifications?.battery },
    { label: "Water Resistance", key: "waterResistance", getValue: (p: any) => p.specifications?.waterResistance || "IP68" },
    { label: "Weight", key: "weight", getValue: (p: any) => p.specifications?.weight },
  ];

  return (
    <section id="comparison" className="py-24 md:py-36 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200/60 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Which NOVA is right for you?
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Compare features and hardware across all models.
          </p>
        </div>

        {/* Responsive Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 w-1/4">
                  Feature / Specs
                </th>
                {products?.result?.map((product) => (
                  <th key={product.id} className="py-6 px-4 text-center w-1/4">
                    <div className="space-y-1">
                      <span className="text-xl font-extrabold text-neutral-900 dark:text-white block">
                        {product.name}
                      </span>
                      {/* <span className="text-xs text-neutral-500 block">{product.tagline}</span> */}
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block pt-2">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              {comparisonRows.map((row) => (
                <tr key={row.key} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 bg-white dark:bg-neutral-100/50 transition">
                  <td className="py-5 px-4 font-semibold text-neutral-900 dark:text-white text-xs tracking-wide uppercase">
                    {row.label}
                  </td>
                  {products?.result?.map((product) => (
                    <td key={product.id} className="py-5 px-4 text-center text-neutral-600 dark:text-neutral-300 font-medium">
                      {row.getValue(product)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
