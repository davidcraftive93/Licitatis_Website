import type { Metadata, Viewport } from "next";
import { inter, poppins, geistMono } from "@/app/fonts";
import { siteConfig } from "@/lib/site";
import { organizationLd, softwareApplicationLd, websiteLd } from "@/lib/seo";
import { ConsentProvider } from "@/components/analytics/ConsentContext";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { Analytics } from "@/components/analytics/Analytics";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

const title = "LICITATIS — Prepara licitaciones públicas con IA";
// Descripción concisa (~155 caracteres) para que quepa en el snippet de Google sin truncarse.
const description =
  "LICITATIS convierte pliegos en expedientes de candidatura: elegibilidad, documentación, memoria técnica, riesgos e informe para dirección. Beta gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s · LICITATIS",
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "software para licitaciones",
    "gestión de licitaciones",
    "plataforma de licitaciones",
    "preparar licitaciones",
    "control de licitaciones",
    "análisis de pliegos",
    "gestión documental de licitaciones",
    "software para contratación pública",
    "herramienta para presentar licitaciones",
    "automatización de licitaciones",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FBFAF9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.lang}
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh bg-paper antialiased">
        {/* Mejora progresiva: marca que hay JS antes del primer paint para que los
            reveals solo se oculten con JS activo (sin JS, todo permanece visible). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        <ConsentProvider>
          <TopBar />
          <Header />
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <Analytics />
        </ConsentProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationLd()) }}
        />
      </body>
    </html>
  );
}
