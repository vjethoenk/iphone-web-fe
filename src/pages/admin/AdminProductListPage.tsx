import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAdminProducts } from "@/features/products/hooks/useProducts";
import { type Product } from "@/features/products/types/product.types";
import {
  Plus,
  Search,
  Filter,
  Package,
  Layers,
  CheckCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";


export const AdminProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAdminProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const apiProducts: Product[] = Array.isArray(data?.result)
    ? data.result
    : [];

  const filteredProducts = apiProducts.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || prod.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatVND = (val: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

  return (
    <div className="p-6 max-w-8xl  space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-indigo-600 font-medium">Admin</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">Products</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Quản lý Sản phẩm
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filteredProducts.length} sản phẩm
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách tất cả sản phẩm iPhone, iPad, MacBook trong hệ thống iPhone Store.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/new")}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm, slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Trạng thái:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
          >
            <option value="ALL">Tất cả (All)</option>
            <option value="ACTIVE">ACTIVE (Đang bán)</option>
            <option value="INACTIVE">INACTIVE (Đã ẩn)</option>
          </select>
        </div>
      </div>

      {/* Product Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2 font-medium">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            Đang tải danh sách sản phẩm...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
            <Package className="w-8 h-8 text-slate-400" />
            Không tìm thấy sản phẩm nào khớp với tìm kiếm.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Sản phẩm</th>
                  <th className="px-4 py-3.5">Danh mục</th>
                  <th className="px-4 py-3.5">Thương hiệu</th>
                  <th className="px-4 py-3.5">Biến thể</th>
                  <th className="px-4 py-3.5">Giá tham chiếu</th>
                  <th className="px-4 py-3.5">Trạng thái</th>
                  <th className="px-4 py-3.5 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Name & Thumbnail */}
                    <td className="px-4 py-3.5 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
                          {prod.thumbnail ? (
                            <img
                              src={prod.thumbnail}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            {prod.name}
                            {prod.featured && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                                HOT
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">{prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 text-slate-800">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200/60">
                        {prod.category?.name || "iPhone"}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-4 py-3.5 text-slate-700 font-semibold">{prod.brand}</td>

                    {/* Variants Count */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        {prod.variants?.length || 8} SKU
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-bold text-emerald-600">
                      {formatVND(prod.price || 64990000)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      {prod.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> ACTIVE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          INACTIVE
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors shadow-xs"
                          title="Xem trên Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductListPage;
