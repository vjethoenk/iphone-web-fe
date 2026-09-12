import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 dark:bg-red-950/50 dark:text-red-400">
        403
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Bạn không có quyền truy cập
      </h1>
      <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-md">
        Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên hoặc quay lại trang chủ.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
        >
          Quay lại
        </button>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all text-center"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
