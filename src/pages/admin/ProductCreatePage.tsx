import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductPageHeader } from "@/features/products/components/admin/ProductPageHeader";
import { ProductForm } from "@/features/products/components/admin/ProductForm";
import { useCreateProduct } from "@/features/products/hooks/useProducts";
import type { ProductFormValues } from "@/features/products/types/product.schema";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const handleSubmit = (values: ProductFormValues) => {
    setSuccessMsg(null);
    setErrorMsg(null);

    createProductMutation.mutate(values, {
      onSuccess: () => {
        setSuccessMsg(`Tạo sản phẩm "${values.name}" thành công!`);
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Lỗi kết nối API.";
        setErrorMsg(message);
      },
    });
  };

  return (
    <div className="pb-12 bg-slate-50/40 min-h-screen">
      {/* Sticky Header */}
      <ProductPageHeader
        title="Thêm sản phẩm mới"
        subtitle="Tạo sản phẩm mới và cấu hình các biến thể, hình ảnh và thông số kỹ thuật."
        onCancel={handleCancel}
        isSubmitting={createProductMutation.isPending}
      />

      <div className="max-w-8xl  px-4 sm:px-6">
        {/* Success Alert Overlay */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-sm">{successMsg}</span>
            </div>
            <button
              onClick={() => navigate("/admin/products")}
              className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Đến danh sách sản phẩm
            </button>
          </div>
        )}

        {/* Main Product Form Component */}
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createProductMutation.isPending}
          submitError={errorMsg}
        />
      </div>
    </div>
  );
};

export default ProductCreatePage;
