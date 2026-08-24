import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Necesario para generar el archivo estático con output: "export".
export const dynamic = "force-static";

/**
 * Fecha estable de última actualización por documento. Se usa una fecha fija (no la
 * hora de build) para que `lastmod` no cambie en cada despliegue sin cambios de
 * contenido; actualízala manualmente cuando el contenido cambie de forma relevante.
 */
const LAST_UPDATED = new Date("2026-08-25");

/**
 * Páginas legales indexables. Las operativas (seguridad, DPA, subencargados) siguen
 * fuera a propósito: se entregan a quien contrata, no se buscan en Google.
 */
const LEGAL_INDEXABLES = ["aviso-legal", "privacidad", "cookies", "terminos"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: `${base}/`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
    ...LEGAL_INDEXABLES.map((route) => ({
      url: `${base}/${route}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
