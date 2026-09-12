export type ProductStatus = "ACTIVE" | "INACTIVE";

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

export interface ProductSpecification {
  id?: string;
  displaySize?: string;
  displayType?: string;
  displayResolution?: string;
  refreshRate?: string;
  displayBrightness?: string;
  processor?: string;
  cpu?: string;
  gpu?: string;
  mainCamera?: string;
  ultraWideCamera?: string;
  telephotoCamera?: string;
  frontCamera?: string;
  videoRecording?: string;
  batteryCapacity?: string;
  charging?: string | null;
  wirelessCharging?: boolean;
  wifi?: string;
  bluetooth?: string;
  cellular?: string;
  height?: string;
  width?: string;
  thickness?: string;
  weight?: string;
  operatingSystem?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: string;
  colorId?: string | null;
  variantId?: string | null;
  imageUrl: string;
  altText?: string;
  displayOrder?: number;
  primary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductColorDetail {
  id: string;
  name: string;
  hexCode: string;
  displayOrder?: number;
  active?: boolean;
  images?: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductStorageDetail {
  id: string;
  name: string;
  capacityGb?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariantDetail {
  id: string;
  color: ProductColorDetail;
  storage: ProductStorageDetail;
  sku: string;
  price: number;
  originalPrice: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  slug: string;
  brand: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  price: number;
  specification?: ProductSpecification;
  colors?: ProductColorDetail[];
  storages?: ProductStorageDetail[];
  variants?: ProductVariantDetail[];
  images?: ProductImage[];
}

export type ProductDetail = Product;