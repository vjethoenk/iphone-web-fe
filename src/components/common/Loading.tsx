import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  message = "Đang tải...",
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-10 h-10 border-4 border-black/10 border-t-black rounded-full animate-spin dark:border-white/10 dark:border-t-white" />
      {message && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
        {content}
      </div>
    );
  }

  return content;
};
