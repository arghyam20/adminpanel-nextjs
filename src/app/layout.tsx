import type { Metadata } from "next";
import "../styles/globals.css";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: "Propual Admin Panel",
  description: "Full-stack Next.js admin panel with Prisma, MySQL, JWT auth, and Material UI."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
