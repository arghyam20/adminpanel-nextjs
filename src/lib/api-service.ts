import { httpClient } from "@/lib/http-client";

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const apiService = {
  list<T>(endpoint: string, params?: ListParams) {
    return httpClient.get<T>(endpoint, { params });
  },
  create<T>(endpoint: string, data: unknown) {
    return httpClient.post<T>(endpoint, data);
  },
  update<T>(endpoint: string, id: number | string, data: unknown) {
    return httpClient.put<T>(endpoint, data, { params: { id } });
  },
  remove<T>(endpoint: string, id: number | string) {
    return httpClient.delete<T>(endpoint, { params: { id } });
  }
};
