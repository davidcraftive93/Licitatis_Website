/**
 * Modelo de consentimiento de cookies (cliente).
 *
 * Categorías mínimas: necesarias (siempre activas), analítica y marketing.
 * La preferencia se guarda en una cookie de primera parte ("necesaria" por naturaleza,
 * ya que solo almacena la elección del usuario). Ninguna herramienta no esencial se
 * carga hasta que el usuario da su consentimiento.
 *
 * AVISO: los textos legales asociados son PLACEHOLDERS y deben ser revisados por un
 * profesional (ver /cookies y docs/CONTENT-PENDING.md).
 */

export const CONSENT_COOKIE = "licitatis_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;

export interface ConsentState {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** Marca temporal ISO de la decisión. */
  updatedAt: string;
}

export function acceptAll(): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  };
}

export function rejectAll(): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
}

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=").slice(1).join("="));
    const parsed = JSON.parse(value) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(state));
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}
