import { mockProducts } from "../data/products.mock";
import type { Product } from "../types/product.types";

/**
 * Product API service layer abstraction.
 * Currently uses Promise simulated delays over mock data.
 * Easily replaceable with REST API calls (e.g. apiClient.get('/products')) when Java Spring Boot is connected.
 */
export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    // Simulate minor network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockProducts;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockProducts.find((product) => product.id === id);
  },
};
