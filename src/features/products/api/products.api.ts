import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/types/api.types";
import type {
  ProductDetail,
  Product,
  CreateProductPayload,
  Category,
  ProductColorOption,
  ProductStorageOption,
  CreateColorPayload,
  CreateStoragePayload,
} from "../types/product.types";


export const getProducts = (category?: string) => {
  return apiClient.get<ApiResponse<Product[]>>("/products", {
    params: {
      category,
    },
  });
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

export const createColor = (payload: CreateColorPayload) => {
  return apiClient.post<ApiResponse<ProductColorOption>>("/color", payload);
};

export const getStorages = () => {
  return apiClient.get<ApiResponse<ProductStorageOption[]>>("/storage");
};

export const createStorage = (payload: CreateStoragePayload) => {
  return apiClient.post<ApiResponse<ProductStorageOption>>("/storage", payload);
};