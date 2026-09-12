import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantSchema, type VariantFormValues } from "../../types/product.schema";
import type { ProductVariantPayload, ProductColorOption, ProductStorageOption } from "../../types/product.types";
import { X, Plus, Edit2 } from "lucide-react";

interface VariantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (variant: ProductVariantPayload, editIndex?: number) => void;
  initialData?: ProductVariantPayload | null;
  editIndex?: number | null;
  productSlug?: string;
  colors: ProductColorOption[];
  storages: ProductStorageOption[];
}

export const VariantDialog: React.FC<VariantDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  editIndex,
  productSlug = "IPDUO",
  colors,
  storages,
}) => {
  const defaultColorId = colors.length > 0 ? colors[0].id : "";
  const defaultStorageId = storages.length > 0 ? storages[0].id : "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      colorId: defaultColorId,
      storageId: defaultStorageId,
      sku: `${productSlug.toUpperCase()}-256GB-BLACK`,
      price: 64990000,
      originalPrice: 64990000,
      stockQuantity: 40,
      lowStockThreshold: 5,
      active: true,
    },
  });

  const selectedColorId = watch("colorId");
  const selectedStorageId = watch("storageId");

  useEffect(() => {
    if (initialData) {
      reset({
        colorId: initialData.colorId,
        storageId: initialData.storageId,
        sku: initialData.sku,
        price: initialData.price,
        originalPrice: initialData.originalPrice,
        stockQuantity: initialData.stockQuantity,
        lowStockThreshold: initialData.lowStockThreshold,
        active: initialData.active,
      });
    } else {
      reset({
        colorId: colors[0]?.id || "",
        storageId: storages[0]?.id || "",
        sku: `${productSlug.toUpperCase()}-256GB-BLACK`,
        price: 64990000,
        originalPrice: 64990000,
        stockQuantity: 40,
        lowStockThreshold: 5,
        active: true,
      });
    }
  }, [initialData, reset, productSlug, isOpen, colors, storages]);

  // Auto-generate SKU when color or storage changes if creating new
  useEffect(() => {
    if (initialData) return;
    const colorObj = colors.find((c) => c.id === selectedColorId);
    const storageObj = storages.find((s) => s.id === selectedStorageId);
    const colorTag = colorObj ? colorObj.name.toUpperCase().replace(/\s+/g, "-") : "COLOR";
    const storageTag = storageObj ? storageObj.name.toUpperCase() : "STORAGE";
    const prefix = productSlug ? productSlug.toUpperCase().replace(/[^A-Z0-9]/g, "") : "PROD";
    setValue("sku", `${prefix}-${storageTag}-${colorTag}`);
  }, [selectedColorId, selectedStorageId, productSlug, initialData, setValue, colors, storages]);

  if (!isOpen) return null;

  const onSubmitForm = (data: VariantFormValues) => {
    onSave(
      {
        ...data,
        lowStockThreshold: data.lowStockThreshold ?? 5,
        active: data.active ?? true,
      },
      editIndex !== null && editIndex !== undefined ? editIndex : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            {editIndex !== null && editIndex !== undefined ? (
              <Edit2 className="w-4 h-4 text-indigo-600" />
            ) : (
              <Plus className="w-4 h-4 text-indigo-600" />
            )}
            <h3 className="text-sm font-bold text-slate-900">
              {editIndex !== null && editIndex !== undefined ? "Chỉnh sửa biến thể" : "Thêm biến thể mới"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Color Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Màu sắc <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("colorId")}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              >
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              {errors.colorId && (
                <p className="text-[11px] text-rose-500">{errors.colorId.message}</p>
              )}
            </div>

            {/* Storage Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Dung lượng <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("storageId")}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              >
                {storages.map((storage) => (
                  <option key={storage.id} value={storage.id}>
                    {storage.name}
                  </option>
                ))}
              </select>
              {errors.storageId && (
                <p className="text-[11px] text-rose-500">{errors.storageId.message}</p>
              )}
            </div>
          </div>

          {/* SKU */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Mã SKU <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("sku")}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-600 transition-all"
            />
            {errors.sku && <p className="text-[11px] text-rose-500">{errors.sku.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Giá bán (VND) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              />
              {errors.price && <p className="text-[11px] text-rose-500">{errors.price.message}</p>}
            </div>

            {/* Original Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Giá gốc (VND) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                {...register("originalPrice", { valueAsNumber: true })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              />
              {errors.originalPrice && (
                <p className="text-[11px] text-rose-500">{errors.originalPrice.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Stock Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Tồn kho <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                {...register("stockQuantity", { valueAsNumber: true })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              />
              {errors.stockQuantity && (
                <p className="text-[11px] text-rose-500">{errors.stockQuantity.message}</p>
              )}
            </div>

            {/* Low Stock Threshold */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Ngưỡng tồn kho thấp</label>
              <input
                type="number"
                {...register("lowStockThreshold", { valueAsNumber: true })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
              />
            </div>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="variant-active"
              {...register("active")}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="variant-active" className="text-xs font-medium text-slate-700 cursor-pointer">
              Kích hoạt biến thể này (Active)
            </label>
          </div>

          {/* Dialog Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
            >
              {editIndex !== null && editIndex !== undefined ? "Cập nhật biến thể" : "Lưu biến thể"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
