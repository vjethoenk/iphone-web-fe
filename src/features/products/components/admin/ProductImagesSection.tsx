import React, { useState } from "react";
import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import type { ProductImagePayload } from "../../types/product.types";
import { useGetColors } from "../../hooks/useProducts";
import { ProductImageCard } from "./ProductImageCard";
import { Image as ImageIcon, Plus, Sparkles, Link as LinkIcon, Loader2 } from "lucide-react";

interface ProductImagesSectionProps {
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

export const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  watch,
  setValue,
}) => {
  const { data: colors = [], isLoading: isLoadingColors } = useGetColors();
  const images = watch("images") || [];
  const [newUrl, setNewUrl] = useState("");
  const [newColorId, setNewColorId] = useState("");

  const handleAddImage = () => {
    if (!newUrl.trim()) return;
    const newImg: ProductImagePayload = {
      colorId: newColorId || (colors.length > 0 ? colors[0].id : null),
      imageUrl: newUrl.trim(),
      altText: "iPhone Product Image",
      displayOrder: images.length + 1,
      primary: images.length === 0,
    };
    setValue("images", [...images, newImg], { shouldValidate: true });
    setNewUrl("");
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((img) => img.primary)) {
      updated[0].primary = true;
    }
    setValue("images", updated, { shouldValidate: true });
  };

  const handleTogglePrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      primary: i === index,
    }));
    setValue("images", updated, { shouldValidate: true });
  };

  const handleChangeColor = (index: number, colorId: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], colorId: colorId || null };
    setValue("images", updated, { shouldValidate: true });
  };

  const handleChangeAltText = (index: number, altText: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], altText };
    setValue("images", updated, { shouldValidate: true });
  };

  const handleLoadSampleImages = () => {
    if (colors.length === 0) return;
    const sampleImages: ProductImagePayload[] = colors.slice(0, 3).map((c, idx) => ({
      colorId: c.id,
      imageUrl: "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
      altText: `iPhone Duo ${c.name}`,
      displayOrder: idx + 1,
      primary: idx === 0,
    }));
    setValue("images", sampleImages, { shouldValidate: true });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Bộ sưu tập ảnh (Product Images Gallery)
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {images.length} ảnh
              </span>
              {isLoadingColors && <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin" />}
            </h3>
            <p className="text-xs text-slate-500">Hình ảnh chi tiết theo từng màu sắc sản phẩm</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLoadSampleImages}
          disabled={colors.length === 0}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Tải ảnh mẫu theo Colors API
        </button>
      </div>

      {/* Add New Image Bar */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        <div className="md:col-span-2 relative">
          <LinkIcon className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Dán URL ảnh sản phẩm..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-all font-mono"
          />
        </div>

        <div>
          <select
            value={newColorId}
            onChange={(e) => setNewColorId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
          >
            <option value="">Tất cả màu / Chung</option>
            {colors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddImage}
          className="w-full py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Thêm ảnh
        </button>
      </div>

      {/* Gallery Cards Grid */}
      {images.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500 text-xs font-medium">
          Chưa có hình ảnh nào trong bộ sưu tập. Thêm URL ảnh ở trên hoặc bấm "Tải ảnh mẫu theo Colors API".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <ProductImageCard
              key={idx}
              image={img}
              index={idx}
              onRemove={handleRemoveImage}
              onTogglePrimary={handleTogglePrimary}
              onChangeColor={handleChangeColor}
              onChangeAltText={handleChangeAltText}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
};
