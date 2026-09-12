import React from "react";
import { LoginForm } from "@/features/auth";
import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 shadow-xl rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
            
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Đăng nhập iPhoneStore
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Quản lý tài khoản và đơn hàng của bạn
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-black dark:text-white hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
