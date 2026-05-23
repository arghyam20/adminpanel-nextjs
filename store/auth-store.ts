"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/types";

export type AuthStoreState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
};

export const defaultAuthStore: AuthStoreState = {
  user: null,
  isAuthenticated: false
};

export const AuthStoreContext = createContext<AuthStoreState>(defaultAuthStore);

export function useAuthStore() {
  return useContext(AuthStoreContext);
}
