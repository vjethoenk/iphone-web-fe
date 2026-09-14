import type { ProductStatus } from "@/features/products/types/product.types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
  imageUrl: string;
}