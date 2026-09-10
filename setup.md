# ROLE

Bạn là một **Senior Frontend Engineer + UI/UX Designer** có kinh nghiệm xây dựng các hệ thống e-commerce production với React.

Hãy xây dựng **Frontend Phase 1** cho một website smartphone store cao cấp có tên tạm thời là **NOVA**.

Website có hai mục đích:

1. Product showcase / product launch website
2. E-commerce website cho phép người dùng xem và đặt mua sản phẩm

Ý tưởng bắt nguồn từ cảm giác của một website ra mắt iPhone thế hệ mới: sản phẩm đẹp, premium, tối giản, nhiều khoảng trắng, typography lớn, hình ảnh sản phẩm nổi bật và trải nghiệm giống một technology brand cao cấp.

**KHÔNG clone trực tiếp website Apple.**

Chỉ lấy cảm hứng từ cách trình bày sản phẩm cao cấp và tạo một visual identity riêng cho NOVA.

---

# 1. PHẠM VI PHASE 1

Ở phase này CHỈ thực hiện:

* Frontend
* Landing Page
* Mock Data
* Responsive UI
* Routing architecture
* TanStack setup
* Zustand setup
* shadcn/ui setup
* Feature-based architecture

CHƯA cần:

* Backend
* Database
* Authentication thật
* Payment
* REST API thật
* Admin dashboard
* Order processing thật

Tuy nhiên architecture phải được thiết kế để sau này có thể tích hợp:

**React → TanStack Query → API Service → Java Spring Boot → MySQL**

mà không cần refactor toàn bộ frontend.

---

# 2. REQUIRED TECH STACK

Bắt buộc:

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* TanStack Router hoặc React Router
* Zustand
* Lucide React

Nếu sử dụng thư viện bổ sung, chỉ sử dụng khi thực sự cần thiết.

Ưu tiên:

* Type safety
* Reusability
* Maintainability
* Performance
* Clean architecture
* Feature-based architecture

Không sử dụng `any` tùy tiện.

---

# 3. PRODUCT BRAND

Tên thương hiệu:

NOVA

Định vị:

Premium technology brand.

Sản phẩm chính:

* NOVA X
* NOVA X Pro
* NOVA X Pro Max

Năm sản phẩm:

2026

Website dành cho người dùng Việt Nam.

Currency:

VND

---

# 4. VISUAL DIRECTION

Website phải có cảm giác:

* Premium
* Minimal
* Modern
* Futuristic
* Clean
* Cinematic
* High-end
* Technology
* Sophisticated

Không làm giống template ecommerce thông thường.

Không tạo quá nhiều:

* Card
* Border
* Gradient
* Glassmorphism
* Animation
* Badge

Mỗi section phải có visual hierarchy rõ ràng.

---

# 5. COLOR SYSTEM

Primary:

White

Foreground:

Black / near-black

Dark:

#0b0b0f

Muted:

Gray

Accent:

Blue hoặc blue-violet rất nhẹ.

Không sử dụng quá nhiều màu.

Phần lớn website sử dụng:

White
Black
Gray
Subtle Blue

Dark sections được sử dụng để tạo contrast.

---

# 6. TYPOGRAPHY

Ưu tiên typography mang cảm giác:

Apple / Linear / Vercel / premium technology brand.

Có thể sử dụng:

Inter
Geist
hoặc font tương đương.

Hero typography lớn:

Desktop:

text-6xl → text-8xl

Mobile:

text-4xl → text-5xl

Typography phải responsive.

Không để heading bị overflow.

---

# 7. PROJECT ARCHITECTURE

BẮT BUỘC sử dụng feature-based architecture.

Cấu trúc:

src/
│
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   │
│   └── layouts/
│       ├── MainLayout.tsx
│       ├── AuthLayout.tsx
│       └── AdminLayout.tsx
│
├── components/
│   ├── ui/
│   │
│   └── common/
│       ├── Loading.tsx
│       ├── ErrorBoundary.tsx
│       └── EmptyState.tsx
│
├── features/
│   │
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedProductSection.tsx
│   │   │   ├── ProductShowcaseSection.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   ├── CameraSection.tsx
│   │   │   ├── PerformanceSection.tsx
│   │   │   ├── EcosystemSection.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── data/
│   │   │   └── home.data.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── products/
│   │   ├── api/
│   │   │   └── products.api.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductPrice.tsx
│   │   │   └── ProductVariantSelector.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useProducts.ts
│   │   │   └── useProduct.ts
│   │   │
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── cart/
│   │
│   ├── checkout/
│   │
│   ├── orders/
│   │
│   ├── wishlist/
│   │
│   └── auth/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── index.ts
│
├── services/
│   └── api/
│       ├── client.ts
│       ├── interceptors.ts
│       └── api.types.ts
│
├── constants/
│   ├── routes.ts
│   └── storageKeys.ts
│
├── hooks/
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── stores/
│   └── app.store.ts
│
├── types/
│   └── common.types.ts
│
├── utils/
│   ├── cn.ts
│   ├── formatCurrency.ts
│   └── formatDate.ts
│
├── config/
│   ├── env.ts
│   └── app.config.ts
│
├── assets/
│
└── main.tsx

