"use client";

import { useMemo } from "react";

export function useSessionState() {
  return useMemo(
    () => ({
      isAuthenticated: false,
      user: null
    }),
    []
  );
}
