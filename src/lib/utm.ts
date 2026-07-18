/** Captura de parámetros UTM y contexto de página (cliente). */

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

const UTM_KEYS: Record<keyof UtmParams, string> = {
  source: "utm_source",
  medium: "utm_medium",
  campaign: "utm_campaign",
  term: "utm_term",
  content: "utm_content",
};

export function readUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  (Object.keys(UTM_KEYS) as (keyof UtmParams)[]).forEach((key) => {
    const value = params.get(UTM_KEYS[key]);
    if (value) utm[key] = value.slice(0, 160);
  });
  return utm;
}

/** Lee la cookie de tracking de HubSpot (hubspotutk) si existe. */
export function readHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((row) => row.startsWith("hubspotutk="));
  return match ? match.split("=").slice(1).join("=") : undefined;
}