---

# 8. ARCHITECTURE RULES

Tuân thủ các nguyên tắc sau.

## components/

Chỉ chứa component dùng chung.

Ví dụ:

* Button
* Loading
* EmptyState
* ErrorBoundary

Không đặt business component vào đây.

Sai:

components/common/ProductCard.tsx

Đúng:

features/products/components/ProductCard.tsx

---

## features/

Mỗi feature là một business domain độc lập.

Ví dụ:

features/products

features/cart

features/checkout

features/orders

features/auth

Không import ngược lung tung giữa các feature.

---

## services/

Chỉ chịu trách nhiệm infrastructure/API.

Không chứa business UI logic.

---

## hooks/

Chỉ chứa global hooks.

Ví dụ:

useDebounce
useMediaQuery

Hook liên quan đến product phải nằm:

features/products/hooks/

Hook liên quan cart phải nằm:

features/cart/hooks/

---

## stores/

Chỉ chứa global Zustand stores.

Business-specific Zustand store nên nằm trong feature.

Ví dụ:

features/cart/stores/cart.store.ts

features/auth/stores/auth.store.ts

---

# 9. TANSTACK QUERY

Sử dụng **TanStack Query** để quản lý server state.

Ngay cả khi Phase 1 đang dùng mock data, hãy chuẩn bị architecture đúng.

Ví dụ:

features/products/api/products.api.ts

```ts
getProducts()
getProductById(id)
```

và:

```ts
useProducts()
useProduct(id)
```

sử dụng TanStack Query.

Mock implementation có thể trả về Promise:

```ts
return Promise.resolve(mockProducts)
```

Mục tiêu:

Sau này chỉ cần thay implementation:

```text
Mock Data
↓
API Client
↓
Spring Boot REST API
```

mà component không cần thay đổi.

---

# 10. ZUSTAND

Sử dụng Zustand cho **client state**, không sử dụng Zustand thay cho TanStack Query.

Ví dụ những thứ phù hợp với Zustand:

* Cart
* Wishlist
* UI state
* Mobile menu
* User preferences

Không dùng Zustand để lưu server data nếu TanStack Query đã phù hợp.

Ví dụ tương lai:

features/cart/stores/cart.store.ts

State:

```ts
items
addItem()
removeItem()
updateQuantity()
clearCart()
getTotal()
```

Ở Phase 1 có thể chưa implement toàn bộ cart UI nhưng store architecture nên được chuẩn bị.

---

# 11. TANSTACK QUERY VS ZUSTAND

Tuân thủ:

TanStack Query:

Server State

* Products
* Product Detail
* Orders
* User profile
* API data

Zustand:

Client State

* Cart
* Wishlist
* UI preferences
* Local interaction state

Không trộn hai loại state.

---

# 12. MOCK DATA

Tạo mock data có type rõ ràng.

Ví dụ:

features/products/data/products.mock.ts

```ts
export const mockProducts: Product[] = [
  {
    id: "nova-x",
    name: "NOVA X",
    tagline: "Power meets simplicity.",
    description: "...",
    price: 24990000,
    currency: "VND",
    images: [],
    colors: [],
    storage: ["128GB", "256GB"],
    specifications: {
      display: "6.3-inch OLED",
      chip: "NOVA A1",
      camera: "48MP",
      battery: "Up to 28 hours"
    }
  }
]
```

Không hard-code product data trong JSX.

---

# 13. PRODUCT TYPES

Tạo:

features/products/types/product.types.ts

Ví dụ:

```ts
export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  currency: string
  images: string[]
  colors: ProductColor[]
  storage: string[]
  specifications: ProductSpecifications
}

export interface ProductColor {
  name: string
  value: string
}

export interface ProductSpecifications {
  display: string
  chip: string
  camera: string
  battery: string
}
```

Có thể mở rộng type khi cần.

---

# 14. LANDING PAGE

Landing page route:

