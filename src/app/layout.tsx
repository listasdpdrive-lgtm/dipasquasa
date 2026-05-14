import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"
import VercelAnalytics from "@/components/VercelAnalytics"
import GoogleAnalytics from "@/components/google-analytics"
import { Analytics } from "@vercel/analytics/react"
import RegisterSW from "@/components/RegisterSW"

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Cambiado a 5 por accesibilidad, 1 bloquea el zoom del usuario
  themeColor: "#e31f26", // Usando el rojo de tu logo para la barra del navegador
}

export const metadata: Metadata = {
  // IMPORTANTE: Cambia esto por tu dominio real exacto
  metadataBase: new URL("https://www.dipasquasa.com"), 
  
  title: "Di Pasqua - Soluciones Integrales en Transporte pesado",
  description: "Más de 60 años liderando en el sector del transporte. Reparaciones, venta de semis y repuestos con la confianza de la experiencia.",
  keywords: "transporte, reparación, semis, repuestos, Di Pasqua, Mendoza, Argentina, camiones, mantenimiento, servicio técnico",
  
  authors: [{ name: "Di Pasqua" }],
  creator: "Di Pasqua",
  publisher: "Di Pasqua",

  manifest: "/manifest.json",

  icons: {
    // El navegador usará el SVG por defecto. 
    // Google Search usará el primero que encuentre que sea cuadrado y de calidad.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logoL.png", sizes: "192x192", type: "image/png" },
    ],
    // El Apple Touch Icon es fundamental para Google Search en móviles
    apple: [
      { url: "/logoL.png", sizes: "192x192", type: "image/png" },
    ],
  },

  openGraph: {
    title: "Di Pasqua - Soluciones Integrales en Transporte pesado",
    description: "Más de 60 años liderando en el sector del transporte.",
    url: "https://www.dipasquasa.com",
    siteName: "Di Pasqua",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/dipasqua-logo.png",
        width: 1200,
        height: 630,
        alt: "Di Pasqua",
      },
    ],
  },

  // Esto ayuda a que Google verifique la propiedad más rápido
  verification: {
    google: "tu-codigo-de-verificacion", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${workSans.variable} antialiased`}
    >
      <body className="font-sans bg-white">
        <RegisterSW />

        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            measurementId={process.env.GA_MEASUREMENT_ID || ""}
          />
        )}

        {children}

        <VercelAnalytics />
        <Analytics />
      </body>
    </html>
  )
}