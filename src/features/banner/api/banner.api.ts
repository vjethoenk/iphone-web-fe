import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";
import type { Banner } from "../types/banner.types";

export type CreateBannerPayload = Omit<Banner, "id" | "createdAt" | "updatedAt">;

export const getBanners = () => {
	return apiClient.get<ApiResponse<Banner[]>>("/banners");
};

export const createBanner = (payload: CreateBannerPayload) => {
	return apiClient.post<ApiResponse<Banner>>("/banners", payload);
};