/

Cấu trúc:

```tsx
<HomePage>

  <HeroSection />

  <FeaturedProductSection />

  <ProductShowcaseSection />

  <ComparisonSection />

  <TechnologySection />

  <CameraSection />

  <PerformanceSection />

  <EcosystemSection />

  <CTASection />

</HomePage>
```

Không tạo Home page thành một file khổng lồ.

---

# 15. HEADER

Header phải premium và minimal.

Desktop:

NOVA

Navigation:

Store
iPhone
Accessories
Compare
Support

Right:

Search
Cart
Account

Icons sử dụng Lucide.

Header:

* sticky
* backdrop blur nhẹ
* border-bottom subtle
* transition khi scroll

Mobile:

Logo
Cart
Menu

Mobile menu sử dụng shadcn/ui Sheet.

---

# 16. HERO

Hero là section quan trọng nhất.

Content:

NOVA X

"Designed beyond imagination."

Description:

"Powerful performance. Intelligent photography. A completely new smartphone experience."

Buttons:

"Buy now"

"Explore"

Hero image:

Product render lớn.

Nếu chưa có product assets:

Tạo một product placeholder đẹp bằng layout/CSS.

KHÔNG sử dụng ảnh stock ngẫu nhiên chất lượng thấp.

Product phải là visual focal point.

Hero nên có cảm giác:

"New flagship smartphone launch."

---

# 17. FEATURED PRODUCT

Sản phẩm:

NOVA X Pro

Headline:

"Meet NOVA X Pro."

Hiển thị:

* Display
* Chip
* Camera
* Battery
* Storage
* Starting price

Có product image lớn.

CTA:

"Buy NOVA X Pro"

"Learn more"

---

# 18. PRODUCT SHOWCASE

Hiển thị 3 sản phẩm:

NOVA X
NOVA X Pro
NOVA X Pro Max

Sử dụng:

<ProductCard />

Không duplicate markup.

Mỗi card:

* Product image
* Product name
* tagline
* starting price
* color selector
* Learn more
* Buy

---

# 19. COMPARISON

Headline:

"Which NOVA is right for you?"

So sánh:

* Display
* Chip
* Camera
* Battery
* Storage
* Price

Sử dụng shadcn/ui Table nếu phù hợp.

Mobile phải responsive.

---

# 20. TECHNOLOGY

Headline:

"Built for what’s next."

Features:

* NOVA A1 Pro Chip
* AI Engine
* OLED Display
* Pro Camera
* Fast Charging
* Privacy & Security

Mỗi feature:

Icon
Title
Description

Không biến tất cả thành những card giống nhau.

Có thể sử dụng editorial layout.

---

# 21. CAMERA

Dark hoặc cinematic section.

Headline:

"Every detail. Captured."

Content:

48MP Pro Camera

"Capture more detail in every frame."

Product/camera image lớn.

Section phải có visual impact mạnh.

---

# 22. PERFORMANCE

Dark section:

Background:

#0b0b0f

Headline:

"Performance without compromise."

Hiển thị:

CPU
GPU
AI
Battery

Có thể dùng large typography + statistics.

Animation nhẹ.

---

# 23. ECOSYSTEM

Giới thiệu:

NOVA Watch
NOVA Buds
NOVA Pad
NOVA Cloud

Headline:

"Everything works beautifully together."

Mục tiêu là tạo cảm giác NOVA đang xây dựng ecosystem.

---

# 24. CTA

Cuối landing page:

"Your next device starts here."

Buttons:

"Shop NOVA"

"Explore products"

---

# 25. FOOTER

Footer chuyên nghiệp.

Products:

NOVA X
NOVA X Pro
NOVA X Pro Max
NOVA Watch
NOVA Buds

Store:

Shop
Compare
Accessories

Support:

Contact
Warranty
Shipping
FAQ

Company:

About
Careers
Privacy
Terms

Bottom:

© 2026 NOVA. All rights reserved.

---

# 26. ROUTING

Chuẩn bị:

/
/products
/products/:id
/cart
/checkout
/login
/register
/orders

Phase 1 chỉ cần `/` hoàn thiện.

Các route khác có thể là placeholder.

Không hard-code route string trong component.

Sử dụng:

constants/routes.ts

---

# 27. FORMAT CURRENCY

Website Việt Nam.

Tạo:

utils/formatCurrency.ts

Ví dụ:

```ts
formatCurrency(29990000)
```

Output:

```text
29.990.000 ₫
```

Không format giá trực tiếp trong JSX.

---

# 28. SHADCN/UI

