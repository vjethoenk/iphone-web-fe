import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { BatteryCharging } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
}

export const BatterySpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <BatteryCharging className="w-4 h-4 text-indigo-600" />
        Pin & Sạc (Battery & Charging)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* batteryCapacity */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Dung lượng Pin</label>
          <input
            type="text"
            placeholder="4500 mAh / Mock value"
            {...register("specification.batteryCapacity")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* videoPlayback */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Thời gian xem video</label>
          <input
            type="text"
            placeholder="Up to 30 hours"
            {...register("specification.videoPlayback")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* fastCharging */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Sạc nhanh (Fast Charging)</label>
          <input
            type="text"
            placeholder="Up to 50% in approx 25 mins"
            {...register("specification.fastCharging")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.wirelessCharging")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Sạc không dây
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.magsafe")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Hỗ trợ MagSafe
        </label>
      </div>
    </div>
  );
};
