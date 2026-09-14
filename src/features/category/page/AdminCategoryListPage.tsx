import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
  LayoutGrid,
  Pencil,
  Plus,
  Search,
  X,
  XCircle,
  Loader2,
  AlertCircle,
  FolderOpen,
  ArrowUpDown,
} from "lucide-react";

import {
  useCreateCategory,
  useGetCategories,
  useUpdateCategory,
} from "../hooks/useCategories";
import type { Category } from "../types/category.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const initialForm = {
  name: "",
  description: "",
  imageUrl: "",
};

export const AdminCategoryListPage = () => {
  const { data: categories = [], isLoading, isError, refetch } = useGetCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [form, setForm] = useState(initialForm);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const filteredCategories = categories.filter((category) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !normalizedSearch ||
      category.name.toLowerCase().includes(normalizedSearch) ||
      category.slug.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "ALL" || category.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const onSuccess = () => {
      setForm(initialForm);
      setEditingCategory(null);
    };

    if (editingCategory) {
      updateCategory.mutate(
        { id: editingCategory.id, payload: form },
        { onSuccess }
      );
      return;
    }

    createCategory.mutate(form, { onSuccess });
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description ?? "",
      imageUrl: category.imageUrl ?? "",
    });
    document
      .getElementById("create-category")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setForm(initialForm);
  };

  const isSaving = createCategory.isPending || updateCategory.isPending;

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-8xl space-y-6 p-6">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link
                to="/admin"
                className="font-medium transition-colors hover:text-indigo-600"
              >
                Admin
              </Link>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="font-semibold text-slate-900">Categories</span>
            </nav>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Quản lý danh mục
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50"
                >
                  {categories.length} danh mục
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Tổ chức các nhóm sản phẩm hiển thị trên cửa hàng.
              </p>
            </div>
          </div>
          
        </header>

        <Separator />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
          {/* LEFT: Bảng danh mục */}
          <section className="space-y-4">
            {/* Filter bar */}
            <Card className="shadow-sm">
              <CardContent className="flex flex-col gap-3 px-4 py-2 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo tên hoặc slug..."
                    className="pl-9"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as typeof statusFilter)
                  }
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                    <SelectItem value="ACTIVE">Đang hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Đã ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-slate-50/50 py-4">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-slate-500" />
                  <CardTitle className="text-sm font-bold">
                    Danh sách danh mục
                  </CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {filteredCategories.length} / {categories.length}
                </Badge>
              </CardHeader>

              <CardContent className="p-0">
                {/* Loading */}
                {isLoading && (
                  <div className="space-y-3 p-5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Error */}
                {isError && (
                  <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Không thể tải danh mục
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                    >
                      Thử lại
                    </Button>
                  </div>
                )}

                {/* Data */}
                {!isLoading &&
                  !isError &&
                  filteredCategories.length > 0 && (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Danh mục
                            </TableHead>
                            <TableHead className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-500 lg:table-cell">
                              Mô tả
                            </TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Trạng thái
                            </TableHead>
                            <TableHead className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-500 md:table-cell">
                              <span className="flex items-center gap-1">
                                Cập nhật
                                <ArrowUpDown className="h-3 w-3" />
                              </span>
                            </TableHead>
                            <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Thao tác
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCategories.map((category) => (
                            <TableRow
                              key={category.id}
                              className="group transition-colors"
                            >
                              <TableCell className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-transform group-hover:scale-105">
                                    {category.imageUrl ? (
                                      <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <ImageIcon className="h-5 w-5 text-slate-400" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-bold text-slate-900">
                                      {category.name}
                                    </p>
                                    <p className="mt-0.5 truncate font-mono text-[11px] text-slate-500">
                                      /{category.slug}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="hidden max-w-xs py-4 lg:table-cell">
                                <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                                  {category.description || (
                                    <span className="italic text-slate-400">
                                      Chưa có mô tả
                                    </span>
                                  )}
                                </p>
                              </TableCell>

                              <TableCell className="py-4">
                                {category.status === "ACTIVE" ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                                    <CheckCircle2 className="h-3 w-3" />
                                    ACTIVE
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                                    <XCircle className="h-3 w-3" />
                                    INACTIVE
                                  </span>
                                )}
                              </TableCell>

                              <TableCell className="hidden whitespace-nowrap py-4 text-xs text-slate-500 md:table-cell">
                                {category.updatedAt
                                  ? new Date(
                                      category.updatedAt
                                    ).toLocaleDateString("vi-VN")
                                  : "—"}
                              </TableCell>

                              <TableCell className="py-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => startEditing(category)}
                                  title={`Sửa ${category.name}`}
                                  className="h-8 w-8 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                {/* Empty */}
                {!isLoading &&
                  !isError &&
                  filteredCategories.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <LayoutGrid className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Chưa tìm thấy danh mục
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Thử thay đổi từ khóa hoặc tạo một danh mục mới.
                        </p>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </section>

          {/* RIGHT: Form create/edit */}
          <Card
            id="create-category"
            className={cn(
              "scroll-mt-20 shadow-sm transition-colors",
              editingCategory && "ring-2 ring-indigo-100"
            )}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                      editingCategory
                        ? "bg-amber-50 text-amber-600"
                        : "bg-indigo-50 text-indigo-600"
                    )}
                  >
                    {editingCategory ? (
                      <Pencil className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold">
                      {editingCategory ? "Sửa danh mục" : "Thêm danh mục"}
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      {editingCategory
                        ? `Đang sửa ${editingCategory.name}`
                        : "Tạo nhóm sản phẩm mới cho cửa hàng."}
                    </CardDescription>
                  </div>
                </div>
                {editingCategory && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={cancelEditing}
                    title="Hủy chỉnh sửa"
                    className="h-7 w-7 text-slate-400 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cat-name" className="text-xs font-semibold">
                    Tên danh mục
                  </Label>
                  <Input
                    id="cat-name"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="VD: iPad"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cat-desc" className="text-xs font-semibold">
                    Mô tả
                  </Label>
                  <Textarea
                    id="cat-desc"
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Khám phá các dòng iPad chính hãng..."
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cat-img" className="text-xs font-semibold">
                    URL hình ảnh
                  </Label>
                  <Input
                    id="cat-img"
                    required
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                {/* Preview ảnh */}
                {form.imageUrl && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white flex items-center justify-center">
                    <img
                      src={form.imageUrl}
                      alt="Xem trước danh mục"
                      className="h-42 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                {(createCategory.isError || updateCategory.isError) && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      Không thể {editingCategory ? "cập nhật" : "tạo"} danh mục.
                      Vui lòng kiểm tra dữ liệu và thử lại.
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : editingCategory ? (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Lưu thay đổi
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Tạo danh mục
                    </>
                  )}
                </Button>

                {editingCategory && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEditing}
                    className="w-full"
                  >
                    Hủy chỉnh sửa
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};