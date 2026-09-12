import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type { LoginRequest, LoginResult, AuthUser } from "../types/auth.types";

export const authApi = {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResult>> {
    return apiClient.post<ApiResponse<LoginResult>>("/auth/login", credentials);
  },

  getMyInfo(): Promise<ApiResponse<AuthUser>> {
    return apiClient.get<ApiResponse<AuthUser>>("/users/my-info");
  },
};
