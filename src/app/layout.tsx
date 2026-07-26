// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import { company } from "@/lib/company";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: "Geimser | Tecnología, operación y crecimiento para empresas", template: "%s | Geimser" },
  description: "Geimser integra tecnología, experiencia de cliente, talento e infraestructura para impulsar la operación y el crecimiento de empresas en Chile.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "es_CL", url: "/", siteName: "Geimser",
    title: "Geimser | Tecnología, operación y crecimiento para empresas",
    description: "Soluciones de tecnología, experiencia de cliente, talento e infraestructura para empresas en Chile.",
    images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "Geimser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geimser | Tecnología, operación y crecimiento para empresas",
    description: "Soluciones de tecnología, experiencia de cliente, talento e infraestructura para empresas en Chile.",
    images: ["/og.jpg"],
  },
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
      <head>
        <GoogleAdsTag />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ProfessionalService",
          name: company.name, legalName: company.legalName, url: company.url,
          logo: company.logo, image: company.logo, email: company.email,
          telephone: company.phone,
          address: { "@type": "PostalAddress", addressLocality: company.location, addressCountry: "CL" },
          openingHours: company.openingHoursSchema,
          sameAs: ["https://cl.linkedin.com/company/geimser", "https://www.instagram.com/geimser_chile/"],
        }) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <FloatingChatWidget />
        {process.env.NODE_ENV === "production" && (
          <>
            <SpeedInsights />  {/* 👈 Métricas de performance */}
            <Analytics />       {/* 👈 Web Analytics */}
          </>
        )}
      </body>
    </html>
  );
}
