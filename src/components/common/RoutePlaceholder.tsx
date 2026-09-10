import React from "react";

interface PlaceholderProps {
  title: string;
  subtitle?: string;
}

export const RoutePlaceholder: React.FC<PlaceholderProps> = ({
  title,
  subtitle = "This page is part of the future development roadmap (Phase 2-4).",
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-4">
      <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
        NOVA Architecture • Phase 1 Ready
      </span>
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white">{title}</h1>
      <p className="text-neutral-500 max-w-md mx-auto">{subtitle}</p>
    </div>
  );
};
