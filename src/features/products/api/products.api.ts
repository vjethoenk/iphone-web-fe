import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type { ProductDetail, Product } from "../types/product.types";

export const getAllProducts = () => {
  return apiClient.get<ApiResponse<Product[]>>("/products");
};

export const getProductBySlug = (slug: string) => {
  return apiClient.get<ApiResponse<ProductDetail>>(`/products/${slug}`);
};