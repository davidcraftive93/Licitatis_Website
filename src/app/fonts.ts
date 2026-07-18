import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Tipografías autoalojadas vía next/font (se descargan en build, sin peticiones
 * externas en tiempo de ejecución -> mejor rendimiento y sin implicación de cookies).
 *  - Inter: cuerpo y UI.
 *  - Space Grotesk: display/titulares (carácter técnico y distintivo).
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});
