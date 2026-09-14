import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  HardDrive,
  Plus,
  Loader2,
  Database,
} from "lucide-react";

import { useCreateStorage, useGetStorages } from "@/features/products/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

export const StorageSettingsPage: React.FC = () => {
  const { data: storages = [], isLoading } = useGetStorages();
  const createStorage = useCreateStorage();
  const [name, setName] = useState("");
  const [capacityGb, setCapacityGb] = useState("128");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createStorage.mutate(
      { name: name.trim(), capacityGb: Number(capacityGb) },
      {
        onSuccess: () => {
          setName("");
          setCapacityGb("128");
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
            <span className="font-semibold text-slate-900">Storages</span>
          </nav>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dung lượng lưu trữ
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý các tùy chọn dung lượng cho biến thể sản phẩm.
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
                Thêm dung lượng mới
              </CardTitle>
              <CardDescription className="text-xs">
                Tạo tùy chọn dung lượng mới cho sản phẩm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storage-name" className="text-xs font-semibold">
                    Tên hiển thị
                  </Label>
                  <Input
                    id="storage-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: 2TB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage-capacity" className="text-xs font-semibold">
                    Dung lượng (GB)
                  </Label>
                  <Input
                    id="storage-capacity"
                    required
                    min="1"
                    type="number"
                    value={capacityGb}
                    onChange={(e) => setCapacityGb(e.target.value)}
                    placeholder="128"
                  />
                </div>

                {createStorage.isError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    Không thể thêm dung lượng. Vui lòng thử lại.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={createStorage.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {createStorage.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm dung lượng
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danh sách */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-slate-50/50 py-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-slate-500" />
                <CardTitle className="text-sm font-bold">
                  Danh sách dung lượng
                </CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {storages.length} tùy chọn
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              {isLoading ? (
                <div className="space-y-3 p-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-3 w-14" />
                    </div>
                  ))}
                </div>
              ) : storages.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <HardDrive className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Chưa có dung lượng nào
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Thêm dung lượng đầu tiên bằng form bên trái.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {storages.map((storage) => (
                    <li
                      key={storage.id}
                      className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-slate-50/80"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl",
                            "bg-gradient-to-br from-indigo-50 to-indigo-100",
                            "text-indigo-600 ring-1 ring-indigo-100",
                            "transition-transform group-hover:scale-105"
                          )}
                        >
                          <HardDrive className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {storage.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {storage.capacityGb} GB
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] text-slate-500"
                      >
                        #{storage.id.slice(0, 6)}
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

export default StorageSettingsPage;