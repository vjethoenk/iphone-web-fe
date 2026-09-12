import React, { useEffect } from "react";
import { tokenService } from "../services/token.service";
import { useAuthStore } from "../stores/auth.store";
import { useMyInfo } from "../hooks/useMyInfo";
import { Loading } from "@/components/common/Loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const token = tokenService.getAccessToken();

  const { data, isError, isLoading, isFetched } = useMyInfo(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setInitialized(true);
      return;
    }

    if (isFetched) {
      if (data?.result) {
        setUser(data.result);
      } else if (isError) {
        setUser(null);
        tokenService.clearTokens();
      }
      setInitialized(true);
    }
  }, [token, data, isError, isFetched, setUser, setInitialized]);

  if (!isInitialized && (isLoading || token)) {
    return <Loading fullScreen message="Đang xác thực tài khoản..." />;
  }

  return <>{children}</>;
};
