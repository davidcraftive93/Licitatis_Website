/**
 * Configuración de Next.js para la landing comercial de LICITATIS.
 *
 * Seguridad:
 * - Cabeceras de seguridad aplicadas globalmente (CSP moderada, HSTS, anti-clickjacking...).
 * - Source maps de producción desactivados para no exponer código interno.
 *
 * Nota sobre la CSP: script-src incluye 'unsafe-inline' para mantener las páginas
 * estáticas (mejor rendimiento y caché). Es un compromiso habitual y documentado en
 * `docs/SECURITY.md`, donde se describe la ruta de mejora a CSP con nonce.
 */

/** Hosts de terceros preparados para HubSpot y analítica (se activan tras consentimiento). */
const HUBSPOT_HOSTS =
  "https://*.hsforms.com https://*.hubspot.com https://*.hs-scripts.com https://*.hs-analytics.net https://*.hscollectedforms.net https://*.hs-banner.com";
const ANALYTICS_HOSTS =
  "https://www.googletagmanager.com https://www.google-analytics.com https://*.analytics.google.com";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${HUBSPOT_HOSTS} ${ANALYTICS_HOSTS}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${HUBSPOT_HOSTS} ${ANALYTICS_HOSTS}`,
  "font-src 'self' data:",
  `connect-src 'self' https://api.hsforms.com https://forms.hsforms.com ${HUBSPOT_HOSTS} ${ANALYTICS_HOSTS}`,
  `frame-src 'self' ${HUBSPOT_HOSTS}`,
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
