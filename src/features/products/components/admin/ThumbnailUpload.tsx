import React, { useState } from "react";
import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import { Image as ImageIcon, Link as LinkIcon, UploadCloud, CheckCircle2 } from "lucide-react";

interface ThumbnailUploadProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

export const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  const thumbnailUrl = watch("thumbnail");
  const [imageError, setImageError] = useState(false);

  const sampleThumbnails = [
    "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
    "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/trang.png",
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <ImageIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Ảnh đại diện (Thumbnail Upload)</h3>
          <p className="text-xs text-slate-500">Ảnh hiển thị chính của sản phẩm trên trang danh sách</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {/* Left Inputs */}
        <div className="md:col-span-2 space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-600" />
              Đường dẫn URL ảnh thumbnail <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="https://domain.com/images/iphone-thumbnail.png"
              {...register("thumbnail")}
              onChange={(e) => {
                register("thumbnail").onChange(e);
                setImageError(false);
              }}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-mono"
            />
            {errors.thumbnail && (
              <p className="text-[11px] text-rose-500 font-medium">{errors.thumbnail.message}</p>
            )}
          </div>

          {/* Quick select presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              Gợi ý ảnh mẫu (Click để chọn nhanh):
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleThumbnails.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => {
                    setValue("thumbnail", url, { shouldValidate: true });
                    setImageError(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-[11px] font-medium text-slate-700 transition-all"
                >
                  Mẫu iPhone {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[160px] relative group overflow-hidden">
          {thumbnailUrl && !imageError ? (
            <div className="relative w-full flex flex-col items-center">
              <img
                src={thumbnailUrl}
                alt="Product Thumbnail Preview"
                onError={() => setImageError(true)}
                className="max-h-36 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-1 right-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ready
              </div>
            </div>
          ) : (
            <div className="text-center p-4 text-slate-400 flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8 text-slate-400 animate-bounce" />
              <span className="text-xs font-medium text-slate-500">
                {imageError ? "Lỗi tải ảnh! Kiểm tra lại URL." : "Chưa có xem trước ảnh"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
