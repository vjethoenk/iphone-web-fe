import { z } from "zod";

export const variantSchema = z.object({
  colorId: z.string().min(1, "Vui lòng chọn màu sắc"),
  storageId: z.string().min(1, "Vui lòng chọn dung lượng"),
  sku: z.string().min(1, "SKU không được để trống"),
  price: z.number().min(0, "Giá phải là số dương"),
  originalPrice: z.number().min(0, "Giá gốc phải là số dương"),
  stockQuantity: z.number().int().min(0, "Số lượng tồn kho không được âm"),
  lowStockThreshold: z.number().int().min(0),
  active: z.boolean(),
});

export type VariantFormValues = z.infer<typeof variantSchema>;

export const imageSchema = z.object({
  colorId: z.string().nullable().optional(),
  imageUrl: z.string().url("Đường dẫn ảnh không hợp lệ"),
  altText: z.string().optional(),
  displayOrder: z.number().int(),
  primary: z.boolean(),
});

export const specificationSchema = z.object({
  displaySize: z.string().optional(),
  displayType: z.string().optional(),
  displayResolution: z.string().optional(),
  refreshRate: z.string().optional(),
  displayBrightness: z.string().optional(),
  alwaysOnDisplay: z.boolean().optional(),
  dynamicIsland: z.boolean().optional(),
  hdr: z.boolean().optional(),
  trueTone: z.boolean().optional(),
  processor: z.string().optional(),
  cpu: z.string().optional(),
  gpu: z.string().optional(),
  neuralEngine: z.string().optional(),
  mainCamera: z.string().optional(),
  ultraWideCamera: z.string().optional(),
  telephotoCamera: z.string().optional(),
  frontCamera: z.string().optional(),
  opticalZoom: z.string().optional(),
  videoRecording: z.string().optional(),
  batteryCapacity: z.string().optional(),
  videoPlayback: z.string().optional(),
  fastCharging: z.string().optional(),
  wirelessCharging: z.boolean().optional(),
  magsafe: z.boolean().optional(),
  wifi: z.string().optional(),
  bluetooth: z.string().optional(),
  cellular: z.string().optional(),
  nfc: z.boolean().optional(),
  height: z.string().optional(),
  width: z.string().optional(),
  thickness: z.string().optional(),
  weight: z.string().optional(),
  operatingSystem: z.string().optional(),
  waterResistance: z.string().optional(),
  port: z.string().optional(),
  sim: z.string().optional(),
});

export const productFormSchema = z.object({
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),
  slug: z.string().min(2, "Slug không được để trống"),
  brand: z.string().min(1, "Thương hiệu không được để trống"),
  shortDescription: z.string().min(5, "Mô tả ngắn phải ít nhất 5 ký tự"),
  description: z.string().min(10, "Mô tả chi tiết phải ít nhất 10 ký tự"),
  thumbnail: z.string().url("URL ảnh đại diện phải hợp lệ"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  featured: z.boolean(),
  variants: z.array(variantSchema).min(1, "Phải tạo ít nhất 1 biến thể sản phẩm"),
  images: z.array(imageSchema),
  specification: specificationSchema,
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
