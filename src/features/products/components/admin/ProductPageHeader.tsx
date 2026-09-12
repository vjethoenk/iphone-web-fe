import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Save, X, Loader2 } from "lucide-react";

interface ProductPageHeaderProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  onCancel?: () => void;
  onSave?: () => void;
  isSubmitting?: boolean;
  saveButtonText?: string;
}

export const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  title = "Add Product",
  subtitle = "Tạo một sản phẩm mới và cấu hình các biến thể, hình ảnh và thông số kỹ thuật.",
  breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Add Product" },
  ],
  onCancel,
  onSave,
  isSubmitting = false,
  saveButtonText = "Save Product",
}) => {
  return (
    <div className="sticky top-0 z-30 bg-white backdrop-blur-md border-b border-slate-200 px-6 py-4 mb-6 shadow-xs">
      <div className="max-w-8xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Title & Breadcrumbs */}
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  {crumb.href && !isLast ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-indigo-600 transition-colors font-medium text-slate-600"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-slate-900 font-semibold" : ""}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all disabled:opacity-50 shadow-xs"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}

          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {saveButtonText}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
