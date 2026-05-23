import { NextResponse } from "next/server";
import type { ApiMeta, ApiResponse } from "@/types/api";

export function ok<T>(data: T, message = "Success", meta?: ApiMeta) {
  return NextResponse.json<ApiResponse<T>>({ success: true, message, data, meta });
}

export function created<T>(data: T, message = "Created") {
  return NextResponse.json<ApiResponse<T>>({ success: true, message, data }, { status: 201 });
}

export function fail(message: string, status = 400, errors?: unknown) {
  return NextResponse.json<ApiResponse<never>>({ success: false, message, errors }, { status });
}

export function handleError(error: unknown) {
  console.error(error);
  return fail("Something went wrong", 500);
}
