Thiết kế chỉ duy nhất trang UI “Add Product” cho Admin của website quản trị iPhone Store.

1. Phạm vi

Hiện tại CHỈ xây dựng UI cho:

/admin/products/ (post)
/admin/products/ (get)
Trang thêm sản phẩm mới
Chưa cần Dashboard
Chưa cần Edit Product
Chưa cần Orders
Chưa cần Customers
Chưa cần Users
Chưa cần Settings

Mục tiêu là tạo một form UI hoàn chỉnh, có thể kết nối API sau này.

2. Tech Stack

Frontend:

React + TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
Zustand
React Hook Form
Zod

Hiện tại chỉ cần tập trung vào UI và form state.

3. Layout

Sử dụng Admin Layout:

┌──────────────────────────────────────────────────────────────┐
│ Sidebar              │ Header                               │
│                      ├───────────────────────────────────────┤
│ Dashboard            │                                     │
│ Products             │                                 Add │
│ Orders               │                                     │
│ Customers            │       Product form                   │
│ Users                │                                     │
│ Settings             │                                     │
│                      │                                     │
└──────────────────────────────────────────────────────────────┘

Sidebar:

Dashboard
Products
Orders
Customers
Users
Settings

Trong đó:

Products đang active
Highlight nhẹ bằng background và icon
Giao diện admin SaaS hiện đại
Không sử dụng phong cách quá cinematic như storefront
4. Header

Header của trang:

Breadcrumb:

Products / Add Product

Title:

Add New Product

Subtitle:

Create a new product and configure its variants, images and specifications.

Bên phải:

Cancel
Save Product

Save Product là button primary.

api: http://localhost:8080/api/v1/products (post)
response:
{
  "categoryId": "9414aa8f-5726-4f3b-b2b5-10264a98bef0",
  "name": "iPhone Duo",
  "slug": "iphone-duo",
  "brand": "Apple",
  "shortDescription": "iPhone Duo với thiết kế hiện đại, hiệu năng mạnh mẽ và trải nghiệm màn hình cao cấp.",
  "description": "iPhone Duo là mẫu smartphone cao cấp của Apple, hướng đến trải nghiệm sử dụng hiện đại với thiết kế tinh tế, hiệu năng mạnh mẽ, hệ thống camera chất lượng cao và thời lượng pin được tối ưu.",
  "thumbnail": "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
  "status": "ACTIVE",
  "featured": true,
  "variants": [
    {
      "colorId": "5b3d781c-b365-476c-a2df-c0650bc71685",
      "storageId": "03b08163-319b-48af-9dd2-fd8757eadb3d",
      "sku": "IPDUO-256GB-DEEP-BLACK",
      "price": 64990000,
      "originalPrice": 64990000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "5b3d781c-b365-476c-a2df-c0650bc71685",
      "storageId": "0fe899ae-c34b-42ca-b49c-3290cd806a2b",
      "sku": "IPDUO-512GB-DEEP-BLACK",
      "price": 71490000,
      "originalPrice": 71490000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "5b3d781c-b365-476c-a2df-c0650bc71685",
      "storageId": "1b1d3302-413b-404e-bda2-949435c31d10",
      "sku": "IPDUO-1T-DEEP-BLACK",
      "price": 84490000,
      "originalPrice": 84490000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "5b3d781c-b365-476c-a2df-c0650bc71685",
      "storageId": "d2fd6324-d0b4-4d11-811d-676059ecf8fe",
      "sku": "IPDUO-2T-DEEP-BLACK",
      "price": 104990000,
      "originalPrice": 104990000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "ca447104-f592-47aa-bab4-99b821e9b1a7",
      "storageId": "03b08163-319b-48af-9dd2-fd8757eadb3d",
      "sku": "IPDUO-256GB-SILVER",
      "price": 64990000,
      "originalPrice": 64990000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "ca447104-f592-47aa-bab4-99b821e9b1a7",
      "storageId": "0fe899ae-c34b-42ca-b49c-3290cd806a2b",
      "sku": "IPDUO-512GB-SILVER",
      "price": 71490000,
      "originalPrice": 71490000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "ca447104-f592-47aa-bab4-99b821e9b1a7",
      "storageId": "1b1d3302-413b-404e-bda2-949435c31d10",
      "sku": "IPDUO-1T-SILVER",
      "price": 84490000,
      "originalPrice": 84490000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    },
    {
      "colorId": "ca447104-f592-47aa-bab4-99b821e9b1a7",
      "storageId": "d2fd6324-d0b4-4d11-811d-676059ecf8fe",
      "sku": "IPDUO-2T-SILVER",
      "price": 104990000,
      "originalPrice": 104990000,
      "stockQuantity": 40,
      "lowStockThreshold": 5,
      "active": true
    }
  ],
  "images": [
    {
      "colorId": "5b3d781c-b365-476c-a2df-c0650bc71685",
      "imageUrl": "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/den.png",
      "altText": "iPhone Duo Deep Black",
      "displayOrder": 1,
      "primary": true
    },
    {
      "colorId": "ca447104-f592-47aa-bab4-99b821e9b1a7",
      "imageUrl": "https://nhantin.shopdunk.com/hm_service_image/iphoneDuo/trang.png",
      "altText": "iPhone Duo Silver",
      "displayOrder": 2,
      "primary": true
    }
  ],
  "specification": {
    "displaySize": "6.3 inches",
    "displayType": "Super Retina XDR OLED",
    "displayResolution": "2622 x 1206 pixels",
    "refreshRate": "Up to 120Hz ProMotion",
    "displayBrightness": "3000 nits peak outdoor",
    "alwaysOnDisplay": true,
    "dynamicIsland": true,
    "hdr": true,
    "trueTone": true,
    "processor": "Apple A20",
    "cpu": "6-core CPU",
    "gpu": "5-core GPU",
    "neuralEngine": "16-core Neural Engine",
    "mainCamera": "48 MP Fusion",
    "ultraWideCamera": "48 MP Ultra Wide",
    "telephotoCamera": "12 MP Telephoto",
    "frontCamera": "24 MP TrueDepth",
    "opticalZoom": "Up to 5x",
    "videoRecording": "4K Dolby Vision",
    "batteryCapacity": "Mock value",
    "videoPlayback": "Up to 30 hours",
    "fastCharging": "Up to 50% in approximately 25 minutes",
    "wirelessCharging": true,
    "magsafe": true,
    "wifi": "Wi-Fi 7",
    "bluetooth": "Bluetooth 6",
    "cellular": "5G",
    "nfc": true,
    "height": "152.4 mm",
    "width": "71.2 mm",
    "thickness": "7.8 mm",
    "weight": "190 g",
    "operatingSystem": "iOS 26",
    "waterResistance": "IP68",
    "port": "USB-C",
    "sim": "eSIM"
  }
}

Tạo UI theo component có thể tái sử dụng:

ProductCreatePage
├── ProductForm
├── BasicInformationSection
├── ThumbnailUpload
├── ProductVariantsSection
│   ├── VariantTable
│   └── VariantDialog
├── ProductImagesSection
│   └── ProductImageCard
├── ProductSpecificationsSection
│   ├── DisplaySpecification
│   ├── PerformanceSpecification
│   ├── CameraSpecification
│   ├── BatterySpecification
│   ├── ConnectivitySpecification
│   └── PhysicalSpecification
├── PublishingSection
└── FormActions

Tách component hợp lý, tránh tạo một file ProductCreatePage.tsx quá lớn.
Hãy ưu tiên UI/UX hoàn chỉnh cho Add Product, GET Product trước, không tạo các màn hình admin khác.