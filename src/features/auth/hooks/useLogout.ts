import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    clearAuth();
    queryClient.clear();
    navigate("/login", { replace: true });
  };

  return { logout };
};
