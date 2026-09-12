Bạn đang là **Senior Frontend Engineer** có nhiều năm kinh nghiệm xây dựng hệ thống React/TypeScript production.

Hãy triển khai module **Authentication + API Client + Authorization + Routing** cho project **iPhoneStore Frontend**.

## 1. Tech stack

Project sử dụng:

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* TanStack Query
* Zustand
* Tailwind CSS
* shadcn/ui

Yêu cầu code:

* Clean Code
* SOLID
* Separation of Concerns
* Type-safe
* Dễ maintain
* Dễ mở rộng
* Không over-engineering
* Không viết code duplicate
* Không hard-code logic ở nhiều nơi
* Ưu tiên architecture phù hợp với project thực tế của một developer đi làm nhiều năm
* Không tạo abstraction nếu chưa thực sự cần thiết
* Không dùng `any` nếu có thể tránh
* Không dùng `localStorage` trực tiếp rải rác trong nhiều file
* Không gọi Axios trực tiếp trong component

---

# 2. Backend API

Backend hiện tại chạy:

`http://localhost:8080`

Base API:

`http://localhost:8080/api/v1`

Login API:

`POST http://localhost:8080/api/v1/auth/login`

Request:

```json
{
  "username": "admin",
  "password": "123456"
}
```

Response thực tế:

```json
{
  "code": 1000,
  "result": {
    "accessToken": "ACCESS_TOKEN",
    "refreshToken": "REFRESH_TOKEN",
    "authenticated": true,
    "user": {
      "id": "db7d657e-22ac-4c61-afbe-375297b94e32",
      "username": "admin",
      "email": null,
      "roles": [
        "ADMIN"
      ],
      "permissions": []
    }
  }
}
```

API lấy thông tin user hiện tại:

`GET http://localhost:8080/api/v1/users/my-info`

API này yêu cầu:

```http
Authorization: Bearer <accessToken>
```

---

# 3. API Response Type

Tạo type dùng chung:

`src/types/api.types.ts`

```ts
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface ApiError {
  code: number;
  message: string;
  result: null;
}
```

Thiết kế các API khác trong tương lai đều sử dụng generic này.

Ví dụ:

```ts
ApiResponse<User>
ApiResponse<Product[]>
ApiResponse<Product>
ApiResponse<Category[]>
```

Không tạo response interface riêng nếu chỉ khác generic `result`.

---

# 4. Axios architecture

Tạo Axios instance dùng chung.

Đề xuất:

```text
src/
├── services/
│   └── api/
│       ├── axios.ts
│       ├── interceptors.ts
│       └── index.ts
```

Hoặc nếu architecture hiện tại của project phù hợp hơn thì có thể điều chỉnh.

Axios instance phải có:

```ts
baseURL: import.meta.env.VITE_API_BASE_URL
```

Tạo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Không hard-code base URL trong source code.

---

# 5. Axios Request Interceptor

Mỗi request authenticated phải tự động thêm:

```http
Authorization: Bearer <accessToken>
```

Access token được lấy từ auth store/token storage.

Không được viết:

```ts
axios.get(...)
```

rải rác trong project.

Tất cả request phải đi qua Axios instance.

Ví dụ:

```ts
apiClient.get(...)
apiClient.post(...)
apiClient.put(...)
apiClient.delete(...)
```

---

# 6. Axios Response Interceptor

Xử lý centralized:

* HTTP 401
* HTTP 403
* HTTP 404
* HTTP 500
* Network error
* Backend `code` khác `1000`

Đặc biệt:

### 401

Nếu access token hết hạn:

* thử refresh token nếu backend có refresh API
* nếu refresh thất bại:

  * clear authentication
  * redirect về `/login`

Không redirect trực tiếp từ mọi API service.

Logic authentication phải được centralized.

### 403

Không logout user.

Chuyển đến:

`/403`

### 404

Không nhất thiết redirect tất cả API 404 sang NotFoundPage.

Phân biệt:

* API resource không tồn tại
* Route frontend không tồn tại

