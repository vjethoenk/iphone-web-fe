import { axiosInstance } from "./axios";
import type { AxiosRequestConfig } from "axios";

export const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get<T, { data: T }>(url, config).then((res) => res.data);
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post<T, { data: T }>(url, data, config).then((res) => res.data);
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put<T, { data: T }>(url, data, config).then((res) => res.data);
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete<T, { data: T }>(url, config).then((res) => res.data);
  },
};

export { axiosInstance } from "./axios";
export { setupInterceptors } from "./interceptors";
