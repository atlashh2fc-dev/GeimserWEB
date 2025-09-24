// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import { SpeedInsights } from "@vercel/speed-insights/next"; // 👈 Import agregado

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geimser",
  description: "Automatización real, impacto industrial.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /**
     * >>> IMPORTANTE <<<
     * - force-light: pisa cualquier fondo/texto oscuro a nivel global (override CSS).
     * - theme-light: usa los tokens claros de globals.css (gris corporativo).
     * Si quieres volver a oscuro, quita estas clases del <html>.
     */
    <html
      lang="es"
      className="force-light theme-light"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FloatingChatWidget />
        {process.env.NODE_ENV === "production" && <SpeedInsights />} {/* 👈 Solo en prod */}
      </body>
    </html>
  );
}