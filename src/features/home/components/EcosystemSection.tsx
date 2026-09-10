import React from "react";
import { Watch, Headphones, Tablet, Cloud } from "lucide-react";

export const EcosystemSection: React.FC = () => {
  const ecosystemItems = [
    {
      name: "NOVA Watch",
      category: "Wearable Health",
      desc: "ECG monitoring, precision GPS, and seamless cellular connectivity on your wrist.",
      icon: Watch,
    },
    {
      name: "NOVA Buds Pro",
      category: "Audio",
      desc: "Active noise cancellation with lossless 24-bit spatial audio streaming.",
      icon: Headphones,
    },
    {
      name: "NOVA Pad",
      category: "Creativity",
      desc: "Ultra Retina XDR tablet powered by NOVA M1 chip for professional digital art.",
      icon: Tablet,
    },
    {
      name: "NOVA Cloud",
      category: "Services",
      desc: "End-to-end encrypted backup, real-time sync, and intelligent media search.",
      icon: Cloud,
    },
  ];

  return (
    <section id="ecosystem" className="py-24 md:py-36 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
            NOVA Universe
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Everything works beautifully together.
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Extend your capabilities across our fully integrated hardware and cloud ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemItems.map((item) => (
            <div
              key={item.name}
              className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{item.name}</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/60 dark:border-neutral-800">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline cursor-pointer">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
