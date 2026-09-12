import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "../../../types/product.schema";
import { Wifi } from "lucide-react";

interface SpecProps {
  register: UseFormRegister<ProductFormValues>;
}

export const ConnectivitySpecification: React.FC<SpecProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
        <Wifi className="w-4 h-4 text-indigo-600" />
        Kết nối & Cổng giao tiếp (Connectivity)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* wifi */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Wi-Fi</label>
          <input
            type="text"
            placeholder="Wi-Fi 7"
            {...register("specification.wifi")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* bluetooth */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Bluetooth</label>
          <input
            type="text"
            placeholder="Bluetooth 6"
            {...register("specification.bluetooth")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* cellular */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Mạng di động (Cellular)</label>
          <input
            type="text"
            placeholder="5G"
            {...register("specification.cellular")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* port */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Cổng kết nối (Port)</label>
          <input
            type="text"
            placeholder="USB-C"
            {...register("specification.port")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* sim */}
        <div className="space-y-1">
          <label className="text-xs text-slate-700 font-semibold">Khay SIM</label>
          <input
            type="text"
            placeholder="eSIM / Dual SIM"
            {...register("specification.sim")}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-1">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            {...register("specification.nfc")}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
          />
          Hỗ trợ NFC (Apple Pay)
        </label>
      </div>
    </div>
  );
};
