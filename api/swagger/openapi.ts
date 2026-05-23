import { apiConfig } from "@/api/config/api.config";

export const openApiBaseDocument = {
  openapi: "3.1.0",
  info: {
    title: "Admin Panel API",
    version: apiConfig.version
  }
} as const;
