import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";
import { tokenService } from "../services/token.service";
import { UserRole, type LoginRequest } from "../types/auth.types";
import type { ApiException } from "@/types/api.types";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      const { result } = response;
      if (result) {
        tokenService.setAccessToken(result.accessToken);
        if (result.refreshToken) {
          tokenService.setRefreshToken(result.refreshToken);
        }
        setUser(result.user);

        // Role based redirect
        const roles = (result.user?.roles || []).map((role: any) =>
          typeof role === "string" ? role : role?.name
        );
        if (roles.includes(UserRole.ADMIN)) {
          navigate("/admin", { replace: true });
        } else if (roles.includes(UserRole.STAFF)) {
          navigate("/staff", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    },
    onError: (error: ApiException) => {
      console.error("Login failed:", error.message);
    },
  });
};
