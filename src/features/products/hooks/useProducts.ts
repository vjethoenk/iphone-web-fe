import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.all,
    queryFn: () => productsApi.getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });
}
