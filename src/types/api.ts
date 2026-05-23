export type ApiMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: ApiMeta;
  errors?: unknown;
};

export type QueryOptions = {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
};
