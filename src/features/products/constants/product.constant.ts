export const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
  iphone: {
    title: "iPhone",
    description:
      "Khám phá dòng iPhone mới nhất với thiết kế tinh tế, hiệu năng mạnh mẽ và trải nghiệm iOS mượt mà.",
  },
  ipad: {
    title: "iPad",
    description:
      "Khám phá iPad với màn hình tuyệt đẹp, hiệu năng mạnh mẽ và khả năng sáng tạo không giới hạn.",
  },
  macbook: {
    title: "Mac",
    description:
      "Khám phá dòng Mac với thiết kế tinh tế, hiệu năng mạnh mẽ và trải nghiệm macOS mượt mà.",
  },
};

export const CATEGORIES = [
  { value: "all", label: "Tất cả sản phẩm" },
  { value: "iphone", label: "iPhone" },
  { value: "ipad", label: "iPad" },
  { value: "macbook", label: "Mac" },
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "name-asc", label: "Tên: A → Z" },
  { value: "name-desc", label: "Tên: Z → A" },
];

export const PRICE_RANGES = [
  { value: "all", label: "Mọi mức giá", min: 0, max: Infinity },
  { value: "under-10", label: "Dưới 10 triệu", min: 0, max: 10_000_000 },
  { value: "10-20", label: "10 - 20 triệu", min: 10_000_000, max: 20_000_000 },
  { value: "20-30", label: "20 - 30 triệu", min: 20_000_000, max: 30_000_000 },
  { value: "over-30", label: "Trên 30 triệu", min: 30_000_000, max: Infinity },
];
