import "../styles/globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AppProviders } from "@/providers/app-providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propual Admin Panel",
  description: "Full-stack Next.js admin panel with Prisma, MySQL, JWT auth, and Material UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <AppProviders>{children}</AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
