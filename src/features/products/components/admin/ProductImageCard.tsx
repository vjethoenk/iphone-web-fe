import React from "react";
import type { ProductImagePayload, ProductColorOption } from "../../types/product.types";
import { Trash2, Star, Image as ImageIcon } from "lucide-react";

interface ProductImageCardProps {
  image: ProductImagePayload;
  index: number;
  onRemove: (index: number) => void;
  onTogglePrimary: (index: number) => void;
  onChangeColor: (index: number, colorId: string) => void;
  onChangeAltText: (index: number, altText: string) => void;
  colors: ProductColorOption[];
}

export const ProductImageCard: React.FC<ProductImageCardProps> = ({
  image,
  index,
  onRemove,
  onTogglePrimary,
  onChangeColor,
  onChangeAltText,
  colors,
}) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-indigo-400 transition-all shadow-xs">
      {/* Image Header & Preview */}
      <div className="relative h-36 bg-slate-50 flex items-center justify-center p-3 border-b border-slate-100">
        {image.imageUrl ? (
          <img
            src={image.imageUrl}
            alt={image.altText || "Product Image"}
            className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-slate-400" />
        )}

        {/* Primary Badge or Star Toggle */}
        <button
          type="button"
          onClick={() => onTogglePrimary(index)}
          className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all shadow-xs ${
            image.primary
              ? "bg-amber-400 text-slate-900 font-bold"
              : "bg-white/90 text-slate-600 hover:text-amber-600 border border-slate-200"
          }`}
          title="Đánh dấu làm ảnh chính"
        >
          <Star className={`w-3 h-3 ${image.primary ? "fill-slate-900" : ""}`} />
          {image.primary ? "Ảnh chính" : "Đặt làm chính"}
        </button>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition-colors shadow-xs"
          title="Xóa ảnh"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Details */}
      <div className="p-3.5 space-y-2.5">
        {/* Color Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Liên kết màu sắc
          </label>
          <select
            value={image.colorId || ""}
            onChange={(e) => onChangeColor(index, e.target.value)}
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

        {/* Alt Text */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Thẻ Alt (Mô tả ảnh)
          </label>
          <input
            type="text"
            placeholder="iPhone Duo Silver..."
            value={image.altText || ""}
            onChange={(e) => onChangeAltText(index, e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
