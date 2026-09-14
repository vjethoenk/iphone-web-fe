import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  Palette,
  Plus,
  Loader2,
  Ban,
} from "lucide-react";

import { useCreateColor, useGetColors } from "@/features/products/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ColorSettingsPage: React.FC = () => {
  const { data: colors = [], isLoading } = useGetColors();
  const createColor = useCreateColor();
  const [name, setName] = useState("");
  const [hexCode, setHexCode] = useState("#0A0A0A");
  const [displayOrder, setDisplayOrder] = useState("1");
  const [active, setActive] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createColor.mutate(
      {
        name: name.trim(),
        hexCode,
        displayOrder: Number(displayOrder),
        active,
      },
      {
        onSuccess: () => {
          setName("");
          setHexCode("#0A0A0A");
          setDisplayOrder("1");
          setActive(true);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-8xl space-y-6 p-6">
        {/* Header */}
        <header className="space-y-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link
              to="/admin/settings"
              className="font-medium transition-colors hover:text-indigo-600"
            >
              Settings
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900">Colors</span>
          </nav>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Màu sắc sản phẩm
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý các màu có thể dùng cho biến thể sản phẩm.
            </p>
          </div>
        </header>

        <Separator />

        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          {/* Form thêm mới */}
          <Card className="h-fit shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Plus className="h-4 w-4" />
                </span>
                Thêm màu mới
              </CardTitle>
              <CardDescription className="text-xs">
                Tạo màu mới cho biến thể sản phẩm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tên màu */}
                <div className="space-y-2">
                  <Label htmlFor="color-name" className="text-xs font-semibold">
                    Tên màu
                  </Label>
                  <Input
                    id="color-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Deep Black"
                  />
                </div>

                {/* Mã HEX */}
                <div className="space-y-2">
                  <Label htmlFor="color-hex" className="text-xs font-semibold">
                    Mã HEX
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={hexCode}
                        onChange={(e) => setHexCode(e.target.value.toUpperCase())}
                        className="h-10 w-14 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 transition-colors hover:border-indigo-400"
                        aria-label="Chọn màu"
                      />
                    </div>
                    <Input
                      id="color-hex"
                      required
                      pattern="^#[0-9A-Fa-f]{6}$"
                      value={hexCode}
                      onChange={(e) => setHexCode(e.target.value.toUpperCase())}
                      className="min-w-0 flex-1 font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Thứ tự hiển thị */}
                <div className="space-y-2">
                  <Label htmlFor="color-order" className="text-xs font-semibold">
                    Thứ tự hiển thị
                  </Label>
                  <Input
                    id="color-order"
                    required
                    min="0"
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                  />
                </div>

                {/* Trạng thái active */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="color-active"
                      className="cursor-pointer text-xs font-semibold text-slate-700"
                    >
                      Đang hoạt động
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Hiển thị màu này cho người dùng
                    </p>
                  </div>
                  <Switch
                    id="color-active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                </div>

                {createColor.isError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    Không thể thêm màu. Vui lòng thử lại.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={createColor.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {createColor.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm màu
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danh sách màu */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-slate-50/50 py-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-slate-500" />
                <CardTitle className="text-sm font-bold">
                  Danh sách màu
                </CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {colors.length} màu
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              {isLoading ? (
                <div className="space-y-3 p-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-3 w-14" />
                    </div>
                  ))}
                </div>
              ) : colors.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <Palette className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Chưa có màu nào
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Thêm màu đầu tiên bằng form bên trái.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {colors.map((color) => (
                    <li
                      key={color.id}
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50/80"
                    >
                      <div className="flex items-center gap-3">
                        {/* Swatch màu */}
                        <div className="relative">
                          <span
                            className={cn(
                              "block h-10 w-10 rounded-full",
                              "ring-2 ring-white shadow-md",
                              "transition-transform group-hover:scale-105"
                            )}
                            style={{ backgroundColor: color.hexCode }}
                            aria-label={`Màu ${color.name}`}
                          />
                          <span
                            className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {color.name}
                          </p>
                          <p className="font-mono text-xs uppercase text-slate-500">
                            {color.hexCode}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px] text-slate-500"
                        >
                          #{color.id.slice(0, 6)}
                        </Badge>

                        {color.acvite ? (
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                            title="Đang hoạt động"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                            title="Không hoạt động"
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
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

export default ColorSettingsPage;