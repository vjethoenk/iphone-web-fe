import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Loading } from "@/components/common/Loading";
import { ProductCard, useGetProducts } from "@/features/products";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const CATEGORY_INFO: Record<
    string,
    {
        title: string;
        description: string;
    }
> = {
    iphone: {
        title: "iPhone",
        description:
            "Khám phá dòng iPhone mới nhất với thiết kế tinh tế, hiệu năng mạnh mẽ và trải nghiệm iOS mượt mà.",
    },
    ipad: {
        title: "iPad",
        description:
            "Khám phá iPad với màn hình tuyệt đẹp, hiệu năng mạnh mẽ và khả năng sáng tạo không giới hạn.",
    },
    macbook: {
        title: "Mac",
        description:
            "Khám phá dòng Mac với thiết kế tinh tế, hiệu năng mạnh mẽ và trải nghiệm macOS mượt mà.",
    },
};

const CATEGORIES = [
    { value: "all", label: "Tất cả sản phẩm" },
    { value: "iphone", label: "iPhone" },
    { value: "ipad", label: "iPad" },
    { value: "macbook", label: "Mac" },
];

const SORT_OPTIONS = [
    { value: "featured", label: "Nổi bật" },
    { value: "price-asc", label: "Giá: Thấp → Cao" },
    { value: "price-desc", label: "Giá: Cao → Thấp" },
    { value: "name-asc", label: "Tên: A → Z" },
    { value: "name-desc", label: "Tên: Z → A" },
];

const PRICE_RANGES = [
    { value: "all", label: "Mọi mức giá", min: 0, max: Infinity },
    { value: "under-10", label: "Dưới 10 triệu", min: 0, max: 10_000_000 },
    { value: "10-20", label: "10 - 20 triệu", min: 10_000_000, max: 20_000_000 },
    { value: "20-30", label: "20 - 30 triệu", min: 20_000_000, max: 30_000_000 },
    { value: "over-30", label: "Trên 30 triệu", min: 30_000_000, max: Infinity },
];

/* ---------- Reusable Filter Select ---------- */
interface FilterSelectProps {
    icon?: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    ariaLabel: string;
    minWidth?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
    icon,
    value,
    onChange,
    options,
    ariaLabel,
    minWidth = "190px",
}) => (
    <div className="relative w-full md:w-auto">
        {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                {icon}
            </span>
        )}

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={ariaLabel}
            style={{ minWidth }}
            className={`
                appearance-none
                w-full
                ${icon ? "pl-10" : "pl-4"} pr-10 py-2.5
                rounded-full
                border border-neutral-200
                dark:border-neutral-800
                bg-white/80 dark:bg-neutral-950/80
                backdrop-blur
                text-sm font-medium
                text-neutral-900 dark:text-white
                outline-none
                cursor-pointer
                hover:border-neutral-400
                dark:hover:border-neutral-600
                focus:border-[#0071e3] dark:focus:border-[#2997ff]
                focus:ring-2 focus:ring-[#0071e3]/20
                dark:focus:ring-[#2997ff]/20
                transition
            `}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>

        <ChevronDown
            size={16}
            strokeWidth={2}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
        />
    </div>
);

