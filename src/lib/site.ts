/**
 * Configuración central del sitio. Los valores sensibles o específicos de entorno
 * se leen de variables de entorno con valores por defecto seguros.
 *
 * Nota: `contactEmail` es un PLACEHOLDER pendiente de confirmación (ver docs/CONTENT-PENDING.md).
 */

// Se usa "||" (no "??") para que una variable vacía ("") también use el valor por
// defecto: en CI/despliegue las variables no definidas llegan como cadena vacía, y
// `new URL("")` (metadataBase) lanzaría un error que rompería el build.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.licitatis.es";

export const siteConfig = {
  name: "LICITATIS",
  descriptor: "El copiloto para preparar y controlar licitaciones",
  shortValue:
    "Convierte pliegos, requisitos, documentos, tareas y plazos en un proceso claro, coordinado y bajo control.",
  /** URL pública de la web comercial (sin barra final). */
  url: rawSiteUrl.replace(/\/$/, ""),
  /** URL de la aplicación privada (fuera de este repositorio/despliegue). */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.licitatis.es",
  /** Correo de contacto — PLACEHOLDER, revisar antes de publicar. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@licitatis.es",
  locale: "es_ES",
  lang: "es",
} as const;

/**
 * Navegación principal. Se usan anclas root-relative ("/#seccion") para que también
 * funcionen desde las páginas legales (navegando a la home y desplazándose a la sección).
 */
export const navLinks = [
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Planes", href: "/#planes" },
  { label: "Para quién es", href: "/#para-quien" },
  { label: "Seguridad", href: "/#seguridad" },
  { label: "FAQ", href: "/#faq" },
] as const;

/** Enlaces legales para el footer (páginas con placeholders pendientes de revisión legal). */
export const legalLinks = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
  { label: "Términos", href: "/terminos" },
] as const;
