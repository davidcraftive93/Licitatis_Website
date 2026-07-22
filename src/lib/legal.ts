import { siteConfig } from "@/lib/site";

/**
 * Fuente ÚNICA de datos legales de LICITATIS (§6 del mandato).
 *
 * Todas las páginas y documentos legales deben leer de aquí. Los datos que dependen de
 * información registral/jurídica que NO podemos verificar se marcan con LEGAL_REVIEW_REQUIRED
 * y NO se inventan. Mientras existan marcadores, las páginas afectadas van `noindex` y el
 * release gate de producción devuelve BLOCKED_LEGAL_REVIEW (ver scripts/verify-legal-launch.mjs).
 */

/** Marca un dato pendiente de aportar/validar. El texto describe QUÉ falta. */
export function legalReviewRequired(what: string): string {
  return `[LEGAL_REVIEW_REQUIRED: ${what}]`;
}
const LR = legalReviewRequired;

/** Identidad del responsable del tratamiento (LSSI-CE art. 10 / RGPD arts. 13-14). */
export const legalEntity = {
  commercialName: siteConfig.name, // "LICITATIS"
  legalName: LR("razón social del responsable"),
  taxId: LR("NIF/CIF"),
  address: LR("domicilio social completo"),
  registry: LR("datos registrales: Registro Mercantil, tomo, folio, hoja"),
  dpo: LR("Delegado de Protección de Datos (o indicar 'no procede')"),
} as const;

/** Canales de contacto. El correo general es real; los dedicados están por definir. */
export const legalContact = {
  general: siteConfig.contactEmail,
  privacy: siteConfig.contactEmail, // pendiente correo dedicado (p. ej. privacidad@…)
  security: siteConfig.contactEmail, // pendiente canal dedicado (p. ej. security@…)
} as const;

/** Autoridad de control y dominio. */
export const legalRefs = {
  domain: siteConfig.url,
  supervisoryAuthority: "Agencia Española de Protección de Datos (AEPD)",
  supervisoryAuthorityUrl: "https://www.aepd.es",
} as const;

export interface LegalDocMeta {
  /** Versión del documento. */
  version: string;
  /** Fecha de última revisión (ISO o texto). */
  updated: string;
}

/**
 * Versión y fecha de cada documento legal. Mientras el contenido sea un borrador sin
 * validar, se marcan con LEGAL_REVIEW_REQUIRED (aparecerán como pendientes y bloquearán
 * la indexación y el gate de producción).
 */
export const legalDocs: Record<
  "avisoLegal" | "privacidad" | "cookies" | "terminos" | "seguridad" | "dpa" | "subencargados",
  LegalDocMeta
> = {
  avisoLegal: { version: LR("versión del aviso legal"), updated: LR("fecha de última revisión") },
  privacidad: { version: LR("versión de la política de privacidad"), updated: LR("fecha") },
  cookies: { version: LR("versión de la política de cookies"), updated: LR("fecha") },
  terminos: { version: LR("versión de los términos"), updated: LR("fecha") },
  seguridad: {
    version: LR("versión del documento de seguridad y privacidad"),
    updated: LR("fecha"),
  },
  dpa: { version: LR("versión del acuerdo de tratamiento (DPA)"), updated: LR("fecha") },
  subencargados: { version: LR("versión de la lista de subencargados"), updated: LR("fecha") },
};

/** Encargados del tratamiento realmente activos en la WEB pública (verificable en el código). */
export const legalProcessors = [
  {
    name: "HubSpot",
    role: "Gestión de contactos comerciales (formulario Beta Partner)",
    region: LR("región de datos de HubSpot (UE/EEUU)"),
    transferBasis: LR("base de la transferencia internacional (SCC / Data Privacy Framework)"),
    verified: true, // su uso está verificado en src/lib/hubspot.ts; las garantías, no
  },
] as const;

/** True si algún dato legal central sigue sin resolver (para avisos y gates). */
export function hasUnresolvedLegalData(): boolean {
  const values = [
    ...Object.values(legalEntity),
    ...Object.values(legalDocs).flatMap((d) => [d.version, d.updated]),
  ];
  return values.some((v) => typeof v === "string" && v.includes("LEGAL_REVIEW_REQUIRED"));
}
