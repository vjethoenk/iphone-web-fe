import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { ApiException } from "@/types/api.types";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!username.trim()) {
      setValidationError("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!password) {
      setValidationError("Vui lòng nhập mật khẩu");
      return;
    }

    loginMutation.mutate({ username, password });
  };

  const apiError = loginMutation.error as ApiException | null;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {(validationError || apiError) && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/40 dark:border-red-800 dark:text-red-300 animate-in fade-in slide-in-from-top-1">
          {validationError || apiError?.message || "Đăng nhập thất bại, vui lòng thử lại."}
        </div>
      )}

      <div>
        <label
          htmlFor="username"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5"
        >
          Tên đăng nhập
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username (ví dụ: admin)"
          disabled={loginMutation.isPending}
          className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5"
        >
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loginMutation.isPending}
          className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loginMutation.isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin dark:border-black/30 dark:border-t-black" />
            <span>Đang đăng nhập...</span>
          </>
        ) : (
          <span>Đăng nhập</span>
        )}
      </button>
    </form>
  );
};
