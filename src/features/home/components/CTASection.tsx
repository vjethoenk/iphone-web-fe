import React from "react";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const CTASection: React.FC = () => {
  return (
    <section className="py-28 md:py-40 bg-neutral-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter max-w-3xl mx-auto">
          Your next device starts here.
        </h2>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Experience zero-fee standard delivery, 30-day trial guarantee, and trade-in credit toward your new NOVA X.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={ROUTES.PRODUCTS}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition shadow-2xl flex items-center justify-center gap-2 group"
          >
            Shop NOVA X Series <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
