import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { Camera } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
}

export const CameraSpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Camera className="w-4 h-4 text-indigo-600" />
        Hệ thống Camera (Camera System)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* mainCamera */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Camera chính (Main)</label>
          <input
            type="text"
            placeholder="48 MP Fusion"
            {...register("specification.mainCamera")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* ultraWideCamera */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Camera góc rộng (Ultra Wide)</label>
          <input
            type="text"
            placeholder="48 MP Ultra Wide"
            {...register("specification.ultraWideCamera")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* telephotoCamera */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Camera Telephoto</label>
          <input
            type="text"
            placeholder="12 MP Telephoto"
            {...register("specification.telephotoCamera")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* frontCamera */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Camera trước (Front)</label>
          <input
            type="text"
            placeholder="24 MP TrueDepth"
            {...register("specification.frontCamera")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* opticalZoom */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Thu phóng quang học (Optical Zoom)</label>
          <input
            type="text"
            placeholder="Up to 5x"
            {...register("specification.opticalZoom")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* videoRecording */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Quay video</label>
          <input
            type="text"
            placeholder="4K Dolby Vision"
            {...register("specification.videoRecording")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
