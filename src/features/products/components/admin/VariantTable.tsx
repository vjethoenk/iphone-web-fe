import React from "react";
import type { ProductVariantPayload, ProductColorOption, ProductStorageOption } from "../../types/product.types";
import { Trash2, Edit, Layers, CheckCircle, AlertTriangle } from "lucide-react";

interface VariantTableProps {
  variants: ProductVariantPayload[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  colors: ProductColorOption[];
  storages: ProductStorageOption[];
}

export const VariantTable: React.FC<VariantTableProps> = ({
  variants,
  onEdit,
  onRemove,
  colors,
  storages,
}) => {
  if (variants.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500">
        <Layers className="w-8 h-8 text-slate-400 mb-1" />
        <p className="text-xs font-semibold text-slate-700">Chưa có biến thể sản phẩm nào</p>
        <p className="text-[11px] text-slate-500">
          Vui lòng bấm nút "Thêm biến thể" hoặc "Tạo ma trận mẫu".
        </p>
      </div>
    );
  }

  // Format currency helper (VND)
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);
  };

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
      <table className="w-full text-left text-xs text-slate-700">
        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
          <tr>
            <th className="px-4 py-3.5">Màu sắc</th>
            <th className="px-4 py-3.5">Dung lượng</th>
            <th className="px-4 py-3.5">Mã SKU</th>
            <th className="px-4 py-3.5">Giá bán</th>
            <th className="px-4 py-3.5">Tồn kho</th>
            <th className="px-4 py-3.5">Trạng thái</th>
            <th className="px-4 py-3.5 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {variants.map((v, index) => {
            const colorObj = colors.find((c) => c.id === v.colorId);
            const storageObj = storages.find((s) => s.id === v.storageId);

            return (
              <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                {/* Color */}
                <td className="px-4 py-3 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: colorObj?.hexCode || "#000" }}
                    />
                    <span>{colorObj?.name || v.colorId}</span>
                  </div>
                </td>

                {/* Storage */}
                <td className="px-4 py-3 text-slate-800 font-semibold">
                  {storageObj?.name || v.storageId}
                </td>

                {/* SKU */}
                <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{v.sku}</td>

                {/* Price */}
                <td className="px-4 py-3 font-bold text-emerald-600">
                  {formatPrice(v.price)}
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      v.stockQuantity <= (v.lowStockThreshold || 5)
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {v.stockQuantity <= (v.lowStockThreshold || 5) && (
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                    )}
                    {v.stockQuantity} sp
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  {v.active ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500">
                      Disabled
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(index)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
