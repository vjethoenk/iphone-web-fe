import React from "react";
import { Cpu, Zap, Shield, Sparkles, Eye, Battery } from "lucide-react";

export const TechnologySection: React.FC = () => {
  const techFeatures = [
    {
      icon: Cpu,
      title: "NOVA A1 Pro Architecture",
      description: "6-core CPU designed with 3nm architecture delivering 40% faster performance with 30% lower energy draw.",
    },
    {
      icon: Sparkles,
      title: "Neural AI Engine",
      description: "Dedicated 16-core Neural Engine performing up to 35 trillion operations per second for real-time AI assistance.",
    },
    {
      icon: Eye,
      title: "ProMotion OLED Display",
      description: "Adaptive 1Hz to 120Hz refresh rate with peak 3,000 nits outdoor brightness for unparalleled visual contrast.",
    },
    {
      icon: Shield,
      title: "Encrypted Secure Enclave",
      description: "On-device biometric vault keeping passwords, biometric data, and personal encryption keys strictly private.",
    },
    {
      icon: Zap,
      title: "HyperCharge Wireless",
      description: "Charge up to 80% in just 20 minutes with zero thermal degradation using electromagnetic induction matrix.",
    },
    {
      icon: Battery,
      title: "Quantum Battery Tech",
      description: "Solid-electrolyte battery formulation delivering high energy density for non-stop performance all day.",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
            Engineering & Innovation
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Built for what’s next.
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            A harmonious integration of custom silicon, hardware engineering, and intelligent software.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techFeatures.map((tech) => (
            <div
              key={tech.title}
              className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center">
                <tech.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {tech.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
