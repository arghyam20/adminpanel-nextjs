import type { Metadata } from "next";
import "./globals.css";
import { AppThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Propual Admin Panel",
  description: "Full-stack Next.js admin panel with Prisma, MySQL, JWT auth, and Material UI."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
