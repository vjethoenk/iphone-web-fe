import React from "react";

export const PerformanceSection: React.FC = () => {
  const stats = [
    { label: "CPU Speed", value: "+40%", detail: "Faster processing power" },
    { label: "GPU Graphics", value: "+50%", detail: "Hardware ray tracing" },
    { label: "AI Operations", value: "35T", detail: "Per second operations" },
    { label: "Battery Efficiency", value: "+3h", detail: "Extra daily playback" },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#0b0b0f] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block">
            Silicon Excellence
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Performance without compromise.
          </h2>
          <p className="text-lg text-neutral-400">
            Engineered with industry-leading transistor density for effortless gaming, computational 3D rendering, and continuous AI workflows.
          </p>
        </div>

        {/* Big Statistics Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-2 hover:border-neutral-700 transition"
            >
              <p className="text-4xl sm:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">{stat.label}</h3>
              <p className="text-xs text-neutral-500">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
