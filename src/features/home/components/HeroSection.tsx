import React from "react";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { ROUTES } from "@/constants/routes";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black pt-20 pb-28 md:pt-32 md:pb-40 border-b border-neutral-100 dark:border-neutral-900">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Launch Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Introducing NOVA X Series • 2026
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-neutral-900 dark:text-white max-w-5xl mx-auto leading-[0.95]">
          Designed beyond <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-800 dark:from-white dark:via-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent">
            imagination.
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-normal max-w-2xl mx-auto leading-relaxed">
          Powerful performance. Intelligent photography. A completely new smartphone experience engineered from the core up.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ROUTES.PRODUCTS}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
          >
            Buy now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#featured"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white font-semibold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 transition duration-300 flex items-center justify-center"
          >
            Explore features
          </a>
        </div>

        {/* Hero Product Render Display */}
        <div className="mt-16 sm:mt-24 relative max-w-4xl mx-auto">
          <div className="relative mx-auto aspect-[16/10] rounded-3xl bg-neutral-950 p-6 md:p-12 shadow-2xl border border-neutral-800 flex items-center justify-center overflow-hidden group">
            {/* Visual Phone Model Graphic Frame */}
            <div className="relative w-64 sm:w-80 md:w-96 h-[340px] sm:h-[420px] md:h-[500px] bg-gradient-to-b from-neutral-900 via-black to-neutral-950 rounded-[48px] border-[6px] border-neutral-700/80 shadow-2xl p-3 flex flex-col justify-between overflow-hidden group-hover:scale-105 transition-transform duration-700">
              {/* Dynamic Island Screen */}
              <div className="relative w-full h-full rounded-[38px] bg-neutral-900/90 border border-neutral-800 p-4 flex flex-col justify-between overflow-hidden">
                <div className="w-20 h-4 bg-black rounded-full mx-auto shadow-inner" />
                <div className="my-auto space-y-3 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 mx-auto blur-md animate-pulse" />
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white">NOVA X Pro</h2>
                  <p className="text-xs text-neutral-400 tracking-widest uppercase">Titanium Titanium • A1 Pro</p>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span>Starting at {formatCurrency(31990000)}</span>
                  <span>5G Ultra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
