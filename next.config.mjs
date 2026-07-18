/**
 * Configuración de Next.js para la landing comercial de LICITATIS.
 *
 * Despliegue: sitio ESTÁTICO exportado (`output: "export"`) para alojarse en Hostinger.
 * El build genera la carpeta `out/`, que es el único artefacto que se sube al hosting.
 *
 * Importante:
 * - Con `output: "export"` NO hay servidor: no se usan rutas de API ni `headers()`.
 *   Las cabeceras de seguridad (CSP, HSTS, etc.) se configuran en `public/.htaccess`,
 *   que Hostinger (Apache/LiteSpeed) aplica. Ver `docs/SECURITY.md`.
 * - `trailingSlash: true` hace que cada ruta sea un directorio con `index.html`
 *   (p. ej. `/privacidad/index.html`), lo que se sirve de forma natural en Apache.
 * - Source maps de producción desactivados para no exponer código interno.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    // La optimización bajo demanda no existe en export estático.
    unoptimized: true,
  },
};

export default nextConfig;
