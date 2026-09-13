import { apiClient, type ApiResponse } from "@/services/api";
import type { Banner } from "../types/banner.types";
import { useQuery } from "@tanstack/react-query";

export const useGetBannersActive = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Banner[]>>("/banners/status/ACTIVE");
      return res.result;
    },
  });
};