import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "@/features/home";
import { CartPage } from "@/features/cart/CartPage";
import { RoutePlaceholder } from "@/components/common/RoutePlaceholder";
import { ROUTES } from "@/constants/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.PRODUCTS,
    element: (
      <MainLayout>
        <RoutePlaceholder title="Products Showcase & Catalog" />
      </MainLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <MainLayout>
        <RoutePlaceholder title="Product Detail Page" />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.CART,
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.CHECKOUT,
    element: (
      <MainLayout>
        <RoutePlaceholder title="Checkout Process" />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <MainLayout>
        <RoutePlaceholder title="Account Authentication (Login)" />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <MainLayout>
        <RoutePlaceholder title="Account Registration" />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.ORDERS,
    element: (
      <MainLayout>
        <RoutePlaceholder title="Customer Orders Management" />
      </MainLayout>
    ),
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
