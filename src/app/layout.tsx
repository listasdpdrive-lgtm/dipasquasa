import type React from "react";
import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";

import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Di Pasqua - Soluciones Integrales en Transporte y Reparación",
  description:
    "Más de 60 años liderando en el sector del transporte. Reparaciones, venta de semis y repuestos con la confianza de la experiencia.",
  keywords:
    "transporte, reparación, semis, repuestos, Di Pasqua, Mendoza, Argentina, camiones, mantenimiento, servicio técnico",
  authors: [{ name: "Di Pasqua" }],
  creator: "Di Pasqua",
  publisher: "Di Pasqua",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dipasqua.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Di Pasqua - Soluciones Integrales en Transporte y Reparación",
    description:
      "Más de 60 años liderando en el sector del transporte. Reparaciones, venta de semis y repuestos con la confianza de la experiencia.",
    url: "https://dipasqua.com",
    siteName: "Di Pasqua",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/dipasqua-logo.png",
        width: 1200,
        height: 630,
        alt: "Di Pasqua - Soluciones Integrales en Transporte y Reparación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Di Pasqua - Soluciones Integrales en Transporte y Reparación",
    description:
      "Más de 60 años liderando en el sector del transporte. Reparaciones, venta de semis y repuestos con la confianza de la experiencia.",
    images: ["/images/dipasqua-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${workSans.variable} antialiased`}
    >
      <head>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            measurementId={process.env.GA_MEASUREMENT_ID || ""}
          />
        )}
        {/* Preconexiones para mejorar la velocidad de carga */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/images/dipasqua-logo.png" as="image" />
        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Di Pasqua",
              description: "Soluciones Integrales en Transporte y Reparación",
              url: "https://www.dipasquasa.com",
              logo: "https://www.dipasquasa.com/images/dipasqua-logo.png",
              image: "https://www.dipasquasa.com/images/dipasqua-logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Concordia 84",
                addressLocality: "Mendoza",
                addressRegion: "Mendoza",
                addressCountry: "AR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -32.92804337094806,
                longitude: -68.73897252503697,
              },
              telephone: "+54-261-123-4567",
              openingHours: "Mo-Fr 08:00-18:00",
              sameAs: [
                "https://www.facebook.com/dipasqua",
                "https://www.instagram.com/dipasqua",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Transporte y Reparación",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Reparación de Semis",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Venta de Repuestos",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