/* ---------- Page ---------- */
const ProductPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") ?? undefined;
    const sort = searchParams.get("sort") ?? "featured";
    const price = searchParams.get("price") ?? "all";
    
     useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, [category]);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const {
        data: products = [],
        isLoading,
        isError,
    } = useGetProducts(category);

    const categoryInfo = category
        ? CATEGORY_INFO[category.toLowerCase()]
        : undefined;

    const title = categoryInfo?.title ?? "Tất cả sản phẩm";

    
    /* ----- Derived: filter + sort ----- */
    const filteredProducts = useMemo(() => {
        const range =
            PRICE_RANGES.find((r) => r.value === price) ?? PRICE_RANGES[0];

        let result = products.filter((p) => {
            const priceValue = Number((p ).price ?? 0);
            return priceValue >= range.min && priceValue < range.max;
        });

        switch (sort) {
            case "price-asc":
                result = [...result].sort(
                    (a, b) =>
                        Number((a ).price ?? 0) -
                        Number((b ).price ?? 0),
                );
                break;
            case "price-desc":
                result = [...result].sort(
                    (a, b) =>
                        Number((b ).price ?? 0) -
                        Number((a ).price ?? 0),
                );
                break;
            case "name-asc":
                result = [...result].sort((a, b) =>
                    String(a.name).localeCompare(String(b.name), "vi"),
                );
                break;
            case "name-desc":
                result = [...result].sort((a, b) =>
                    String(b.name).localeCompare(String(a.name), "vi"),
                );
                break;
            default:
                break;
        }

        return result;
    }, [products, sort, price]);

    const activeFilterCount = [
        category ? 1 : 0,
        sort !== "featured" ? 1 : 0,
        price !== "all" ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    /* ----- Handlers ----- */
    const updateParam = (key: string, value: string | null) => {
        if (!value || value === "all" || value === "featured") {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
        setSearchParams(searchParams, { replace: true });
    };

    const handleCategoryChange = (value: string) =>
        updateParam("category", value);
    const handleSortChange = (value: string) => updateParam("sort", value);
    const handlePriceChange = (value: string) => updateParam("price", value);

    const handleClearFilters = () => {
        setSearchParams({}, { replace: true });
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-black antialiased">
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Toolbar */}
                    <div className="
                        flex flex-col gap-5
                        md:flex-row md:items-end md:justify-between
                        mb-8 md:mb-12
                    ">
                        <div>
                            <h2 className="
                                text-2xl md:text-3xl font-semibold tracking-tight
                                text-neutral-900 dark:text-white
                            ">
                                {title}
                            </h2>

                            {!isLoading && !isError && (
                                <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                                    {filteredProducts.length} / {products.length} sản phẩm
                                </p>
                            )}
                        </div>

                        {/* Desktop filters */}
                        <div className="hidden md:flex items-center gap-3">
                            <FilterSelect
                                icon={<SlidersHorizontal size={16} strokeWidth={2} />}
                                value={category ?? "all"}
                                onChange={handleCategoryChange}
                                options={CATEGORIES}
                                ariaLabel="Lọc theo danh mục"
                            />

                            <FilterSelect
                                value={price}
                                onChange={handlePriceChange}
                                options={PRICE_RANGES.map(({ value, label }) => ({
                                    value,
                                    label,
                                }))}
                                ariaLabel="Lọc theo giá"
                                minWidth="170px"
                            />

                            <FilterSelect
                                value={sort}
                                onChange={handleSortChange}
                                options={SORT_OPTIONS}
                                ariaLabel="Sắp xếp"
                                minWidth="180px"
                            />

                            {activeFilterCount > 0 && (
                                <button
                                    onClick={handleClearFilters}
                                    className="
                                        inline-flex items-center gap-1.5
                                        rounded-full
                                        px-4 py-2.5
                                        text-sm font-medium
                                        text-neutral-500 dark:text-neutral-400
                                        hover:text-neutral-900 dark:hover:text-white
                                        transition
                                    "
                                >
                                    <X size={14} strokeWidth={2.5} />
                                    Xóa lọc
                                </button>
                            )}
                        </div>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileFiltersOpen((o) => !o)}
                            className="
                                md:hidden
                                inline-flex items-center justify-center gap-2
                                rounded-full
                                border border-neutral-200 dark:border-neutral-800
                                bg-white/80 dark:bg-neutral-950/80
                                backdrop-blur
                                px-4 py-2.5
                                text-sm font-medium
                                text-neutral-900 dark:text-white
                                transition
                            "
                        >
                            <SlidersHorizontal size={16} strokeWidth={2} />
                            Bộ lọc
                            {activeFilterCount > 0 && (
                                <span className="
                                    inline-flex items-center justify-center
                                    min-w-[20px] h-5 px-1.5
                                    rounded-full
                                    bg-[#0071e3] dark:bg-[#2997ff]
                                    text-[11px] font-semibold text-white
                                ">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile filters panel */}
                    {mobileFiltersOpen && (
                        <div className="
                            md:hidden
                            mb-8 p-5
                            rounded-2xl
                            border border-neutral-200 dark:border-neutral-800
                            bg-neutral-50/60 dark:bg-neutral-950/60
                            space-y-3
                        ">
                            <FilterSelect
                                icon={<SlidersHorizontal size={16} strokeWidth={2} />}
                                value={category ?? "all"}
                                onChange={handleCategoryChange}
                                options={CATEGORIES}
                                ariaLabel="Lọc theo danh mục"
                            />

                            <FilterSelect
                                value={price}
                                onChange={handlePriceChange}
                                options={PRICE_RANGES.map(({ value, label }) => ({
                                    value,
                                    label,
                                }))}
                                ariaLabel="Lọc theo giá"
                            />

                            <FilterSelect
                                value={sort}
                                onChange={handleSortChange}
                                options={SORT_OPTIONS}
                                ariaLabel="Sắp xếp"
                            />

                            {activeFilterCount > 0 && (
                                <button
                                    onClick={handleClearFilters}
                                    className="
                                        w-full inline-flex items-center justify-center gap-1.5
                                        rounded-full
                                        border border-neutral-200 dark:border-neutral-800
                                        py-2.5
                                        text-sm font-medium
                                        text-neutral-700 dark:text-neutral-200
                                        transition
                                    "
                                >
                                    <X size={14} strokeWidth={2.5} />
                                    Xóa tất cả bộ lọc
                                </button>
                            )}
                        </div>
                    )}

                    {/* Active filter chips */}
                    {activeFilterCount > 0 && (
                        <div className="hidden md:flex flex-wrap items-center gap-2 mb-8">
                            {category && (
                                <FilterChip
                                    label={
                                        CATEGORIES.find((c) => c.value === category)?.label ??
                                        category
                                    }
                                    onRemove={() => updateParam("category", null)}
                                />
                            )}
                            {price !== "all" && (
                                <FilterChip
                                    label={
                                        PRICE_RANGES.find((p) => p.value === price)?.label ??
                                        price
                                    }
                                    onRemove={() => updateParam("price", null)}
                                />
                            )}
                            {sort !== "featured" && (
                                <FilterChip
                                    label={
                                        SORT_OPTIONS.find((s) => s.value === sort)?.label ??
                                        sort
                                    }
                                    onRemove={() => updateParam("sort", null)}
                                />
                            )}
                        </div>
                    )}

                    <ErrorBoundary>
                        {/* Loading */}
                        {isLoading && (
                            <div className="py-24">
                                <Loading message="Đang tải sản phẩm..." />
                            </div>
                        )}

                        {/* Error */}
                        {!isLoading && isError && (
                            <div className="flex flex-col items-center justify-center py-28 text-center">
                                <div className="
                                    w-14 h-14 rounded-full
                                    bg-red-50 dark:bg-red-950/30
                                    flex items-center justify-center mb-5
                                ">
                                    <span className="text-xl text-red-500 dark:text-red-400">!</span>
                                </div>

                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                    Không thể tải sản phẩm
                                </h3>

                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    Đã xảy ra lỗi khi tải danh sách sản phẩm.
                                </p>
                            </div>
                        )}

                        {/* Empty */}
                        {!isLoading && !isError && filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-28 text-center">
                                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                                    Không tìm thấy sản phẩm
                                </h3>

                                <p className="mt-3 max-w-md text-[15px] text-neutral-500 dark:text-neutral-400">
                                    Không có sản phẩm nào phù hợp với bộ lọc hiện tại.
                                </p>

                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="
                                            mt-8
                                            rounded-full
                                            bg-[#0071e3] hover:bg-[#0077ed]
                                            dark:bg-[#2997ff] dark:hover:bg-[#3aa0ff]
                                            px-6 py-3
                                            text-sm font-medium
                                            text-white
                                            transition
                                            shadow-sm
                                        "
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        {!isLoading && !isError && filteredProducts.length > 0 && (
                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                xl:grid-cols-4
                                gap-5 md:gap-6
                            ">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="
                                            transition-transform duration-300 ease-out
                                            hover:-translate-y-1
                                        "
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </ErrorBoundary>
                </div>
            </section>
        </main>
    );
};

/* ---------- FilterChip ---------- */
const FilterChip: React.FC<{ label: string; onRemove: () => void }> = ({
    label,
    onRemove,
}) => (
    <span className="
        inline-flex items-center gap-1.5
        rounded-full
        border border-neutral-200 dark:border-neutral-800
        bg-neutral-50 dark:bg-neutral-950
        pl-3.5 pr-2 py-1.5
        text-[13px] font-medium
        text-neutral-700 dark:text-neutral-200
    ">
        {label}
        <button
            onClick={onRemove}
            aria-label={`Xóa bộ lọc ${label}`}
            className="
                inline-flex items-center justify-center
                w-5 h-5 rounded-full
                hover:bg-neutral-200 dark:hover:bg-neutral-800
                transition
            "
        >
            <X size={12} strokeWidth={2.5} />
        </button>
    </span>
);

export default ProductPage;