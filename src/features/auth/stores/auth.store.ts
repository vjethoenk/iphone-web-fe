import { create } from "zustand";
import type { AuthState, AuthUser } from "../types/auth.types";
import { tokenService } from "../services/token.service";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: (user: AuthUser | null) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),

  setInitialized: (isInitialized: boolean) => set({ isInitialized }),

  clearAuth: () => {
    tokenService.clearTokens();
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));
