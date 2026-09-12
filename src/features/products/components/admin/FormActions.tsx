import React from "react";
import { Save, X, RotateCcw, Loader2 } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onReset,
  isSubmitting = false,
}) => {
  return (
    <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 mt-8 shadow-lg rounded-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại Form (Reset)
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            Hủy bỏ
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang lưu sản phẩm...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu sản phẩm (Save Product)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
