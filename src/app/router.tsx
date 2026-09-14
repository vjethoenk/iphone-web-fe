import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { HomePage } from "@/features/home";
import { CartPage } from "@/features/cart";
import { RoutePlaceholder } from "@/components/common/RoutePlaceholder";
import { ProtectedRoute } from "@/routes/guards/ProtectedRoute";
import { RoleRoute } from "@/routes/guards/RoleRoute";
import { UserRole } from "@/features/auth";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";

import AdminProductListPage from "@/features/products/pages/AdminProductListPage";
import ProductCreatePage from "@/features/products/pages/ProductCreatePage";
import ProductPage from "@/features/products/pages/ProductPage";

const router = createBrowserRouter([
  // Admin Protected Routes (using AdminLayout)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/admin/products" replace />,
      },
      {
        path: "products",
        element: <AdminProductListPage />,
      },
      {
        path: "products/new",
        element: <ProductCreatePage />,
      },
      {
        path: "products/create",
        element: <ProductCreatePage />,
      },
      {
        path: "products/post",
        element: <ProductCreatePage />,
      },
      {
        path: "orders",
        element: <RoutePlaceholder title="Admin Orders Management" />,
      },
      {
        path: "customers",
        element: <RoutePlaceholder title="Admin Customers Management" />,
      },
      {
        path: "users",
        element: <RoutePlaceholder title="Admin Users Management" />,
      },
      {
        path: "settings",
        element: <RoutePlaceholder title="Admin Settings" />,
      },
    ],
  },

  // Main Storefront Routes
  {
    element: <MainLayout />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RoutePlaceholder title="Account Registration" />,
      },
      {
        path: "/403",
        element: <ForbiddenPage />,
      },

      // Authenticated Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout",
            element: <RoutePlaceholder title="Checkout Process" />,
          },
          {
            path: "/orders",
            element: <RoutePlaceholder title="Customer Orders Management" />,
          },

          // Staff Protected Routes
          {
            path: "/staff",
            element: <RoleRoute allowedRoles={[UserRole.STAFF, UserRole.ADMIN]} />,
            children: [
              {
                path: "",
                element: <RoutePlaceholder title="Staff Management Dashboard" />,
              },
              {
                path: "*",
                element: <RoutePlaceholder title="Staff Module Page" />,
              },
            ],
          },
        ],
      },

      // 404 Not Found fallback route
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);


export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
