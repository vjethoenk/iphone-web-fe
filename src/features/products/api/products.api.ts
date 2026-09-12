import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type {
  ProductDetail,
  Product,
  CreateProductPayload,
  Category,
  ProductColorOption,
  ProductStorageOption,
} from "../types/product.types";

export const getAllProducts = () => {
  return apiClient.get<ApiResponse<Product[]>>("/products");
};

export const getAdminProducts = () => {
  return apiClient.get<ApiResponse<Product[]>>("/products");
};

export const getProductBySlug = (slug: string) => {
  return apiClient.get<ApiResponse<ProductDetail>>(`/products/${slug}`);
};

export const createProduct = (payload: CreateProductPayload) => {
  return apiClient.post<ApiResponse<Product>>("/products", payload);
};

export const getCategories = () => {
  return apiClient.get<ApiResponse<Category[]>>("/category");
};

export const getColors = () => {
  return apiClient.get<ApiResponse<ProductColorOption[]>>("/color");
};

export const getStorages = () => {
  return apiClient.get<ApiResponse<ProductStorageOption[]>>("/storage");
};