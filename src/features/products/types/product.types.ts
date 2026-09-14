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
  alwaysOnDisplay?: boolean;
  dynamicIsland?: boolean;
  hdr?: boolean;
  trueTone?: boolean;
  processor?: string;
  cpu?: string;
  gpu?: string;
  neuralEngine?: string;
  mainCamera?: string;
  ultraWideCamera?: string;
  telephotoCamera?: string;
  frontCamera?: string;
  opticalZoom?: string;
  videoRecording?: string;
  batteryCapacity?: string;
  videoPlayback?: string;
  fastCharging?: string;
  wirelessCharging?: boolean;
  magsafe?: boolean;
  wifi?: string;
  bluetooth?: string;
  cellular?: string;
  nfc?: boolean;
  height?: string;
  width?: string;
  thickness?: string;
  weight?: string;
  operatingSystem?: string;
  waterResistance?: string;
  port?: string;
  sim?: string;
  charging?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id?: string;
  colorId?: string | null;
  variantId?: string | null;
  imageUrl: string;
  altText?: string;
  displayOrder?: number;
  primary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductColorOption {
  id: string;
  name: string;
  hexCode: string;
  acvite?: boolean;
}

export interface CreateColorPayload {
  name: string;
  hexCode: string;
  displayOrder: number;
  active: boolean;
}

export interface ProductStorageOption {
  id: string;
  name: string;
  capacityGb?: number;
}

export interface CreateStoragePayload {
  name: string;
  capacityGb: number;
}

export interface ProductVariantPayload {
  colorId: string;
  storageId: string;
  sku: string;
  price: number;
  originalPrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  active: boolean;
}

export interface ProductImagePayload {
  colorId?: string | null;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
  primary: boolean;
}

export interface CreateProductPayload {
  categoryId: string;
  name: string;
  slug: string;
  brand: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  status: ProductStatus;
  featured: boolean;
  variants: ProductVariantPayload[];
  images: ProductImagePayload[];
  specification: ProductSpecification;
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

// Reference Options matching setup.md sample payload IDs
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "9414aa8f-5726-4f3b-b2b5-10264a98bef0",
    name: "iPhone",
    slug: "iphone",
    description: "Các dòng điện thoại iPhone cao cấp chính hãng Apple",
    status: "ACTIVE",
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "iPad",
    slug: "ipad",
    description: "Máy tính bảng iPad chính hãng Apple",
    status: "ACTIVE",
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    name: "MacBook",
    slug: "macbook",
    description: "Dòng máy tính xách tay cao cấp MacBook",
    status: "ACTIVE",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    name: "Apple Watch",
    slug: "apple-watch",
    description: "Đồng hồ thông minh Apple Watch",
    status: "ACTIVE",
  },
  {
    id: "d4e5f6a7-b8c9-0123-def0-456789012345",
    name: "Phụ kiện",
    slug: "phu-kien",
    description: "Tai nghe AirPods, sạc MagSafe, ốp lưng",
    status: "ACTIVE",
  },
];

export const MOCK_COLORS: ProductColorOption[] = [
  {
    id: "5b3d781c-b365-476c-a2df-c0650bc71685",
    name: "Deep Black",
    hexCode: "#1F2022",
  },
  {
    id: "ca447104-f592-47aa-bab4-99b821e9b1a7",
    name: "Silver",
    hexCode: "#F1F2F4",
  },
  {
    id: "8c7d6e5f-4a3b-2c1d-0e9f-8a7b6c5d4e3f",
    name: "Natural Titanium",
    hexCode: "#99958F",
  },
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Desert Titanium",
    hexCode: "#C8B8A6",
  },
  {
    id: "9f8e7d6c-5b4a-3f2e-1d0c-9b8a7c6d5e4f",
    name: "Ultramarine",
    hexCode: "#344B6E",
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    name: "Teal",
    hexCode: "#5C8C89",
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    name: "Pink",
    hexCode: "#E6B8C2",
  },
];

export const MOCK_STORAGES: ProductStorageOption[] = [
  {
    id: "03b08163-319b-48af-9dd2-fd8757eadb3d",
    name: "256GB",
    capacityGb: 256,
  },
  {
    id: "0fe899ae-c34b-42ca-b49c-3290cd806a2b",
    name: "512GB",
    capacityGb: 512,
  },
  {
    id: "1b1d3302-413b-404e-bda2-949435c31d10",
    name: "1TB",
    capacityGb: 1024,
  },
  {
    id: "d2fd6324-d0b4-4d11-811d-676059ecf8fe",
    name: "2TB",
    capacityGb: 2048,
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    name: "128GB",
    capacityGb: 128,
  },
];