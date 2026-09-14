import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories, updateCategory } from "../api/category.api";
import type { CreateCategoryPayload } from "../types/category.types";

export const categoryQueryKey = ["categories"] as const;

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryQueryKey,
    queryFn: async () => {
      const response = await getCategories();
      return response.result ?? [];
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKey });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateCategoryPayload }) =>
      updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKey });
    },
  });
};