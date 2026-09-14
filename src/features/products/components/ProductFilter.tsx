import React from "react";
import { ChevronDown } from "lucide-react";

export interface FilterSelectProps {
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
  minWidth?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  icon,
  value,
  onChange,
  options,
  ariaLabel,
  minWidth = "190px",
}) => (
  <div className="relative w-full md:w-auto">
    {icon && (
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
        {icon}
      </span>
    )}

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      style={{ minWidth }}
      className={`
        appearance-none
        w-full
        ${icon ? "pl-10" : "pl-4"} pr-10 py-2.5
        rounded-full
        border border-neutral-200
        dark:border-neutral-800
        bg-white/80 dark:bg-neutral-950/80
        backdrop-blur
        text-sm font-medium
        text-neutral-900 dark:text-white
        outline-none
        cursor-pointer
        hover:border-neutral-400
        dark:hover:border-neutral-600
        focus:border-[#0071e3] dark:focus:border-[#2997ff]
        focus:ring-2 focus:ring-[#0071e3]/20
        dark:focus:ring-[#2997ff]/20
        transition
      `}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>

    <ChevronDown
      size={16}
      strokeWidth={2}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
    />
  </div>
);

export interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => (
  <span
    className="
      inline-flex items-center gap-1.5
      rounded-full
      border border-neutral-200 dark:border-neutral-800
      bg-neutral-50 dark:bg-neutral-950
      pl-3.5 pr-2 py-1.5
      text-[13px] font-medium
      text-neutral-700 dark:text-neutral-200
    "
  >
    {label}
    <button
      onClick={onRemove}
      aria-label={`Xóa bộ lọc ${label}`}
      className="
        inline-flex items-center justify-center
        w-5 h-5 rounded-full
        hover:bg-neutral-200 dark:hover:bg-neutral-800
        transition
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
);