Frontend route không tồn tại phải sử dụng:

`NotFoundPage`

---

# 7. Token storage

Thiết kế một nơi duy nhất để quản lý token.

Ví dụ:

```text
src/features/auth/
├── stores/
│   └── auth.store.ts
├── services/
│   └── token.service.ts
```

Không được sử dụng:

```ts
localStorage.setItem(...)
localStorage.getItem(...)
```

ở nhiều component khác nhau.

Tạo abstraction:

```ts
getAccessToken()
setAccessToken()
getRefreshToken()
setRefreshToken()
clearTokens()
```

Có thể sử dụng Zustand persist nếu hợp lý.

Ưu tiên thiết kế đơn giản, rõ ràng và dễ thay đổi storage strategy sau này.

---

# 8. Auth Types

Tạo:

`src/features/auth/types/auth.types.ts`

Bao gồm:

```ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string | null;
  roles: string[];
  permissions: string[];
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
  user: AuthUser;
}
```

Có thể tạo thêm các type cần thiết nếu thực sự cần.

---

# 9. Auth API

Tạo:

```text
src/features/auth/api/auth.api.ts
```

Implement:

```ts
login()
```

API:

```http
POST /auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "123456"
}
```

Return:

```ts
Promise<ApiResponse<LoginResult>>
```

Không gọi API trực tiếp trong LoginForm.

---

# 10. TanStack Query

Sử dụng **TanStack Query** để quản lý server state.

Không dùng Zustand để lưu server state.

Phân biệt rõ:

### Zustand

Dùng cho client/auth state:

* access token
* refresh token
* authenticated
* current user
* logout
* auth status

### TanStack Query

Dùng cho server state:

* login mutation
* my-info query
* products
* categories
* orders
* etc.

---

# 11. Login Hook

Tạo:

```text
src/features/auth/hooks/useLogin.ts
```

Sử dụng:

```ts
useMutation()
```

Flow:

```text
LoginForm
    ↓
useLogin()
    ↓
auth.api.login()
    ↓
Backend
    ↓
ApiResponse<LoginResult>
    ↓
save token
    ↓
update auth store
    ↓
navigate
```

Không để LoginForm tự xử lý token.

---

# 12. Logout Hook

Tạo:

```text
src/features/auth/hooks/useLogout.ts
```

Logout phải:

* clear access token
* clear refresh token
* reset auth Zustand store
* clear/invalidate TanStack Query cache nếu cần
* redirect về `/login`

---

# 13. My Info API

Tạo:

```text
src/features/auth/api/auth.api.ts
```

hoặc:

```text
src/features/users/api/user.api.ts
```

API:

```http
GET /users/my-info
```

Response:

```ts
ApiResponse<AuthUser>
```

Tạo hook:

```text
src/features/auth/hooks/useMyInfo.ts
```

sử dụng:

```ts
useQuery()
```

Không fetch `/my-info` trực tiếp trong component.

---

# 14. Authentication initialization

Khi application khởi động:

```text
App
 ↓
Auth initialization
 ↓
check accessToken
 ↓
GET /users/my-info
 ↓
success → authenticated
 ↓
401 → clear auth
```

Mục tiêu:

Nếu user refresh trình duyệt:

```text
F5
```

thì frontend vẫn biết user hiện tại là ai.

Không được gọi `/users/my-info` liên tục mỗi lần component render.

TanStack Query phải có:

* `queryKey`
* `staleTime`
* `retry` hợp lý
* `enabled` hợp lý

---

# 15. Zustand Auth Store

Tạo:

```text
src/features/auth/stores/auth.store.ts
```

State nên có:

```ts
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
}
```

Không lưu toàn bộ server state vào Zustand nếu TanStack Query đã quản lý.

Store chỉ chịu trách nhiệm cho authentication/client state.

---

# 16. Role System

Hệ thống hiện tại có 3 nhóm role:

```text
USER
STAFF
ADMIN
```

Có thể define:

```ts
export enum UserRole {
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}
```

