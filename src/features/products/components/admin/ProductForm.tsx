import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues } from "../../types/product.schema";
import { useGetCategories, useGetColors, useGetStorages } from "../../hooks/useProducts";
import { BasicInformationSection } from "./BasicInformationSection";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { ProductVariantsSection } from "./ProductVariantsSection";
import { ProductImagesSection } from "./ProductImagesSection";
import { ProductSpecificationsSection } from "./ProductSpecificationsSection";
import { PublishingSection } from "./PublishingSection";
import { FormActions } from "./FormActions";
import { Sparkles, AlertCircle } from "lucide-react";

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<ProductFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isSubmitting = false,
  submitError = null,
}) => {
  const { data: categories = [] } = useGetCategories();
  const { data: colors = [] } = useGetColors();
  const { data: storages = [] } = useGetStorages();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      categoryId: categories[0]?.id || "",
      name: "",
      slug: "",
      brand: "Apple",
      shortDescription: "",
      description: "",
      thumbnail: "",
      status: "ACTIVE",
      featured: true,
      variants: [],
      images: [],
      specification: {
        alwaysOnDisplay: false,
        dynamicIsland: false,
        hdr: false,
        trueTone: false,
        wirelessCharging: false,
        magsafe: false,
        nfc: false,
      },
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        ...form.getValues(),
        ...initialValues,
        specification: {
          ...form.getValues("specification"),
          ...initialValues.specification,
        },
      });
    }
  }, [initialValues]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  // Auto-fill sample demo using real fetched Category/Color/Storage IDs when available
  const handleAutoFillSetupSample = () => {
    const selectedCategoryId = categories[0]?.id || "9414aa8f-5726-4f3b-b2b5-10264a98bef0";
    const blackColorId = colors.find((c) => c.name.toLowerCase().includes("black"))?.id || colors[0]?.id || "0d5259cc-2e22-4044-a867-ee7953c9af7f";
    const silverColorId = colors.find((c) => c.name.toLowerCase().includes("silver"))?.id || colors[1]?.id || "2cb06d72-a346-465a-a57e-3e49ff64d5e0";
    const storage1 = storages[0]?.id || "03b08163-319b-48af-9dd2-fd8757eadb3d";
    const storage2 = storages[1]?.id || "0fe899ae-c34b-42ca-b49c-3290cd806a2b";

    reset({
      categoryId: selectedCategoryId,
      name: "iPhone Duo",
      slug: "iphone-duo",
      brand: "Apple",
      shortDescription:
        "iPhone Duo với thiết kế hiện đại, hiệu năng mạnh mẽ và trải nghiệm màn hình cao cấp.",
      description:
        "iPhone Duo là mẫu smartphone cao cấp của Apple, hướng đến trải nghiệm sử dụng hiện đại với thiết kế tinh tế, hiệu năng mạnh mẽ, hệ thống camera chất lượng cao và thời lượng pin được tối ưu.",
      thumbnail: "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
      status: "ACTIVE",
      featured: true,
      variants: [
        {
          colorId: blackColorId,
          storageId: storage1,
          sku: "IPDUO-256GB-BLACK",
          price: 64990000,
          originalPrice: 64990000,
          stockQuantity: 40,
          lowStockThreshold: 5,
          active: true,
        },
        {
          colorId: blackColorId,
          storageId: storage2,
          sku: "IPDUO-512GB-BLACK",
          price: 71490000,
          originalPrice: 71490000,
          stockQuantity: 40,
          lowStockThreshold: 5,
          active: true,
        },
        {
          colorId: silverColorId,
          storageId: storage1,
          sku: "IPDUO-256GB-SILVER",
          price: 64990000,
          originalPrice: 64990000,
          stockQuantity: 40,
          lowStockThreshold: 5,
          active: true,
        },
        {
          colorId: silverColorId,
          storageId: storage2,
          sku: "IPDUO-512GB-SILVER",
          price: 71490000,
          originalPrice: 71490000,
          stockQuantity: 40,
          lowStockThreshold: 5,
          active: true,
        },
      ],
      images: [
        {
          colorId: blackColorId,
          imageUrl: "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
          altText: "iPhone Duo Black",
          displayOrder: 1,
          primary: true,
        },
        {
          colorId: silverColorId,
          imageUrl: "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/trang.png",
          altText: "iPhone Duo Silver",
          displayOrder: 2,
          primary: false,
        },
      ],
      specification: {
        displaySize: "6.3 inches",
        displayType: "Super Retina XDR OLED",
        displayResolution: "2622 x 1206 pixels",
        refreshRate: "Up to 120Hz ProMotion",
        displayBrightness: "3000 nits peak outdoor",
        alwaysOnDisplay: true,
        dynamicIsland: true,
        hdr: true,
        trueTone: true,
        processor: "Apple A20",
        cpu: "6-core CPU",
        gpu: "5-core GPU",
        neuralEngine: "16-core Neural Engine",
        mainCamera: "48 MP Fusion",
        ultraWideCamera: "48 MP Ultra Wide",
        telephotoCamera: "12 MP Telephoto",
        frontCamera: "24 MP TrueDepth",
        opticalZoom: "Up to 5x",
        videoRecording: "4K Dolby Vision",
        batteryCapacity: "4500 mAh",
        videoPlayback: "Up to 30 hours",
        fastCharging: "Up to 50% in approx 25 mins",
        wirelessCharging: true,
        magsafe: true,
        wifi: "Wi-Fi 7",
        bluetooth: "Bluetooth 6",
        cellular: "5G",
        nfc: true,
        height: "152.4 mm",
        width: "71.2 mm",
        thickness: "7.8 mm",
        weight: "190 g",
        operatingSystem: "iOS 26",
        waterResistance: "IP68",
        port: "USB-C",
        sim: "eSIM",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Quick Autofill Sample Header Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tải dữ liệu mẫu nhanh (Quick Sample Demo)
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Điền toàn bộ form bằng mẫu sản phẩm <strong className="text-indigo-700 font-bold">iPhone Duo</strong> chuẩn kết nối Backend API.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAutoFillSetupSample}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Fill iPhone Duo Sample
        </button>
      </div>

      {/* Global Validation Errors Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-rose-800 text-xs shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <div>
            <p className="font-bold">Vui lòng kiểm tra lại thông tin form:</p>
            <ul className="list-disc list-inside text-[11px] text-rose-700 mt-1 space-y-0.5 font-medium">
              {errors.name && <li>Tên sản phẩm: {errors.name.message}</li>}
              {errors.slug && <li>Slug: {errors.slug.message}</li>}
              {errors.categoryId && <li>Danh mục: {errors.categoryId.message}</li>}
              {errors.thumbnail && <li>Ảnh đại diện: {errors.thumbnail.message}</li>}
              {errors.variants && <li>Biến thể: {errors.variants.message}</li>}
            </ul>
          </div>
        </div>
      )}

      {/* API Submission Error */}
      {submitError && (
        <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-800 text-xs flex items-center gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span className="font-medium">{submitError}</span>
        </div>
      )}

      {/* Main Grid: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInformationSection
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <ThumbnailUpload
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <ProductVariantsSection watch={watch} setValue={setValue} errors={errors} />

          <ProductImagesSection watch={watch} setValue={setValue} />

          <ProductSpecificationsSection
            register={register}
            watch={watch}
            setValue={setValue}
          />
        </div>

        {/* Right Column: Publishing Sidebar (1 Col) */}
        <div className="lg:col-span-1">
          <PublishingSection register={register} watch={watch} />
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <FormActions
        onCancel={onCancel}
        onReset={() => reset()}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
