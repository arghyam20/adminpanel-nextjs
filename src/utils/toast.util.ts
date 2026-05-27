"use client";

import toast from "react-hot-toast";

export function showSuccess(message: string) {
  return toast.success(message);
}

export function showError(message = "Something went wrong") {
  return toast.error(message);
}

export async function toastPromise<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error?: string;
  }
) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error ?? "Something went wrong",
  });
}
