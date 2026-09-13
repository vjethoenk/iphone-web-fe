import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  Cpu,
  Smartphone,
  Camera,
  Wifi,
  Share2,
  Heart,
  Zap,
  Maximize2,
  X,
  Star,
} from "lucide-react";
import { useGetProductDetail } from "../hooks/useProducts";
import { useCartStore } from "@/features/cart/stores/cart.store";
import type { ProductDetail as ProductDetailType, ProductVariantDetail } from "../types/product.types";
import { Loading } from "@/components/common/Loading";

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const { data: apiProduct, isLoading } = useGetProductDetail(slug || "iphone-duo");
  const product: ProductDetailType = apiProduct || ({} as ProductDetailType);

  const initialColor = product.colors?.[0]?.name || "Deep Black";
  const initialStorage = product.storages?.[0]?.name || "256GB";

  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedStorage, setSelectedStorage] = useState<string>(initialStorage);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "policy">("overview");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const activeColorObj = useMemo(() => {
    return product.colors?.find((c) => c.name === selectedColor) || product.colors?.[0];
  }, [product.colors, selectedColor]);

  const galleryImages = useMemo(() => {
    if (activeColorObj?.images && activeColorObj.images.length > 0) {
      return activeColorObj.images.map((img) => img.imageUrl);
    }
    return [product.thumbnail];
  }, [activeColorObj, product.thumbnail]);

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0] || product.thumbnail;

  const selectedVariant: ProductVariantDetail | undefined = useMemo(() => {
    return product.variants?.find(
      (v) =>
        (v.color?.name === selectedColor || v.color?.id === activeColorObj?.id) &&
        v.storage?.name === selectedStorage
    );
  }, [product.variants, selectedColor, activeColorObj, selectedStorage]);

  const displayPrice = selectedVariant?.price || product.price || 0;
  const displayOriginalPrice = selectedVariant?.originalPrice || product.price || 0;
  const hasDiscount = displayOriginalPrice > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedStorage);
    }
    setToastMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor, selectedStorage);
    navigate("/cart");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center py-20 text-slate-900">
        <Loading />
        <p className="mt-4 text-slate-500 font-medium">Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white border border-emerald-200 text-emerald-700 px-5 py-3.5 rounded-2xl shadow-lg shadow-emerald-100/60 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Modal Preview */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute -top-12 right-0 text-slate-300 hover:text-white p-2 rounded-full bg-white/10 border border-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={currentImage}
              alt={product.name}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl bg-white p-4"
            />
            <p className="mt-4 text-slate-200 text-sm font-medium">{`${product.name} — ${selectedColor}`}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <Link to={`/products?category=${product.category?.slug || "iphone"}`} className="hover:text-blue-600 transition-colors">
            {product.category?.name || "iPhone"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{product.name}</span>
        </nav>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            <div className="relative group bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200/80 rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[380px] sm:min-h-[500px] shadow-sm overflow-hidden">
              {/* Soft glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                {product.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    Siêu phẩm 2026
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Chính hãng VN/A
                </span>
              </div>

              {/* Zoom */}
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-blue-600 border border-slate-200 shadow-sm transition-all opacity-80 group-hover:opacity-100"
                title="Phóng to hình ảnh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <img
                src={currentImage}
                alt={`${product.name} ${selectedColor}`}
                className="relative md:max-h-[340px] sm:max-h-[280px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_25px_35px_rgba(15,23,42,0.15)]"
              />
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-2xl p-2 bg-white border transition-all duration-200 overflow-hidden ${activeImageIndex === index
                      ? "border-blue-500 ring-2 ring-blue-100 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                      }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${index}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", label: "Bảo hành", value: "12 Tháng Apple" },
                { icon: Truck, color: "text-emerald-600", bg: "bg-emerald-50", label: "Vận chuyển", value: "Miễn phí toàn quốc" },
                { icon: RotateCcw, color: "text-indigo-600", bg: "bg-indigo-50", label: "Đổi trả", value: "30 ngày 1 đổi 1" },
                { icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50", label: "Trả góp", value: "Lãi suất 0%" },
              ].map(({ icon: Icon, color, bg, label, value }, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 p-3.5 rounded-2xl flex items-center gap-3 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info & Purchase */}
          <div className="lg:col-span-5 flex flex-col space-y-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="p-2 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500">4.9 · 1.240 đánh giá</span>
              </div>

              {product.shortDescription && (
                <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white border border-blue-100 p-4 rounded-2xl flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(displayOriginalPrice)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-600 border border-rose-200">
                    -{discountPercent}%
                  </span>
                </>
              )}
              <div className="w-full mt-1 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  SKU: <code className="text-slate-700 font-mono">{selectedVariant?.sku || "IPDUO-STD"}</code>
                </span>
                <span
                  className={`font-semibold ${(selectedVariant?.stockQuantity || 0) > 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                >
                  {(selectedVariant?.stockQuantity || 0) > 0
                    ? `● Còn hàng (${selectedVariant?.stockQuantity})`
                    : "✕ Hết hàng"}
                </span>
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-between">
                  <span>Màu sắc:</span>
                  <span className="text-blue-600 font-medium">{selectedColor}</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.id}
                        onClick={() => {
                          setSelectedColor(color.name);
                          setActiveImageIndex(0);
                        }}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${isSelected
                          ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-slate-200 shadow-inner shrink-0"
                          style={{ backgroundColor: color.hexCode }}
                        />
                        <span className="text-xs font-medium text-slate-700 truncate">{color.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Storage Selector */}
            {product.storages && product.storages.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-between">
                  <span>Dung lượng:</span>
                  <span className="text-blue-600 font-medium">{selectedStorage}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {product.storages.map((storage) => {
                    const isSelected = selectedStorage === storage.name;
                    const matchedVar = product.variants?.find(
                      (v) =>
                        (v.color?.name === selectedColor || v.color?.id === activeColorObj?.id) &&
                        v.storage?.name === storage.name
                    );

                    return (
                      <button
                        key={storage.id}
                        onClick={() => setSelectedStorage(storage.name)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${isSelected
                          ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-200 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        <span className={`text-sm font-bold ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                          {storage.name}
                        </span>
                        {matchedVar && (
                          <span className="text-[10px] text-slate-500 mt-1">
                            {formatPrice(matchedVar.price)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2 pt-1">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">Số lượng:</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 bg-white rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Tạm tính:{" "}
                  <strong className="text-blue-600 font-bold">{formatPrice(displayPrice * quantity)}</strong>
                </span>
              </div>
            </div>

            {/* Promotions */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>ƯU ĐÃI ĐẶC QUYỀN</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside marker:text-amber-500">
                <li>Tặng gói bảo hành AppleCare+ giảm 20% khi mua kèm.</li>
                <li>Thu cũ đổi mới trợ giá trực tiếp tới 2.000.000đ.</li>
                <li>Giảm thêm 500.000đ khi thanh toán qua VNPay / ZaloPay.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold bg-white hover:bg-slate-50 text-blue-700 border-2 border-blue-200 hover:border-blue-300 shadow-sm transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                Thêm Vào Giỏ
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 fill-white" />
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-slate-200 overflow-x-auto space-x-8 mb-8 pb-1">
            {[
              { key: "overview", label: "Mô Tả Sản Phẩm" },
              { key: "specs", label: "Thông Số Kỹ Thuật" },
              { key: "policy", label: "Chính Sách & Bảo Hành" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Điểm nổi bật của {product.name}
                </h3>
                <p className="text-slate-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Cpu, color: "text-blue-600 bg-blue-50", title: "Chip Apple A20", desc: "Sức mạnh xử lý AI & đồ họa vượt trội nhất trên smartphone." },
                  { icon: Camera, color: "text-indigo-600 bg-indigo-50", title: "Camera 48MP Fusion", desc: "Chụp đêm siêu nét, quay 4K Dolby Vision 120fps chuyên nghiệp." },
                  { icon: Smartphone, color: "text-emerald-600 bg-emerald-50", title: "ProMotion 120Hz", desc: "Super Retina XDR, độ sáng cực đại 3000 nits ngoài trời." },
                ].map(({ icon: Icon, color, title, desc }, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && product.specification && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "Màn Hình",
                  rows: [
                    ["Kích thước", product.specification.displaySize],
                    ["Công nghệ", product.specification.displayType],
                    ["Độ phân giải", product.specification.displayResolution],
                    ["Tần số quét", product.specification.refreshRate],
                    ["Độ sáng tối đa", product.specification.displayBrightness],
                  ],
                },
                {
                  icon: Cpu,
                  title: "Vi Xử Lý & Đồ Họa",
                  rows: [
                    ["Processor", product.specification.processor],
                    ["CPU", product.specification.cpu],
                    ["GPU", product.specification.gpu],
                    ["Hệ điều hành", product.specification.operatingSystem],
                  ],
                },
                {
                  icon: Camera,
                  title: "Hệ Thống Camera",
                  rows: [
                    ["Camera chính", product.specification.mainCamera],
                    ["Góc siêu rộng", product.specification.ultraWideCamera],
                    ["Telephoto", product.specification.telephotoCamera],
                    ["Selfie TrueDepth", product.specification.frontCamera],
                    ["Quay video", product.specification.videoRecording],
                  ],
                },
                {
                  icon: Wifi,
                  title: "Pin & Kết Nối",
                  rows: [
                    ["Thời lượng pin", product.specification.batteryCapacity || "Tối ưu cả ngày"],
                    ["Sạc không dây", product.specification.wirelessCharging ? "MagSafe & Qi2" : "Không"],
                    ["Wi-Fi", product.specification.wifi],
                    ["Bluetooth", product.specification.bluetooth],
                    ["Trọng lượng", `${product.specification.weight || "190g"} | ${product.specification.height || ""} x ${product.specification.width || ""}`],
                  ],
                },
              ].map(({ icon: Icon, title, rows }, idx) => (
                <div key={idx} className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-blue-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Icon className="w-4 h-4" /> {title}
                  </h4>
                  <dl className="space-y-2 text-xs sm:text-sm">
                    {rows.map(([dt, dd], i) => (
                      <div
                        key={i}
                        className={`flex justify-between py-1 ${i < rows.length - 1 ? "border-b border-slate-200/60" : ""
                          }`}
                      >
                        <dt className="text-slate-500">{dt}</dt>
                        <dd className="font-medium text-slate-800 text-right ml-4">{dd || "-"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}

          {activeTab === "policy" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Chính sách bảo hành
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bảo hành chính hãng 12 tháng tại tất cả trung tâm ủy quyền của Apple (AASP) trên toàn quốc.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="font-bold text-emerald-700 mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Chính sách đổi trả
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đổi mới trong 30 ngày đầu tiên nếu sản phẩm phát sinh lỗi từ nhà sản xuất.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 border-t border-slate-200 backdrop-blur-xl px-4 py-3 sm:px-8 shadow-[0_-8px_30px_rgba(15,23,42,0.06)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
              <img src={currentImage} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{product.name}</p>
              <p className="text-[11px] text-slate-500">{`${selectedColor} • ${selectedStorage}`}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right mr-2">
              <span className="text-xs text-slate-500 block sm:inline">Giá: </span>
              <span className="text-base sm:text-lg font-black text-blue-600">{formatPrice(displayPrice)}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2.5 rounded-xl font-bold bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-300 text-xs sm:text-sm transition-all"
            >
              Thêm Giỏ
            </button>
            <button
              onClick={handleBuyNow}
              className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};