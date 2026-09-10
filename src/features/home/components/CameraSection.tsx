import React from "react";
import { Aperture, Sliders, SunMedium, Sparkles } from "lucide-react";

export const CameraSection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-neutral-950 text-white border-b border-neutral-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="space-y-8">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block">
              Pro Camera System
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Every detail. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Captured.
              </span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
              Introducing the 48MP Pro Triple Camera array with periscope folded optics. Capture studio-grade portraits, 8K ProRes video, and extreme micro detail in low light.
            </p>

            <div className="space-y-6 pt-4 border-t border-neutral-800">
              <div className="flex items-start gap-4">
                <Aperture className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-white">48MP Quad-Pixel Sensor</h4>
                  <p className="text-xs text-neutral-400 mt-1">4x larger light gathering capacity for crystal-clear night shots.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sliders className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-white">5x Optical Periscope Zoom</h4>
                  <p className="text-xs text-neutral-400 mt-1">120mm focal length telephoto lens with 3D sensor-shift optical image stabilization.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-white">Photonic Engine 2.0</h4>
                  <p className="text-xs text-neutral-400 mt-1">Deep fusion image pipeline combining uncompressed RAW frames before compression.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Camera Lens Graphic */}
          <div className="relative aspect-square rounded-3xl bg-gradient-to-b from-neutral-900 to-black p-8 border border-neutral-800 flex items-center justify-center overflow-hidden shadow-2xl">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-8 border-neutral-800 bg-black shadow-2xl flex items-center justify-center p-4">
              {/* Concentric Lens Rings */}
              <div className="w-full h-full rounded-full border-4 border-neutral-700/50 flex items-center justify-center p-6 bg-gradient-to-tr from-blue-900/30 via-indigo-900/20 to-purple-900/30">
                <div className="w-full h-full rounded-full border border-blue-500/40 flex items-center justify-center p-8 bg-neutral-950 shadow-inner">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center animate-pulse">
                    <SunMedium className="w-16 h-16 text-white/90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
