import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductBySlug } from "../api/products.api";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getAllProducts();
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