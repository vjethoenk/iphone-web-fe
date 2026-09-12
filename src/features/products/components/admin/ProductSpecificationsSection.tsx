import React, { useState } from "react";
import type { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.schema";
import { DisplaySpecification } from "./specifications/DisplaySpecification";
import { PerformanceSpecification } from "./specifications/PerformanceSpecification";
import { CameraSpecification } from "./specifications/CameraSpecification";
import { BatterySpecification } from "./specifications/BatterySpecification";
import { ConnectivitySpecification } from "./specifications/ConnectivitySpecification";
import { PhysicalSpecification } from "./specifications/PhysicalSpecification";
import { Sliders, Sparkles, Monitor, Cpu, Camera, BatteryCharging, Wifi, Ruler } from "lucide-react";

interface ProductSpecificationsSectionProps {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

export const ProductSpecificationsSection: React.FC<ProductSpecificationsSectionProps> = ({
  register,
  watch,
  setValue,
}) => {
  const [activeTab, setActiveTab] = useState<
    "display" | "performance" | "camera" | "battery" | "connectivity" | "physical"
  >("display");

  // Sample specifications filler matching setup.md exact payload!
  const handleFillSampleSpecs = () => {
    setValue("specification", {
      displaySize: "6.3 inches",
      displayType: "Super Retina XDR OLED",
      displayResolution: "2622 x 1206 pixels",
      refreshRate: "Up to 120Hz ProMotion",
      displayBrightness: "3000 nits peak outdoor",
      alwaysOnDisplay: true,
      dynamicIsland: true,
      hdr: true,
      trueTone: true,
      processor: "Apple A20",
      cpu: "6-core CPU",
      gpu: "5-core GPU",
      neuralEngine: "16-core Neural Engine",
      mainCamera: "48 MP Fusion",
      ultraWideCamera: "48 MP Ultra Wide",
      telephotoCamera: "12 MP Telephoto",
      frontCamera: "24 MP TrueDepth",
      opticalZoom: "Up to 5x",
      videoRecording: "4K Dolby Vision",
      batteryCapacity: "Mock value",
      videoPlayback: "Up to 30 hours",
      fastCharging: "Up to 50% in approximately 25 minutes",
      wirelessCharging: true,
      magsafe: true,
      wifi: "Wi-Fi 7",
      bluetooth: "Bluetooth 6",
      cellular: "5G",
      nfc: true,
      height: "152.4 mm",
      width: "71.2 mm",
      thickness: "7.8 mm",
      weight: "190 g",
      operatingSystem: "iOS 26",
      waterResistance: "IP68",
      port: "USB-C",
      sim: "eSIM",
    }, { shouldValidate: true });
  };

  const tabs = [
    { id: "display", label: "Màn hình", icon: Monitor },
    { id: "performance", label: "Hiệu năng", icon: Cpu },
    { id: "camera", label: "Camera", icon: Camera },
    { id: "battery", label: "Pin & Sạc", icon: BatteryCharging },
    { id: "connectivity", label: "Kết nối", icon: Wifi },
    { id: "physical", label: "Kích thước & OS", icon: Ruler },
  ] as const;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Thông số kỹ thuật (Specifications)
            </h3>
            <p className="text-xs text-slate-500">Cấu hình phần cứng chi tiết của sản phẩm</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFillSampleSpecs}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Tải thông số mẫu (Setup.md)
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-2">
        {activeTab === "display" && (
          <DisplaySpecification register={register} watch={watch} setValue={setValue} />
        )}
        {activeTab === "performance" && <PerformanceSpecification register={register} />}
        {activeTab === "camera" && <CameraSpecification register={register} />}
        {activeTab === "battery" && <BatterySpecification register={register} />}
        {activeTab === "connectivity" && <ConnectivitySpecification register={register} />}
        {activeTab === "physical" && <PhysicalSpecification register={register} />}
      </div>
    </div>
  );
};
