import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-gray-200 dark:text-zinc-800 tracking-tighter">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        Trang không tồn tại
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
