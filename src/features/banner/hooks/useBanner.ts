import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBanner, getBanners, type CreateBannerPayload } from "../api/banner.api";
import { apiClient, type ApiResponse } from "@/lib/api";
import type { Banner } from "../types/banner.types";

export const bannerQueryKey = ["banners"] as const;

export const useGetBanners = () => {
  return useQuery({
    queryKey: bannerQueryKey,
    queryFn: async () => {
      const response = await getBanners();
      return response.result ?? [];
    },
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBannerPayload) => createBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKey });
    },
  });
};

export const useGetBannersActive = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Banner[]>>("/banners/status/ACTIVE");
      return res.result;
    },
  });
};
