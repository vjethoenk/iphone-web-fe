import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { tokenService } from "@/features/auth/services/token.service";
import { ApiException } from "@/types/api.types";

export function setupInterceptors(onAuthError?: () => void) {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenService.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response.data;
      // Handle Spring Boot style custom response structure if present
      if (data && typeof data === "object" && "code" in data) {
        if (data.code !== 1000 && data.code !== 200) {
          throw new ApiException(
            data.message || "Request failed with backend code " + data.code,
            data.code,
            data
          );
        }
      }
      return response;
    },
    (error: AxiosError<any>) => {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 401) {
        tokenService.clearTokens();
        if (onAuthError) {
          onAuthError();
        } else {
          // If window location is not /login, redirect
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
          }
        }
        return Promise.reject(
          new ApiException(data?.message || "Unauthenticated", 401, data)
        );
      }

      if (status === 403) {
        if (typeof window !== "undefined" && window.location.pathname !== "/403") {
          window.location.href = "/403";
        }
        return Promise.reject(
          new ApiException(data?.message || "Forbidden access", 403, data)
        );
      }

      const errorMessage =
        data?.message || error.message || "An unexpected error occurred";
      const errorCode = data?.code || status || 500;

      return Promise.reject(new ApiException(errorMessage, errorCode, data));
    }
  );
}

// Initial interceptor setup
setupInterceptors();
