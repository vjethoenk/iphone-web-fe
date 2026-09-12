import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { Cpu } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
}

export const PerformanceSpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Cpu className="w-4 h-4 text-indigo-600" />
        Hiệu năng & Vi xử lý (Performance)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* processor */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Chipset (Processor)</label>
          <input
            type="text"
            placeholder="Apple A20"
            {...register("specification.processor")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* cpu */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">CPU</label>
          <input
            type="text"
            placeholder="6-core CPU"
            {...register("specification.cpu")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* gpu */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">GPU</label>
          <input
            type="text"
            placeholder="5-core GPU"
            {...register("specification.gpu")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* neuralEngine */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Neural Engine</label>
          <input
            type="text"
            placeholder="16-core Neural Engine"
            {...register("specification.neuralEngine")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
