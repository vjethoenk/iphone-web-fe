import React from "react";
import type { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { Monitor } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

export const DisplaySpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Monitor className="w-4 h-4 text-indigo-600" />
        Màn hình (Display)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* displaySize */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Kích thước màn hình</label>
          <input
            type="text"
            placeholder="6.3 inches"
            {...register("specification.displaySize")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* displayType */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Công nghệ màn hình</label>
          <input
            type="text"
            placeholder="Super Retina XDR OLED"
            {...register("specification.displayType")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* displayResolution */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Độ phân giải</label>
          <input
            type="text"
            placeholder="2622 x 1206 pixels"
            {...register("specification.displayResolution")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* refreshRate */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Tần số quét</label>
          <input
            type="text"
            placeholder="Up to 120Hz ProMotion"
            {...register("specification.refreshRate")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* displayBrightness */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Độ sáng tối đa</label>
          <input
            type="text"
            placeholder="3000 nits peak outdoor"
            {...register("specification.displayBrightness")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Boolean Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.alwaysOnDisplay")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Always-On Display
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.dynamicIsland")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Dynamic Island
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.hdr")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Hỗ trợ HDR
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.trueTone")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          True Tone
        </label>
      </div>
    </div>
  );
};
