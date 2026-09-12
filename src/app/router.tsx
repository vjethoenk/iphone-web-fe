import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "@/features/home";
import { CartPage } from "@/features/cart/CartPage";
import { RoutePlaceholder } from "@/components/common/RoutePlaceholder";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { RoleRoute } from "@/components/common/RoleRoute";
import { UserRole } from "@/features/auth";

import LoginPage from "@/pages/auth/LoginPage";
import ForbiddenPage from "@/pages/errors/ForbiddenPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";

const router = createBrowserRouter([
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
        element: <RoutePlaceholder title="Products Showcase & Catalog" />,
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

          // Admin Protected Routes
          {
            path: "/admin",
            element: <RoleRoute allowedRoles={[UserRole.ADMIN]} />,
            children: [
              {
                path: "",
                element: <RoutePlaceholder title="Admin Control Center & Dashboard" />,
              },
              {
                path: "*",
                element: <RoutePlaceholder title="Admin System Module" />,
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
