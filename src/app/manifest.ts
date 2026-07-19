import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Necesario para generar el archivo estático con output: "export".
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.descriptor}`,
    short_name: siteConfig.name,
    description: siteConfig.shortValue,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F6FD",
    theme_color: "#6A25F5",
    lang: "es-ES",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
