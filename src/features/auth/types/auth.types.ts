export const UserRole = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RoleItem {
  name: string;
  description?: string;
  permissions?: unknown[];
}

export interface AuthUser {
  id: string;
  username: string;
  email: string | null;
  roles: (string | RoleItem)[];
  permissions: string[];
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: AuthUser | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearAuth: () => void;
}
