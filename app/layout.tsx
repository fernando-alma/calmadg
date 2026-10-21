import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

/* Tipografías auto-hospedadas por Next (sin pedidos a Google en el navegador) */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

/* Dominio de producción (variable de entorno en Easypanel). Se usa para las
   vistas previas al compartir el link (Open Graph). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const TITLE = "CALMA · Estudio de Diseño | Branding y Estrategia en Mendoza"
const DESCRIPTION =
  "Estudio de diseño especializado en branding, estrategia de marca y contenido visual. Creamos identidades coherentes que conectan con tu audiencia."

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["diseño", "branding", "estrategia", "mendoza", "argentina", "identidad visual", "redes sociales"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "CALMA · Estudio de Diseño",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
