import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ProductPageHeader } from "@/features/products/components/admin/ProductPageHeader";
import { ProductForm } from "@/features/products/components/admin/ProductForm";
import { useGetProductDetail, useUpdateProduct } from "@/features/products/hooks/useProducts";
import type { ProductFormValues } from "@/features/products/types/product.schema";
import type { ProductDetail } from "@/features/products/types/product.types";
import { Loading } from "@/components/common/Loading";

const toFormValues = (product: ProductDetail): ProductFormValues => ({
  categoryId: product.category?.id ?? "",
  name: product.name,
  slug: product.slug,
  brand: product.brand,
  shortDescription: product.shortDescription,
  description: product.description,
  thumbnail: product.thumbnail,
  status: product.status,
  featured: product.featured,
  variants: (product.variants ?? []).map((variant) => ({
    colorId: variant.color.id,
    storageId: variant.storage.id,
    sku: variant.sku,
    price: variant.price,
    originalPrice: variant.originalPrice,
    stockQuantity: variant.stockQuantity,
    lowStockThreshold: variant.lowStockThreshold ?? 0,
    active: variant.active,
  })),
  images: (product.images ?? []).map((image) => ({
    colorId: image.colorId ?? null,
    imageUrl: image.imageUrl,
    altText: image.altText,
    displayOrder: image.displayOrder ?? 0,
    primary: image.primary ?? false,
  })),
  specification: {
    ...(product.specification ?? {}),
    alwaysOnDisplay: product.specification?.alwaysOnDisplay ?? false,
    dynamicIsland: product.specification?.dynamicIsland ?? false,
    hdr: product.specification?.hdr ?? false,
    trueTone: product.specification?.trueTone ?? false,
    wirelessCharging: product.specification?.wirelessCharging ?? false,
    magsafe: product.specification?.magsafe ?? false,
    nfc: product.specification?.nfc ?? false,
  },
});

export const ProductEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useGetProductDetail(slug);
  const updateProduct = useUpdateProduct();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const initialValues = useMemo(() => product ? toFormValues(product) : undefined, [product]);

  const handleSubmit = (values: ProductFormValues) => {
    setSuccessMsg(null);
    setErrorMsg(null);
    updateProduct.mutate({ slug, payload: values }, {
      onSuccess: () => {
        setSuccessMsg(`Cập nhật sản phẩm "${values.name}" thành công!`);
        setTimeout(() => navigate("/admin/products"), 1200);
      },
      onError: (error: any) => {
        setErrorMsg(error?.response?.data?.message || error?.message || "Không thể cập nhật sản phẩm.");
      },
    });
  };

  if (isLoading) {
    return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50/40"><Loading /><p className="text-sm text-slate-500">Đang tải thông tin sản phẩm...</p></div>;
  }

  if (isError || !product || !initialValues) {
    return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50/40"><p className="text-sm font-semibold text-slate-800">Không thể tải sản phẩm để chỉnh sửa.</p><button type="button" onClick={() => navigate("/admin/products")} className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Quay lại danh sách</button></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/40 pb-12">
      <ProductPageHeader title={`Sửa sản phẩm: ${product.name}`} subtitle="Cập nhật thông tin, biến thể, hình ảnh và thông số kỹ thuật." onCancel={() => navigate("/admin/products")} isSubmitting={updateProduct.isPending} />
      <div className="max-w-8xl px-4 sm:px-6">
        {successMsg && <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 shadow-xs"><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span className="text-sm font-bold">{successMsg}</span></div><button type="button" onClick={() => navigate("/admin/products")} className="flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-200"><ArrowLeft className="h-3.5 w-3.5" /> Danh sách</button></div>}
        <ProductForm initialValues={initialValues} onSubmit={handleSubmit} onCancel={() => navigate("/admin/products")} isSubmitting={updateProduct.isPending} submitError={errorMsg} />
      </div>
    </div>
  );
};

export default ProductEditPage;