Sử dụng shadcn/ui cho những component phù hợp:

* Button
* Sheet
* Dialog
* Table
* Badge
* Separator
* Tooltip
* Dropdown
* Input

Không lạm dụng shadcn.

Các section marketing nên có custom design riêng.

---

# 29. RESPONSIVE

Bắt buộc:

375px
640px
768px
1024px
1280px
1440px+

Mobile-first.

Không có:

* horizontal scroll
* overflow
* broken grid
* text clipping
* distorted image
* tiny touch target

---

# 30. ANIMATION

Animation phải subtle.

Có thể sử dụng Motion / Framer Motion nếu cần.

Các animation phù hợp:

* Hero fade-in
* Product image reveal
* Scroll reveal
* Hover scale
* Button interaction
* Navbar transition

Không tạo animation quá nặng.

Không biến landing page thành website animation demo.

Mục tiêu:

Premium + Smooth + Restrained.

---

# 31. ACCESSIBILITY

Bắt buộc:

* Semantic HTML
* alt text
* aria-label
* keyboard navigation
* focus states
* readable contrast

Icon-only buttons phải có:

aria-label

---

# 32. PERFORMANCE

Ưu tiên:

* lazy image loading
* code splitting nếu cần
* tránh unnecessary re-render
* tối ưu React rendering
* không import library không cần thiết
* tránh animation nặng

---

# 33. API ARCHITECTURE CHO SPRING BOOT SAU NÀY

Frontend phải có abstraction:

```text
UI
↓
Feature Hook
↓
Feature API
↓
API Client
↓
REST API
```

Ví dụ:

```text
ProductCard
↓
useProducts()
↓
products.api.ts
↓
services/api/client.ts
↓
GET /api/products
↓
Spring Boot
```

Không được:

```text
Component
↓
axios.get(...)
```

trực tiếp.

---

# 34. FUTURE BACKEND

Backend dự kiến:

Java
Spring Boot
Spring Security
MySQL
REST API
JWT
JPA/Hibernate

Frontend cần chuẩn bị để sau này tích hợp:

GET /api/products

GET /api/products/{id}

POST /api/cart

POST /api/orders

GET /api/orders

POST /api/auth/login

POST /api/auth/register

---

# 35. ERROR HANDLING

Chuẩn bị:

* Loading state
* Error state
* Empty state

TanStack Query phải xử lý:

isLoading
isError
data

Không để UI crash khi API/mock data lỗi.

---

# 36. ENVIRONMENT CONFIG

Tạo:

config/env.ts

Ví dụ:

```ts
API_BASE_URL
```

Không hard-code:

```text
http://localhost:8080
```

trong component.

Có thể sử dụng:

```text
VITE_API_BASE_URL
```

---

# 37. IMPORT RULES

Ưu tiên absolute imports:

```ts
@/features/products
@/components/ui/button
@/utils/formatCurrency
```

Không sử dụng relative import quá sâu như:

```ts
../../../../components/...
```

---

# 38. FEATURE BARREL EXPORT

Mỗi feature có:

index.ts

Ví dụ:

```ts
export * from "./components/ProductCard"
export * from "./hooks/useProducts"
export * from "./types/product.types"
```

Nhưng không tạo barrel file nếu nó gây circular dependency.

Ưu tiên rõ ràng hơn là over-engineering.

---

# 39. CODE STYLE

Yêu cầu:

* Clean code
* SOLID ở mức phù hợp frontend
* DRY nhưng không over-abstract
* Component nhỏ
* Single responsibility
* Type-safe
* Naming rõ ràng

Không tạo abstraction chỉ để làm code "trông chuyên nghiệp".

Architecture phải phục vụ việc phát triển thực tế.

---

# 40. IMPORTANT — KHÔNG OVER-ENGINEERING

Đây là project portfolio dành cho Fresher/Junior.

Không tạo:

* Repository pattern frontend
* Factory pattern không cần thiết
* Dependency injection framework
* quá nhiều generic abstraction
* quá nhiều layer không có giá trị

Giữ architecture:

**Professional nhưng dễ hiểu.**

Một developer khác clone project phải có thể đọc và hiểu structure nhanh chóng.

---

# 41. DATA FLOW PHASE 1

Hiện tại:

```text
Mock Data
↓
TanStack Query
↓
Feature Hook
↓
Component
```

Ví dụ:

```text
products.mock.ts
        ↓
products.api.ts
        ↓
useProducts.ts
        ↓
ProductShowcaseSection
        ↓
ProductCard
```

Sau này:

