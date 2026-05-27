import { NextResponse } from "next/server";

import type { ApiMeta, ApiResponse } from "@/types/api";

export interface ResponseOptions {
  status?: number;
  headers?: HeadersInit;
}

export function apiResponse<T>(
  data: T,
  message = "Success",
  meta?: ApiMeta,
  options: ResponseOptions = {}
) {
  return NextResponse.json<ApiResponse<T>>(
    { success: true, message, data, ...(meta ? { meta } : {}) },
    { status: options.status ?? 200, headers: options.headers }
  );
}

export function createdResponse<T>(data: T, message = "Created") {
  return apiResponse(data, message, undefined, { status: 201 });
}

export function emptyResponse(message = "Deleted") {
  return NextResponse.json<ApiResponse<null>>(
    { success: true, message, data: null },
    { status: 200 }
  );
}

export function errorResponse(message: string, status = 400, errors?: unknown) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, message, ...(errors ? { errors } : {}) },
    { status }
  );
}
