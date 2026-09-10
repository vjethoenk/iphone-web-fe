import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className, size = "md", text }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 gap-3", className)}>
      <Loader2 className={cn("animate-spin text-neutral-400", sizeClasses[size])} />
      {text && <p className="text-sm font-medium text-neutral-400 tracking-wide">{text}</p>}
    </div>
  );
};
