import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { Ruler } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
}

export const PhysicalSpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Ruler className="w-4 h-4 text-indigo-600" />
        Kích thước vật lý & Hệ điều hành (Physical & OS)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* height */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Chiều cao (Height)</label>
          <input
            type="text"
            placeholder="152.4 mm"
            {...register("specification.height")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* width */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Chiều rộng (Width)</label>
          <input
            type="text"
            placeholder="71.2 mm"
            {...register("specification.width")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* thickness */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Độ dày (Thickness)</label>
          <input
            type="text"
            placeholder="7.8 mm"
            {...register("specification.thickness")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* weight */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Trọng lượng (Weight)</label>
          <input
            type="text"
            placeholder="190 g"
            {...register("specification.weight")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* operatingSystem */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Hệ điều hành (OS)</label>
          <input
            type="text"
            placeholder="iOS 26"
            {...register("specification.operatingSystem")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* waterResistance */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Kháng nước (Water Resistance)</label>
          <input
            type="text"
            placeholder="IP68"
            {...register("specification.waterResistance")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
