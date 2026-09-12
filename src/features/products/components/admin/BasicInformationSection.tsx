import React from "react";
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import { useGetCategories } from "../../hooks/useProducts";
import { Info, Sparkles, Loader2 } from "lucide-react";

interface BasicInformationSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
}

export const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
  const nameValue = watch("name");

  // Helper to generate slug from product name
  const handleGenerateSlug = () => {
    if (!nameValue) return;
    const generatedSlug = nameValue
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setValue("slug", generatedSlug, { shouldValidate: true });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Thông tin cơ bản (Basic Information)</h3>
            <p className="text-xs text-slate-500">Tên, danh mục, thương hiệu và mô tả sản phẩm</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Tên sản phẩm <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: iPhone Duo, iPhone 16 Pro Max"
            {...register("name")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          />
          {errors.name && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Slug with Auto-generate button */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Slug <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="text-[11px] text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Tự động tạo
            </button>
          </div>
          <input
            type="text"
            placeholder="iphone-duo"
            {...register("slug")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-mono"
          />
          {errors.slug && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.slug.message}</p>
          )}
        </div>

        {/* Category Select from API */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>Danh mục (Category) <span className="text-rose-500">*</span></span>
            {isLoadingCategories && <Loader2 className="w-3 h-3 text-indigo-600 animate-spin" />}
          </label>
          <select
            {...register("categoryId")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.status})
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Brand */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Thương hiệu (Brand) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Apple"
            {...register("brand")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          />
          {errors.brand && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.brand.message}</p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Mô tả ngắn (Short Description) <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={2}
          placeholder="Mô tả tóm tắt ngắn gọn dùng hiển thị thẻ sản phẩm..."
          {...register("shortDescription")}
          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
        />
        {errors.shortDescription && (
          <p className="text-[11px] text-rose-500 font-medium">{errors.shortDescription.message}</p>
        )}
      </div>

      {/* Full Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Mô tả chi tiết (Detailed Description) <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Mô tả chi tiết đầy đủ về thiết kế, công nghệ, màn hình..."
          {...register("description")}
          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
        />
        {errors.description && (
          <p className="text-[11px] text-rose-500 font-medium">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
};
