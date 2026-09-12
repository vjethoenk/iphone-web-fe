import React from "react";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import { Globe, Star, Eye, Layers, Image as ImageIcon } from "lucide-react";

interface PublishingSectionProps {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
}

export const PublishingSection: React.FC<PublishingSectionProps> = ({ register, watch }) => {
  const status = watch("status");
  const featured = watch("featured");
  const variants = watch("variants") || [];
  const images = watch("images") || [];
  const thumbnail = watch("thumbnail");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs sticky top-24">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <Globe className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Xuất bản (Publishing)</h3>
          <p className="text-xs text-slate-500">Trạng thái hiển thị sản phẩm trên storefront</p>
        </div>
      </div>

      {/* Status Radio Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700">Trạng thái (Status)</label>
        <div className="grid grid-cols-2 gap-2.5">
          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              status === "ACTIVE"
                ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              value="ACTIVE"
              {...register("status")}
              className="text-emerald-600 focus:ring-emerald-600"
            />
            <Eye className="w-3.5 h-3.5" />
            ACTIVE (Bán)
          </label>

          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              status === "INACTIVE"
                ? "bg-rose-50 border-rose-300 text-rose-800 font-bold shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              value="INACTIVE"
              {...register("status")}
              className="text-rose-600 focus:ring-rose-600"
            />
            INACTIVE (Ẩn)
          </label>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
        <div className="space-y-0.5">
          <label htmlFor="featured-toggle" className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
            <Star className={`w-3.5 h-3.5 ${featured ? "text-amber-500 fill-amber-500" : "text-slate-400"}`} />
            Sản phẩm Nổi bật (Featured)
          </label>
          <p className="text-[11px] text-slate-500">Hiển thị ở trang chủ và banner nổi bật</p>
        </div>
        <input
          type="checkbox"
          id="featured-toggle"
          {...register("featured")}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
        />
      </div>

      {/* Form Checklist Summary */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Tóm tắt thông tin form
        </p>

        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              Thumbnail chính:
            </span>
            <span className={`font-mono text-[11px] font-bold ${thumbnail ? "text-emerald-600" : "text-amber-600"}`}>
              {thumbnail ? "Đã nhập URL" : "Chưa có"}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Tổng số biến thể:
            </span>
            <span className="font-bold text-indigo-600">{variants.length} SKU</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              Bộ sưu tập ảnh:
            </span>
            <span className="font-bold text-slate-900">{images.length} ảnh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
