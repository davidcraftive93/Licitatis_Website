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

/**
 * Páginas legales que NO se indexan y que, por tanto, no deben aparecer en el sitemap.
 *
 * Hasta el 25/08/2026 eran las siete, porque todas tenían datos sin resolver. Resueltos
 * esos datos, el aviso legal, la privacidad, las cookies y los términos pasan a ser
 * indexables: un aviso legal que no se puede encontrar cumple peor su función. Estas
 * tres siguen fuera del índice porque son documentos operativos que se entregan a quien
 * contrata, no material de búsqueda.
 */
export const NOINDEX_ROUTES = [
  "seguridad-y-privacidad",
  "acuerdo-tratamiento-datos",
  "subencargados",
];

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
 * Literales que son COPY DELIBERADO, no datos sin resolver.
 *
 * Sin esta lista el gate en modo producción era **inalcanzable**: la portada
 * bloqueaba por dos textos que están ahí a propósito, así que ni resolviendo todos
 * los datos legales se podía obtener PASS. Un gate que nunca puede pasar se aprende
 * a ignorar — y existía la vía para ignorarlo (`--deploy`).
 *
 * Se retiran del texto ANTES de buscar placeholders, y solo estos dos, escritos con
 * la máxima precisión para que una variante inventada («[[FALTA: CIF]]») siga
 * bloqueando:
 *  1. `[[FALTA: …]]` con puntos suspensivos tipográficos — el marcador de hueco que
 *     el producto muestra en la demo para probar que la IA señala lo que le falta en
 *     vez de inventarlo. Es un argumento de venta, no un olvido.
 * La segunda excepción («pendiente de revisión jurídica») se retiró el 25/08/2026 al
 * desaparecer esa frase del contenido: una excepción sin nada que excepcionar es una
 * puerta abierta que un día deja pasar algo que sí importaba.
 */
export const DELIBERATE_COPY = [
  { name: "marcador de hueco del producto", re: /\[\[FALTA: …\]\]/g },
];

/** Quita el copy deliberado para que no se confunda con datos sin resolver. */
export function stripDeliberateCopy(text) {
  return DELIBERATE_COPY.reduce((acc, { re }) => acc.replace(re, ""), text);
}

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
