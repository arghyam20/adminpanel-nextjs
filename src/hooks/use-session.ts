"use client";

import { useEffect, useState } from "react";

import { httpClient } from "@/lib/http-client";
import type { AuthUser } from "@/types";

export function useSessionState() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response = await httpClient.get<{ data: AuthUser }>("/auth/me");
        if (mounted) setUser(response.data.data);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    void loadSession();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    isAuthenticated: Boolean(user),
    isLoading,
    user,
  };
}