Không hard-code string role ở nhiều component.

---

# 17. Router Architecture

Thiết kế router rõ ràng cho:

```text
Public
User
Staff
Admin
```

Ví dụ:

```text
/
├── login
├── 403
├── *
│
├── user routes
│   ├── /
│   ├── /products
│   ├── /products/:slug
│   ├── /cart
│   └── /orders
│
├── staff routes
│   └── /staff/*
│
└── admin routes
    └── /admin/*
```

Có thể điều chỉnh URL structure nếu architecture hiện tại hợp lý hơn.

---

# 18. ProtectedRoute

Tạo:

```text
src/components/common/ProtectedRoute.tsx
```

Chức năng:

* User chưa login → `/login`
* User đã login → render children
* Đang initialize auth → render Loading

Ví dụ concept:

```tsx
<ProtectedRoute>
  <UserLayout />
</ProtectedRoute>
```

Không duplicate logic authentication ở từng page.

---

# 19. RoleRoute

Tạo:

```text
src/components/common/RoleRoute.tsx
```

Cho phép kiểm tra role.

Ví dụ:

```tsx
<RoleRoute allowedRoles={[UserRole.ADMIN]}>
  <AdminLayout />
</RoleRoute>
```

Staff:

```tsx
<RoleRoute allowedRoles={[UserRole.STAFF]}>
  <StaffLayout />
</RoleRoute>
```

Có thể hỗ trợ nhiều role:

```tsx
<RoleRoute
  allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}
>
```

Nếu authenticated nhưng không có quyền:

```text
/403
```

Không redirect về `/login`.

---

# 20. Route hierarchy

Ưu tiên cấu trúc route dễ mở rộng.

Ví dụ:

```tsx
<Routes>

  <Route element={<PublicLayout />}>
    <Route path="/login" element={<LoginPage />} />
  </Route>

  <Route element={<ProtectedRoute />}>

    <Route element={<UserLayout />}>
      ...
    </Route>

    <Route
      path="/staff"
      element={
        <RoleRoute allowedRoles={[UserRole.STAFF]} />
      }
    >
      ...
    </Route>

    <Route
      path="/admin"
      element={
        <RoleRoute allowedRoles={[UserRole.ADMIN]} />
      }
    >
      ...
    </Route>

  </Route>

  <Route path="/403" element={<ForbiddenPage />} />
  <Route path="*" element={<NotFoundPage />} />

</Routes>
```

Hãy chọn implementation phù hợp nhất với React Router version đang sử dụng.

---

# 21. Pages

Tạo:

```text
src/pages/
├── auth/
│   └── LoginPage.tsx
├── errors/
│   ├── ForbiddenPage.tsx
│   └── NotFoundPage.tsx
├── user/
├── staff/
└── admin/
```

### LoginPage

Có:

* username
* password
* loading state
* error message
* submit
* redirect sau login

Không xử lý Axios trực tiếp.

---

# 22. NotFoundPage

Tạo UI đẹp, tối giản, phù hợp với iPhoneStore.

Hiển thị:

```text
404

Trang không tồn tại

Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.

Quay về trang chủ
```

Có button:

```text
Về trang chủ
```

---

# 23. ForbiddenPage

Tạo:

```text
403

Bạn không có quyền truy cập

Bạn không có quyền truy cập trang này.

Quay về trang chủ
```

Có thể có:

```text
Quay lại
```

và:

```text
Về trang chủ
```

---

# 24. Loading

Sử dụng component:

```text
src/components/common/Loading.tsx
```

Dùng cho:

* Auth initialization
* Login mutation
* Route protection
* Page loading

Không tạo quá nhiều loading component khác nhau nếu không cần.

---

# 25. App Providers

Tạo/hoàn thiện:

```text
src/app/providers.tsx
```

Bao gồm:

```text
QueryClientProvider
```

và các provider khác nếu cần.

Cấu trúc:

```text
main.tsx
    ↓
App
    ↓
Providers
    ↓
Router
```

---

# 26. QueryClient

