import React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There is nothing to display here right now.",
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
        <PackageOpen className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mt-1 mb-6">{description}</p>
      {action}
    </div>
  );
};
