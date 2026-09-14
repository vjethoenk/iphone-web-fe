import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";
import type { Category, CreateCategoryPayload } from "../types/category.types";

export const getCategories = () => {
  return apiClient.get<ApiResponse<Category[]>>("/category");
};

export const createCategory = (payload: CreateCategoryPayload) => {
  return apiClient.post<ApiResponse<Category>>("/category", payload);
};

export const updateCategory = (id: string, payload: CreateCategoryPayload) => {
  return apiClient.put<ApiResponse<Category>>(`/category/${id}`, payload);
};