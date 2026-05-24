"use client";

import axios, { type InternalAxiosRequestConfig } from "axios";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error instanceof Error ? error : new Error("HTTP request failed"));
    }

    const originalRequest = error.config as RetriableRequestConfig | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      await httpClient.post("/auth/refresh");
      return httpClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