```text
Spring Boot API
        ↓
products.api.ts
        ↓
useProducts.ts
        ↓
ProductShowcaseSection
        ↓
ProductCard
```

UI không cần thay đổi.

---

# 42. ZUSTAND DATA FLOW

Cart trong tương lai:

```text
ProductCard
     ↓
addItem()
     ↓
Zustand Cart Store
     ↓
Cart Page
```

Không lưu cart vào TanStack Query.

Có thể persist cart bằng Zustand persist middleware sau này.

---

# 43. DESIGN DETAILS

Hãy ưu tiên những yếu tố sau:

### Hero

Large typography
Large product image
Lots of whitespace

### Product

Large product photography
Minimal information
Clear CTA

### Dark section

High contrast
Large typography
Premium cinematic feeling

### Ecosystem

Editorial composition

### CTA

Very minimal.

---

# 44. DO NOT

Không:

* Clone Apple website
* Copy Apple logo
* Copy Apple exact wording
* Copy exact layout
* Dùng Apple logo làm brand
* Dùng random stock images
* Hard-code product data trong JSX
* Hard-code API URL
* Dùng Zustand cho server state
* Dùng TanStack Query cho client UI state
* Tạo Home.tsx hàng nghìn dòng
* Tạo một `components/` chứa toàn bộ project
* Dùng `any` tùy tiện

---

# 45. ACCEPTANCE CRITERIA

Sau khi hoàn thành, phải đảm bảo:

### Architecture

* Feature-based
* Có app layer
* Có service layer
* Có API abstraction
* Có mock data
* Có types
* Có TanStack Query
* Có Zustand
* Có shadcn/ui

### UI

* Premium
* Responsive
* Modern
* Clean
* Product-focused
* Không giống template ecommerce

### Code

* TypeScript strict
* Không console errors
* Không TypeScript errors
* Không broken imports
* Không unnecessary duplication

### UX

* Navbar hoạt động
* Mobile menu hoạt động
* CTA hoạt động
* Product cards hoạt động
* Routing hoạt động
* Responsive hoạt động

---

# 46. IMPLEMENTATION ORDER

Thực hiện theo thứ tự:

## STEP 1

Setup React + TypeScript.

## STEP 2

Setup:

Tailwind CSS
shadcn/ui
TanStack Query
Zustand
React Router
Lucide React

## STEP 3

Setup aliases:

@/

## STEP 4

Tạo architecture.

## STEP 5

Tạo types.

## STEP 6

Tạo mock products.

## STEP 7

Setup TanStack Query Provider.

## STEP 8

Setup Zustand.

## STEP 9

Tạo API abstraction.

## STEP 10

Tạo MainLayout.

## STEP 11

Tạo Header.

## STEP 12

Tạo Landing Page sections.

## STEP 13

Responsive.

## STEP 14

Animation.

## STEP 15

Accessibility.

## STEP 16

Final code cleanup.

---

# 47. FINAL OUTPUT

Sau khi code xong, hãy cung cấp:

### 1. Project structure

Hiển thị tree đầy đủ.

### 2. Architecture explanation

Giải thích:

* app
* components
* features
* services
* hooks
* stores
* utils
* config

### 3. State management

Giải thích:

TanStack Query dùng cho gì.

Zustand dùng cho gì.

### 4. Mock data flow

Giải thích:

mock data → API → hook → component.

### 5. Future Spring Boot integration

Chỉ rõ những file nào cần thay đổi khi chuyển:

Mock API

sang:

Java Spring Boot REST API.

### 6. Development roadmap

Đề xuất roadmap:

Phase 1:
Landing Page

Phase 2:
Product Listing + Product Detail

Phase 3:
Cart + Wishlist

Phase 4:
Checkout

Phase 5:
Spring Boot + MySQL

Phase 6:
Authentication + JWT

Phase 7:
Order Management

Phase 8:
Payment

Phase 9:
Admin Dashboard

---

# FINAL INSTRUCTION

Hãy ưu tiên **chất lượng UI + architecture** thay vì tạo thật nhiều tính năng.

Tôi muốn khi mở website lên, cảm giác đầu tiên phải là:

> "Đây là website launch của một thương hiệu smartphone cao cấp."

Chứ không phải:

> "Đây là một template ecommerce được dựng bằng React."

Landing page phải có storytelling:

**Discover → Desire → Understand → Compare → Imagine owning → Buy**

Hãy xây dựng Phase 1 theo tiêu chuẩn của một frontend portfolio project thực tế có khả năng phát triển thành fullstack e-commerce application.
