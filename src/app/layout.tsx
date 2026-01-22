import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"

import GoogleAnalytics from "@/components/google-analytics"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
})

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700", "800"],
})

/* ================= VIEWPORT (CORRECTO) ================= */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: "Di Pasqua - Soluciones Integrales en Transporte pesado",
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
    title: "Di Pasqua - Soluciones Integrales en Transporte pesado",
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
        alt: "Di Pasqua - Soluciones Integrales en Transporte pesado",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Di Pasqua - Soluciones Integrales en Transporte pesado",
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
}

/* ================= LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${workSans.variable} antialiased`}
      style={{ touchAction: "manipulation" }}
    >
      <body className="font-sans">
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            measurementId={process.env.GA_MEASUREMENT_ID || ""}
          />
        )}

        {children}
      </body>
    </html>
  )
}
