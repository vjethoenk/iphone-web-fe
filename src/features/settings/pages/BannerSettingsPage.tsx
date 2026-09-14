import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AlertCircle,
    Badge as BadgeIcon,
    ChevronRight,
    Image as ImageIcon,
    Loader2,
    Plus,
    RefreshCw,
    Eye,
    EyeOff,
    Layers,
    TrendingUp,
    Hash,
} from "lucide-react";
import { useCreateBanner, useGetBanners } from "@/features/banner";
import type { BannerStatus } from "@/features/banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const initialForm = { title: "", imageUrl: "", displayOrder: "1", status: "ACTIVE" as BannerStatus };

export const BannerSettingsPage: React.FC = () => {
    const { data: banners = [], isLoading, isError, refetch } = useGetBanners();
    const createBanner = useCreateBanner();
    const [form, setForm] = useState(initialForm);

    const updateField = (field: keyof typeof initialForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createBanner.mutate(
            {
                title: form.title.trim(),
                imageUrl: form.imageUrl.trim(),
                displayOrder: Number(form.displayOrder),
                status: form.status,
            },
            { onSuccess: () => setForm(initialForm) }
        );
    };

    const activeCount = banners.filter((b) => b.status === "ACTIVE").length;
    const inactiveCount = banners.filter((b) => b.status === "INACTIVE").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <div className="mx-auto max-w-8xl space-y-6 p-6">
                {/* Header */}
                <header className="space-y-4">
                    <nav className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Link to="/admin/settings" className="font-medium transition-colors hover:text-indigo-600">
                            Settings
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                        <span className="font-semibold text-slate-900">Banners</span>
                    </nav>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                               
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Quản lý banner
                                </h1>
                            </div>
                            <p className="text-sm text-slate-500">
                                Tạo và theo dõi các banner hiển thị trên trang chủ.
                            </p>
                        </div>

                        {/* Quick stats */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-sm">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                        Hoạt động
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">{activeCount}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-sm">
                                <EyeOff className="h-4 w-4 text-slate-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                        Tạm ẩn
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">{inactiveCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <div className="grid items-start gap-6 xl:grid-cols-[400px_1fr]">
                    {/* Form Card */}
                    <Card className="h-fit border-slate-200/80 shadow-lg shadow-slate-200/40  transition-shadow hover:shadow-xl hover:shadow-slate-200/50">
                        <CardHeader className="border-b border-slate-100 ">
                            <CardTitle className="flex items-center gap-3 text-base">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/30">
                                    <Plus className="h-4 w-4" />
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-slate-900">Thêm banner mới</span>
                                    <span className="text-[11px] font-normal text-slate-500">
                                        Điền thông tin bên dưới
                                    </span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="banner-title" className="text-xs font-semibold text-slate-700">
                                        Tiêu đề
                                    </Label>
                                    <Input
                                        id="banner-title"
                                        required
                                        value={form.title}
                                        onChange={(event) => updateField("title", event.target.value)}
                                        placeholder="VD: MacBook Neo"
                                        className="h-10 border-slate-200 bg-slate-50/50 transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="banner-image" className="text-xs font-semibold text-slate-700">
                                        URL hình ảnh
                                    </Label>
                                    <div className="relative">
                                        <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="banner-image"
                                            required
                                            type="url"
                                            value={form.imageUrl}
                                            onChange={(event) => updateField("imageUrl", event.target.value)}
                                            placeholder="https://..."
                                            className="h-10 border-slate-200 bg-slate-50/50 pl-9 transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="banner-order" className="text-xs font-semibold text-slate-700">
                                        Thứ tự hiển thị
                                    </Label>
                                    <div className="relative">
                                        <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="banner-order"
                                            required
                                            min="0"
                                            type="number"
                                            value={form.displayOrder}
                                            onChange={(event) => updateField("displayOrder", event.target.value)}
                                            className="h-10 border-slate-200 bg-slate-50/50 pl-9 transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="banner-status" className="text-xs font-semibold text-slate-700">
                                        Trạng thái
                                    </Label>
                                    <select
                                        id="banner-status"
                                        value={form.status}
                                        onChange={(event) => updateField("status", event.target.value)}
                                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="ACTIVE">Đang hoạt động</option>
                                        <option value="INACTIVE">Không hoạt động</option>
                                    </select>
                                </div>

                                {createBanner.isError && (
                                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                        <span>Không thể thêm banner. Vui lòng thử lại.</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={createBanner.isPending}
                                    className="h-10 w-full bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30"
                                >
                                    {createBanner.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Thêm banner
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* List Card */}
                    <Card className="overflow-hidden p-0 border-slate-200/80 shadow-lg shadow-slate-200/40">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white py-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                                    <Layers className="h-4 w-4 text-slate-600" />
                                </div>
                                <div className="flex flex-col">
                                    <CardTitle className="text-sm font-bold text-slate-900">
                                        Danh sách banner
                                    </CardTitle>
                                    <span className="text-[11px] text-slate-500">
                                        Sắp xếp theo thứ tự hiển thị
                                    </span>
                                </div>
                            </div>
                            <Badge
                                variant="secondary"
                                className="border border-indigo-100 bg-indigo-50 text-xs font-semibold text-indigo-700"
                            >
                                {banners.length} banner
                            </Badge>
                        </CardHeader>

                        <CardContent className="p-0">
                            {isLoading ? (
                                <div className="space-y-4 p-5">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-4">
                                            <Skeleton className="h-20 w-32 rounded-lg" />
                                            <div className="flex-1 space-y-2.5">
                                                <Skeleton className="h-3.5 w-40" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                            <Skeleton className="h-6 w-24 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : isError ? (
                                <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                                        <AlertCircle className="h-7 w-7 text-red-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Không thể tải danh sách
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Đã có lỗi xảy ra, vui lòng thử lại.
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => refetch()}>
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Thử lại
                                    </Button>
                                </div>
                            ) : banners.length === 0 ? (
                                <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                        <BadgeIcon className="h-7 w-7 text-slate-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Chưa có banner nào
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Thêm banner đầu tiên bằng form bên trái.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {banners
                                        .slice()
                                        .sort((first, second) => first.displayOrder - second.displayOrder)
                                        .map((banner, index) => (
                                            <li
                                                key={banner.id ?? `${banner.title}-${banner.displayOrder}`}
                                                className="group relative flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70"
                                            >
                                                {/* Order indicator */}
                                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600">
                                                    {index + 1}
                                                </div>

                                                {/* Image */}
                                                <div className="relative h-20 w-48 shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200 transition-all group-hover:ring-indigo-200 group-hover:shadow-md">
                                                    <img
                                                        src={banner.imageUrl}
                                                        alt={banner.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold text-slate-900">
                                                        {banner.title}
                                                    </p>
                                                    <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Hash className="h-3 w-3" />
                                                            Thứ tự: {banner.displayOrder}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Status badge */}
                                                <Badge
                                                    variant={banner.status === "ACTIVE" ? "default" : "outline"}
                                                    className={
                                                        banner.status === "ACTIVE"
                                                            ? "gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                                                            : "gap-1.5 border-slate-200 bg-slate-50 text-slate-500"
                                                    }
                                                >
                                                    {banner.status === "ACTIVE" ? (
                                                        <>
                                                            <Eye className="h-3 w-3" />
                                                            Hoạt động
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="h-3 w-3" />
                                                            Tạm ẩn
                                                        </>
                                                    )}
                                                </Badge>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BannerSettingsPage;