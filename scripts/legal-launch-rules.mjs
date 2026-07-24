/**
 * Reglas puras del release gate legal de LICITATIS.
 *
 * Se mantienen SIN dependencias ni acceso a disco para poder probarlas con Vitest
 * (ver src/lib/legal-launch.test.ts). El CLI (scripts/verify-legal-launch.mjs) las
 * aplica sobre el artefacto build (out/) y el código fuente.
 */

/** Dominio canónico DECIDIDO para la web pública (sin www). */
export const CANONICAL_DOMAIN = "https://licitatis.es";

/** Rutas legales mínimas que deben existir como página. */
export const REQUIRED_LEGAL_ROUTES = [
  "aviso-legal",
  "privacidad",
  "cookies",
  "terminos",
  "seguridad-y-privacidad",
  "acuerdo-tratamiento-datos",
  "subencargados",
];

/** Rutas legales que llevan noindex mientras tengan placeholders: NO deben ir al sitemap. */
export const NOINDEX_WHILE_PLACEHOLDER = [...REQUIRED_LEGAL_ROUTES];

/**
 * Coherencia de marca (transversal): LICITATIS es una MARCA COMERCIAL, no una sociedad.
 * La sociedad titular es ZSE INNOVATION STUDIO SL. Escribir "LICITATIS S.L." induciría a
 * error sobre quién presta el servicio, factura y responde: es bloqueante.
 */
export const BRAND_MISUSE_PATTERNS = [
  {
    name: '"LICITATIS S.L./SL" (la marca no es una sociedad)',
    re: /LICITATIS[,\s]+S\.?\s?L\.?(?![a-z])/i,
  },
  {
    name: '"LICITATIS S.A./SA" (la marca no es una sociedad)',
    re: /LICITATIS[,\s]+S\.?\s?A\.?(?![a-z])/i,
  },
];

/** Certificaciones que no deben afirmarse sin acreditación (fuera de un mock etiquetado). */
export const CERTIFICATION_PATTERNS = [
  { name: "ISO 27001", re: /ISO\s*27001/i },
  { name: "SOC 2", re: /SOC\s*2\b/i },
  { name: "certificación ISO afirmada", re: /certifica(do|ci[oó]n)\s+ISO/i },
];

/**
 * Patrones de placeholder legal. Si aparecen en el HTML que se sirve (out/), significa
 * que datos legales sin resolver llegarían al público: bloqueante en producción.
 */
export const PLACEHOLDER_PATTERNS = [
  { name: "marcador LEGAL_REVIEW_REQUIRED", re: /\[LEGAL_REVIEW_REQUIRED/i },
  // Datos fiscales/registrales pendientes de aportar: [[CIF]], [[DOMICILIO SOCIAL]]…
  { name: "dato fiscal/registral pendiente [[…]]", re: /\[\[[^\]]{2,80}\]\]/ },
  { name: "razón social sin resolver", re: /\[\s*Razón social\s*\]/i },
  { name: "NIF/CIF sin resolver", re: /\[\s*(NIF|CIF)[^\]]*\]/i },
  { name: "domicilio/dirección sin resolver", re: /\[\s*(Dirección|Domicilio)[^\]]*\]/i },
  {
    name: "datos registrales sin resolver",
    re: /\[\s*(Registro Mercantil|Datos registrales)[^\]]*\]/i,
  },
  { name: "DPO sin resolver", re: /\[\s*Si aplica\s*\]/i },
  { name: "fecha sin resolver", re: /\[\s*(Fecha|pendiente)\s*\]/i },
  {
    name: "texto pendiente de revisión",
    re: /\[\s*(Texto|Contenido|Detalle)\s+pendiente[^\]]*\]/i,
  },
  { name: "plazos/fuero pendientes", re: /\[\s*(Plazos|Fuero)[^\]]*\]/i },
  {
    name: "herramienta/cookies pendientes",
    re: /\[\s*(Herramienta|Cookies|Se recomienda)[^\]]*\]/i,
  },
  {
    name: "pendiente de confirmar/definir/detallar",
    re: /pendientes?\s+de\s+(confirmar|confirmación|revisión|definir|detallar|completar)/i,
  },
  { name: "marcador de tarea (TODO/FIXME)", re: /\b(TODO:|FIXME|PLACEHOLDER)\b/ },
];

/**
 * Claims absolutos/engañosos prohibidos en la web pública (RGPD/consumidores). No deben
 * aparecer NUNCA: bloqueante en cualquier modo. Nota: las formas negadas legítimas del
 * copy ("no garantiza la adjudicación") NO deben marcarse; por eso se buscan las formas
 * afirmativas peligrosas y frases cerradas.
 */
export const PROHIBITED_CLAIM_PATTERNS = [
  {
    name: '"100% seguro" / "RGPD al 100%"',
    re: /100\s*%\s*(seguro|seguros|protegid|garantiz)|(RGPD|GDPR)\s+(al\s+)?100\s*%/i,
  },
  { name: '"completamente seguro"', re: /completamente segur[oa]s?/i },
  { name: '"datos totalmente protegidos"', re: /datos\s+totalmente\s+protegidos/i },
  { name: '"sin ningún riesgo"', re: /sin\s+ning[úu]n\s+riesgo/i },
  { name: '"los datos nunca salen de España"', re: /datos\s+nunca\s+salen\s+de\s+Espa/i },
  { name: '"cumplimiento asegurado"', re: /cumplimiento\s+asegurado/i },
  {
    name: '"garantiza la adjudicación" (afirmativo)',
    re: /(?<!no\s)garantiza(mos)?\s+(la\s+)?adjudicaci/i,
  },
  { name: '"te hará ganar" / "la puedes ganar"', re: /te\s+har[áa]\s+ganar|la\s+puedes\s+ganar/i },
  { name: '"evita toda exclusión"', re: /evita\s+toda\s+exclusi/i },
  { name: '"responsable bajo ninguna circunstancia"', re: /bajo\s+ninguna\s+circunstancia/i },
];

/** Devuelve los nombres de patrones que aparecen en `text`. */
export function scanText(text, patterns) {
  const hits = [];
  for (const p of patterns) {
    if (p.re.test(text)) hits.push(p.name);
  }
  return hits;
}

/** El dominio canónico debe ser exactamente https://licitatis.es (sin www ni barra final). */
export function isCanonicalUrlOk(url) {
  if (typeof url !== "string") return false;
  return url.replace(/\/+$/, "") === CANONICAL_DOMAIN;
}
