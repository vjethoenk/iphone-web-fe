import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore, UserRole } from "@/features/auth";
import { Loading } from "@/components/common/Loading";

interface RoleRouteProps {
  allowedRoles: (UserRole | string)[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <Loading fullScreen message="Đang kiểm tra quyền truy cập..." />;
  }

  const userRoles = (user?.roles || []).map((role: any) =>
    typeof role === "string" ? role : role?.name
  );
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));
  console.log("userRoles", userRoles);
  console.log("allowedRoles", allowedRoles);
  console.log("hasPermission", hasPermission);

  if (!hasPermission) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
