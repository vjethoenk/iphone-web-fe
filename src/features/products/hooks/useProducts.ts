import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductBySlug,
  getAdminProducts,
  createProduct,
  getCategories,
  getColors,
  getStorages,
} from "../api/products.api";
import type { CreateProductPayload } from "../types/product.types";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getAllProducts();
      return res;
    },
  });
};

export const useGetAdminProducts = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await getAdminProducts();
      return res;
    },
  });
};

export const useGetProductDetail = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await getProductBySlug(slug);
      return res.result;
    },
    enabled: Boolean(slug),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategories();
      return res.result || [];
    },
  });
};

export const useGetColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const res = await getColors();
      return res.result || [];
    },
  });
};

export const useGetStorages = () => {
  return useQuery({
    queryKey: ["storages"],
    queryFn: async () => {
      const res = await getStorages();
      return res.result || [];
    },
  });
};