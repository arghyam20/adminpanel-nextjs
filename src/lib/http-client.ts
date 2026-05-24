"use client";

import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      await httpClient.post("/auth/refresh");
      return httpClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
