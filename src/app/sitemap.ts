import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Necesario para generar el archivo estático con output: "export".
export const dynamic = "force-static";

/**
 * Fecha estable de última actualización por documento. Se usa una fecha fija (no la
 * hora de build) para que `lastmod` no cambie en cada despliegue sin cambios de
 * contenido; actualízala manualmente cuando el contenido cambie de forma relevante.
 */
const LAST_UPDATED = new Date("2026-07-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: `${base}/`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/aviso-legal`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/privacidad`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terminos`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
