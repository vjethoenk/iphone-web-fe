import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Cpu,
  Camera,
  BatteryCharging,
  ShieldCheck,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const FeaturedProductSection: React.FC = () => {
  return (
    <section
      id="featured"
      className="py-24 md:py-36 bg-white dark:bg-neutral-950 border-b border-neutral-200/60 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2">
                Flagship Model
              </span>

              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Meet iPhone 18 Pro.
              </h2>

              <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed max-w-xl">
                A new generation of Pro performance. Powered by the
                next-generation A20 Pro chip, advanced AI capabilities,
                and a professional-grade camera system.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">

              {/* Chip */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    A20 Pro Chip
                  </h4>

                  <p className="text-xs text-neutral-500">
                    Next-gen CPU & GPU
                  </p>
                </div>
              </div>

              {/* Camera */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    48MP Pro Camera
                  </h4>

                  <p className="text-xs text-neutral-500">
                    Advanced Pro camera system
                  </p>
                </div>
              </div>

              {/* Battery */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
                  <BatteryCharging className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    All-Day Battery
                  </h4>

                  <p className="text-xs text-neutral-500">
                    Up to 32 hours playback
                  </p>
                </div>
              </div>

              {/* Titanium */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Titanium Design
                  </h4>

                  <p className="text-xs text-neutral-500">
                    Lightweight & durable
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={ROUTES.PRODUCTS}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition text-center"
              >
                Buy iPhone 18 Pro from{" "}
                {formatCurrency(38990000)}
              </a>

              <a
                href="#comparison"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition text-center"
              >
                Compare specs →
              </a>
            </div>
          </div>

          <div className="relative aspect-square rounded-3xl bg-neutral-900 p-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-neutral-800">

            {/* Top */}
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-neutral-400">
                DESIGNED IN 2026
              </span>

              <span className="text-xs font-bold text-neutral-300 bg-neutral-800 px-3 py-1 rounded-full">
                GRADE-5 TITANIUM
              </span>
            </div>

            {/* Product Image */}
            <div className="my-auto text-center flex items-center justify-center">
              <img
                src="https://nhantin.shopdunk.com/hm_service_image/iphone18pro/xanh.png"
                alt="iPhone 18 Pro"
                className="h-[300px] md:h-[340px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Bottom */}
            <div className="text-center">
              <p className="text-xs text-neutral-400">
                Titanium Black • Titanium Blue • Titanium Silver
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};