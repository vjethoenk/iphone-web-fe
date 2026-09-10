export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  IS_DEV: import.meta.env.DEV,
} as const;
