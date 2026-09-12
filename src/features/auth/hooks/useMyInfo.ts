import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { tokenService } from "../services/token.service";
import type { ApiException } from "@/types/api.types";

export const MY_INFO_QUERY_KEY = ["auth", "my-info"] as const;

export const useMyInfo = (enabled = true) => {
  const token = tokenService.getAccessToken();

  return useQuery({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: () => authApi.getMyInfo(),
    enabled: Boolean(token) && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: ApiException) => {
      // Do not retry on 401 unauthenticated
      if (error?.code === 401) return false;
      return failureCount < 2;
    },
  });
};
