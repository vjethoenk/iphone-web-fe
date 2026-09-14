import React, { useState } from "react";
import { useFieldArray, useWatch, type Control, type FieldErrors } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import type { ProductVariantPayload } from "../../types/product.types";
import { useGetColors, useGetStorages } from "../../hooks/useProducts";
import { VariantTable } from "./VariantTable";
import { VariantDialog } from "./VariantDialog";
import { Layers, Plus, Sparkles, Loader2 } from "lucide-react";

interface ProductVariantsSectionProps {
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
  control,
  errors,
}) => {
  const { data: colors = [], isLoading: isLoadingColors } = useGetColors();
  const { data: storages = [], isLoading: isLoadingStorages } = useGetStorages();

  const { append, remove, update, replace } = useFieldArray({
    control,
    name: "variants",
  });
  const variants = useWatch({ control, name: "variants" }) || [];
  const productSlug = useWatch({ control, name: "slug" }) || "IPDUO";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<ProductVariantPayload | null>(null);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setEditingData(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData(variants[index]);
    setIsDialogOpen(true);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleSaveVariant = (savedVariant: ProductVariantPayload, editIdx?: number | null) => {
    if (typeof editIdx === "number" && editIdx >= 0) {
      update(editIdx, savedVariant);
    } else {
      append(savedVariant);
    }
  };

  // Quick preset matrix generator dynamically using fetched API colors and storages!
  const handleGenerateSampleVariants = () => {
    if (colors.length === 0 || storages.length === 0) return;
    const generated: ProductVariantPayload[] = [];
    colors.forEach((color) => {
      storages.forEach((storage) => {
        const colorTag = color.name.toUpperCase().replace(/\s+/g, "-");
        const storageTag = storage.name.toUpperCase();
        const prefix = productSlug ? productSlug.toUpperCase().replace(/[^A-Z0-9]/g, "") : "PROD";
        generated.push({
          colorId: color.id,
          storageId: storage.id,
          sku: `${prefix}-${storageTag}-${colorTag}`,
          price: 64990000,
          originalPrice: 64990000,
          stockQuantity: 40,
          lowStockThreshold: 5,
          active: true,
        });
      });
    });
    replace(generated);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Biến thể sản phẩm (Product Variants)
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {variants.length} biến thể
              </span>
              {(isLoadingColors || isLoadingStorages) && (
                <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              )}
            </h3>
            <p className="text-xs text-slate-500">Tùy chọn kết hợp Màu sắc x Dung lượng và SKU, giá bán</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerateSampleVariants}
            disabled={colors.length === 0 || storages.length === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tạo ma trận từ API Color & Storage
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            disabled={colors.length === 0 || storages.length === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm biến thể
          </button>
        </div>
      </div>

      {errors.variants && typeof errors.variants.message === "string" && (
        <p className="text-xs text-rose-500 font-semibold">{errors.variants.message}</p>
      )}

      {/* Table */}
      <VariantTable
        variants={variants as ProductVariantPayload[]}
        onEdit={handleOpenEdit}
        onRemove={handleRemove}
        colors={colors}
        storages={storages}
      />

      {/* Modal Dialog */}
      <VariantDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveVariant}
        initialData={editingData}
        editIndex={editingIndex}
        productSlug={productSlug}
        colors={colors}
        storages={storages}
      />
    </div>
  );
};
