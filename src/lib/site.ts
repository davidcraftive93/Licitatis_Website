/**
 * Configuración central del sitio. Los valores sensibles o específicos de entorno
 * se leen de variables de entorno con valores por defecto seguros.
 *
 * Nota: `contactEmail` es un PLACEHOLDER pendiente de confirmación (ver docs/CONTENT-PENDING.md).
 */

// Se usa "||" (no "??") para que una variable vacía ("") también use el valor por
// defecto: en CI/despliegue las variables no definidas llegan como cadena vacía, y
// `new URL("")` (metadataBase) lanzaría un error que rompería el build.
// Dominio canónico DECIDIDO: https://licitatis.es (sin www). www.licitatis.es debe
// redirigir 301 al dominio principal (configuración en Hostinger). El release gate de
// producción (npm run verify:legal-launch --mode production) bloquea si NEXT_PUBLIC_SITE_URL
// no es el dominio canónico.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://licitatis.es";

export const siteConfig = {
  name: "LICITATIS",
  descriptor: "De pliego a candidatura preparada, controlada y defendible",
  shortValue:
    "LICITATIS convierte pliegos de licitación pública en candidaturas preparadas, controladas y defendibles. La cabina de control de todo el proceso.",
  /** URL pública de la web comercial (sin barra final). */
  url: rawSiteUrl.replace(/\/$/, ""),
  /** URL de la aplicación privada (fuera de este repositorio/despliegue). */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.licitatis.es",
  /** Correo de contacto y de captación (Beta Partner). */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "david@craftive.es",
  locale: "es_ES",
  lang: "es",
} as const;

/**
 * Navegación principal. Se usan anclas root-relative ("/#seccion") para que también
 * funcionen desde las páginas legales (navegando a la home y desplazándose a la sección).
 */
export const navLinks = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "El Pasaporte", href: "/#pasaporte" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planes", href: "/#planes" },
  { label: "FAQ", href: "/#faq" },
] as const;

/** Enlaces legales para el footer (páginas con placeholders pendientes de revisión legal). */
export const legalLinks = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
  { label: "Términos", href: "/terminos" },
] as const;