Tạo một QueryClient duy nhất.

Không được:

```ts
new QueryClient()
```

mỗi lần render.

Configure hợp lý:

```ts
staleTime
gcTime
retry
refetchOnWindowFocus
```

Đối với authentication:

* Không retry vô hạn khi API trả 401.
* Không retry các lỗi authentication không cần thiết.

---

# 27. API Error handling

Tạo centralized error handling.

Ví dụ backend trả:

```json
{
  "code": 1041,
  "message": "Username đã tồn tại!",
  "result": null
}
```

Frontend phải có thể lấy:

```ts
error.code
error.message
```

Không chỉ dựa vào HTTP status.

Tạo custom error class nếu cần:

```ts
class ApiException extends Error {
  code: number;
  ...
}
```

Nhưng chỉ sử dụng nếu thực sự giúp code sạch hơn.

---

# 28. Folder structure mong muốn

Sau khi hoàn thành, hướng tới:

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── layouts/
│       ├── PublicLayout.tsx
│       ├── UserLayout.tsx
│       ├── StaffLayout.tsx
│       └── AdminLayout.tsx
│
├── components/
│   ├── ui/
│   └── common/
│       ├── ProtectedRoute.tsx
│       ├── RoleRoute.tsx
│       ├── Loading.tsx
│       └── ErrorBoundary.tsx
│
├── features/
│   └── auth/
│       ├── api/
│       │   └── auth.api.ts
│       ├── components/
│       │   └── LoginForm.tsx
│       ├── hooks/
│       │   ├── useLogin.ts
│       │   ├── useLogout.ts
│       │   └── useMyInfo.ts
│       ├── stores/
│       │   └── auth.store.ts
│       ├── types/
│       │   └── auth.types.ts
│       └── index.ts
│
├── pages/
│   ├── auth/
│   │   └── LoginPage.tsx
│   ├── errors/
│   │   ├── ForbiddenPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── user/
│   ├── staff/
│   └── admin/
│
├── services/
│   └── api/
│       ├── axios.ts
│       ├── interceptors.ts
│       └── index.ts
│
├── types/
│   └── api.types.ts
│
├── lib/
│   └── utils.ts
│
└── main.tsx
```

Không nhất thiết phải tạo đúng 100% structure trên nếu project hiện tại đã có structure tốt hơn. Hãy ưu tiên tính nhất quán của toàn project.

---

# 29. Authentication flow bắt buộc

Implement flow sau:

```text
User
 │
 ▼
LoginPage
 │
 ▼
LoginForm
 │
 ▼
useLogin()
 │
 ▼
TanStack Mutation
 │
 ▼
auth.api.login()
 │
 ▼
POST /auth/login
 │
 ▼
Backend
 │
 ▼
accessToken + refreshToken + user
 │
 ├── save token
 ├── set auth store
 └── navigate
        │
        ├── ADMIN → /admin
        ├── STAFF → /staff
        └── USER  → /
```

---

# 30. Refresh browser flow

Khi user đã login:

```text
F5
 │
 ▼
Application start
 │
 ▼
Auth initialization
 │
 ▼
accessToken exists?
 │
 ├── NO → unauthenticated
 │
 └── YES
       │
       ▼
GET /users/my-info
       │
       ├── 200 → set current user
       │
       └── 401 → clear authentication
```

Không để F5 làm user bị logout nếu access token vẫn hợp lệ.

---

# 31. Role redirect

Sau login:

```text
ADMIN
→ /admin

STAFF
→ /staff

USER
→ /
```

Nếu user truy cập:

```text
/admin
```

nhưng role là:

```text
USER
```

thì:

```text
/admin
 ↓
ProtectedRoute → authenticated
 ↓
RoleRoute → role không hợp lệ
 ↓
/403
```

Nếu chưa login:

```text
/admin
 ↓
