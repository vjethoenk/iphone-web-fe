export interface ProductColor {
  name: string;
  value: string;
  bgClass?: string;
}

export interface ProductSpecifications {
  display: string;
  chip: string;
  camera: string;
  battery: string;
  storageOptions: string[];
  weight?: string;
  waterResistance?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  badge?: string;
  images: string[];
  colors: ProductColor[];
  storage: string[];
  specifications: ProductSpecifications;
  isFeatured?: boolean;
}
