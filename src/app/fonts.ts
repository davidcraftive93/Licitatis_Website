import { Inter, Poppins, Geist_Mono } from "next/font/google";

/**
 * Tipografías reales de la app (brand kit), autoalojadas vía next/font (sin peticiones
 * externas en runtime -> mejor rendimiento y sin cookies).
 *  - Poppins: titulares (h1–h3, secciones, heros).
 *  - Inter: UI, cuerpo, tablas, formularios (la fuente de "trabajo").
 *  - Geist Mono: datos puntuales (referencias de pliego, importes técnicos).
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
