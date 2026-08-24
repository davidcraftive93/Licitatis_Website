import { siteConfig } from "@/lib/site";

/**
 * Fuente ÚNICA de datos legales y fiscales (§6 del mandato legal).
 *
 * REGLA DE MARCA (transversal, no negociable):
 *   - "LICITATIS" es una MARCA COMERCIAL / producto. NO es una sociedad.
 *   - La sociedad titular, que presta el servicio, factura y responde legalmente, es
 *     ZSE INNOVATION STUDIO SL (marca corporativa: Craftive).
 *   - Nunca debe escribirse "LICITATIS S.L.", "LICITATIS SL" ni nada que sugiera que la
 *     marca es una sociedad. El release gate lo verifica automáticamente.
 *
 * Los datos registrales/fiscales que NO nos han facilitado se dejan como marcadores
 * visibles [[ASÍ]] y NO se inventan. Mientras existan, las páginas afectadas van
 * `noindex` y el release gate de producción devuelve BLOCKED_LEGAL_REVIEW.
 *
 * A 25/08/2026 no queda ninguno: el propietario aportó los datos societarios y aprobó
 * las decisiones de negocio que faltaban (plazos de conservación, fuero, versiones).
 * La función `pendingLegalData` se conserva a propósito, no como código muerto: si
 * mañana hace falta un dato nuevo, el camino correcto es volver a marcarlo —no
 * inventarlo— y el gate volverá a bloquear solo.
 */

/** Marca un dato pendiente de aportar. Formato visible: [[DATO]]. */
export function pendingLegalData(what: string): string {
  return `[[${what}]]`;
}

/**
 * Fecha de la revisión con la que se publican los textos legales vigentes.
 * Una sola constante: si se revisan de nuevo, se cambia aquí y cambia en las siete
 * páginas a la vez. Formato ISO para poder ordenarla y compararla.
 */
export const LEGAL_REVIEW_DATE = "2026-08-25";

/** La misma fecha, escrita como la lee una persona en España. */
export const LEGAL_REVIEW_DATE_LABEL = "25 de agosto de 2026";

/** Sociedad titular: quien presta el servicio, factura y responde. */
export const company = {
  /** Denominación social. */
  name: "ZSE INNOVATION STUDIO SL",
  /** Nombre comercial / marca corporativa. */
  brand: "Craftive",
  taxId: "B26701243",
  address: "Calle Llíria 54, 46180 Benaguasil (Valencia), España",
  phone: "685 030 281",
  /**
   * Datos registrales aportados por el propietario. En su ficha registral los campos
   * "Tomo" y "Folio" están vacíos, así que NO se inventan: la hoja identifica la
   * sociedad de forma unívoca. Si la asesoría los facilita, se añaden aquí.
   */
  registry: "Inscrita en el Registro Mercantil de Valencia, sección 8, hoja V-231948",
  legalEmail: "info@craftive.es",
  /** Confirmado por el propietario: no se ha designado DPD. */
  dpo: "No procede: no se ha designado Delegado de Protección de Datos.",
} as const;

/** Marca comercial del producto (NO es una sociedad). */
export const brand = {
  name: siteConfig.name, // "LICITATIS"
  /**
   * Cómo aparece el cargo en el extracto bancario del cliente. NO es "LICITATIS":
   * el descriptor corresponde a la sociedad. Se citan las dos formas posibles porque
   * el propietario aún debe confirmar cuál usa la pasarela de pago.
   */
  statementDescriptors: ["ZSE", "CRAFTIVE BY ZSE"] as const,
} as const;

/** Frase corta de titularidad, reutilizable (footer, tabla de precios, legales). */
export const ownershipLine = `${brand.name} es un producto de ${company.brand} — ${company.name}`;

/** Los importes publicados YA INCLUYEN el IVA aplicable. */
export const VAT_INCLUDED = true;
export const vatLabel = VAT_INCLUDED ? "IVA incluido" : "IVA no incluido";

/**
 * Aviso de facturación bajo la tabla de precios. Es la principal defensa frente a
 * disputas bancarias: quien paga debe poder reconocer el cargo de su extracto. Por eso
 * se dice explícitamente que NO aparecerá como «LICITATIS», que es justo la confusión
 * que provoca las reclamaciones al banco.
 * Debe ir SIEMPRE visible en el HTML (nunca tras hover, tooltip o acordeón).
 */
export const billingNotice = `Servicio prestado y facturado por ${company.name} (CIF ${company.taxId}), titular de la marca ${brand.name}. En tu extracto bancario el cargo figurará a nombre de la sociedad —como «${brand.statementDescriptors[0]}» o «${brand.statementDescriptors[1]}»—, no como «${brand.name}».`;

/** Canales de contacto. */
export const legalContact = {
  general: siteConfig.contactEmail, // info@licitatis.es
  privacy: siteConfig.contactEmail,
  security: siteConfig.contactEmail,
  legal: company.legalEmail,
} as const;

export const legalRefs = {
  domain: siteConfig.url,
  supervisoryAuthority: "Agencia Española de Protección de Datos (AEPD)",
  supervisoryAuthorityUrl: "https://www.aepd.es",
} as const;

export interface LegalDocMeta {
  version: string;
  updated: string;
}

/**
 * Versión y fecha de cada documento legal.
 *
 * Todos arrancan en 1.0 con la misma fecha porque se publican juntos por primera vez.
 * Cuando uno cambie de fondo, súbele la versión SOLO a ese y actualiza su fecha: que
 * los siete compartan número esconde qué se tocó y cuándo.
 */
const v1: LegalDocMeta = { version: "1.0", updated: LEGAL_REVIEW_DATE_LABEL };

export const legalDocs: Record<
  "avisoLegal" | "privacidad" | "cookies" | "terminos" | "seguridad" | "dpa" | "subencargados",
  LegalDocMeta
> = {
  avisoLegal: v1,
  privacidad: v1,
  cookies: v1,
  terminos: v1,
  seguridad: v1,
  dpa: v1,
  subencargados: v1,
};

/**
 * Encargados del tratamiento verificables en el código de esta web.
 *
 * `region` describe lo que HubSpot ofrece y de qué depende, no una promesa nuestra:
 * la región concreta de un portal se consulta en la propia cuenta (Configuración →
 * Valores predeterminados → Alojamiento de datos). Decir «datos en la UE» sin poder
 * demostrarlo fue justo el claim que hubo que retirar de la portada.
 */
export const legalProcessors = [
  {
    name: "HubSpot, Inc.",
    role: "Gestión de contactos comerciales (formulario de captación)",
    region:
      "Alojamiento en la Unión Europea (Fráncfort, Alemania) o en Estados Unidos, según la configuración de la cuenta",
    transferBasis:
      "Certificación en el EU-US Data Privacy Framework (Decisión de Ejecución (UE) 2023/1795) y cláusulas contractuales tipo para las transferencias intragrupo",
    verified: true,
  },
] as const;

/** True si queda algún dato legal/fiscal sin aportar. */
export function hasUnresolvedLegalData(): boolean {
  const values = [
    ...Object.values(company),
    ...Object.values(legalDocs).flatMap((d) => [d.version, d.updated]),
  ];
  return values.some((v) => typeof v === "string" && /\[\[.+\]\]/.test(v));
}