/login
```

---

# 32. Security considerations

Đây là project portfolio nhưng hãy code theo tư duy production.

Chú ý:

* Không log accessToken
* Không log refreshToken
* Không đưa token vào URL
* Không hard-code credential
* Không commit `.env` chứa secret
* `.env` chỉ chứa config public như API URL
* Không lưu password
* Không expose token trong UI
* Không duplicate authentication logic

Nếu refresh token API chưa tồn tại ở backend thì **không tự bịa endpoint**.

Có thể thiết kế abstraction để sau này thêm:

```text
POST /auth/refresh
```

nhưng hiện tại chỉ implement những API backend thực sự tồn tại.

---

# 33. CORS

Nếu frontend chạy:

```text
http://localhost:5173
```

và backend:

```text
http://localhost:8080
```

hãy đảm bảo Axios configuration không phá CORS.

Không xử lý CORS bằng frontend hack.

Nếu cần, ghi chú rõ backend Spring Boot cần allow origin:

```text
http://localhost:5173
```

---

# 34. UX

Login phải có:

* Loading khi submit
* Disable button khi đang login
* Hiển thị lỗi API
* Hiển thị lỗi validation
* Không submit nhiều lần
* Redirect đúng role

Không để UI bị flicker:

```text
login → dashboard → loading → login
```

---

# 35. Code quality

Sau khi implement:

* Kiểm tra TypeScript compile
* Kiểm tra ESLint
* Không còn `any` không cần thiết
* Không còn import thừa
* Không còn console.log debug
* Không duplicate API logic
* Không duplicate auth logic
* Kiểm tra circular dependency
* Kiểm tra router
* Kiểm tra protected route
* Kiểm tra role route

---

# 36. Acceptance Criteria

Chức năng được xem là hoàn thành khi:

### Case 1

Login đúng:

```text
admin / 123456
```

→ gọi:

```text
POST /auth/login
```

→ lưu token

→ lưu user

→ `/admin`

### Case 2

User login:

```text
USER
```

→ `/`

### Case 3

Staff login:

```text
STAFF
```

→ `/staff`

### Case 4

Chưa login truy cập:

```text
/admin
```

→ `/login`

### Case 5

USER truy cập:

```text
/admin
```

→ `/403`

### Case 6

STAFF truy cập:

```text
/admin
```

→ `/403`

### Case 7

Admin truy cập:

```text
/admin
```

→ cho phép

### Case 8

F5 sau khi login:

```text
F5
```

→ gọi:

```text
GET /users/my-info
```

→ khôi phục authentication.

### Case 9

Truy cập route không tồn tại:

```text
/random-page
```

→ `NotFoundPage`

### Case 10

API trả 401:

→ xử lý centralized

→ clear auth nếu không thể refresh

→ `/login`

---

# 37. Quan trọng

**Trước khi code:**

1. Đọc toàn bộ structure hiện tại của project.
2. Kiểm tra các package đã cài.
3. Kiểm tra React Router version.
4. Kiểm tra Axios version.
5. Kiểm tra TanStack Query version.
6. Kiểm tra Zustand version.
7. Kiểm tra các file auth hiện có.
8. Không tạo file trùng với file đã tồn tại.
9. Không phá vỡ các feature hiện tại.
10. Nếu cần thay đổi architecture, hãy ưu tiên migration nhỏ và hợp lý.

Sau đó:

### Bước 1

Dựng:

```text
Axios
API types
Token service
Interceptors
```

### Bước 2

Dựng:

```text
Auth types
Auth API
Zustand Auth Store
TanStack Query hooks
```

### Bước 3

Dựng:

```text
LoginPage
LoginForm
Logout
My Info
```

### Bước 4

Dựng:

```text
ProtectedRoute
RoleRoute
```

### Bước 5

Dựng:

```text
User routes
Staff routes
Admin routes
```

### Bước 6

Dựng:

```text
NotFoundPage
ForbiddenPage
```

### Bước 7

Test toàn bộ authentication flow.

**Không chỉ đưa ra code mẫu. Hãy triển khai trực tiếp vào project hiện tại và đảm bảo các file import/export khớp nhau, chạy được và có thể mở rộng cho Product/Category/Order API về sau.**
