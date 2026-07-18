/**
 * Integración con HubSpot mediante la Forms Submission API (lado servidor).
 *
 * Se usa el endpoint de formularios (no requiere token privado en el navegador):
 *   POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}
 *
 * El token privado (HUBSPOT_PRIVATE_APP_TOKEN), si se usa para enriquecer contactos
 * vía CRM API, SOLO debe existir en entorno de servidor. Nunca se expone al cliente.
 *
 * Si el portal/formulario no están configurados, la función NO lanza error: devuelve
 * { delivered: false, reason: "not_configured" } para que la landing siga siendo usable
 * antes de la puesta en producción. Ver docs/HUBSPOT.md.
 */

import type { LeadInput } from "@/lib/validation";

const HUBSPOT_SUBMIT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";

export interface HubspotSubmitMeta {
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
  hutk?: string;
}

export interface HubspotSubmitResult {
  delivered: boolean;
  reason?: string;
}

const CHALLENGE_LABELS: Record<string, string> = {
  "dispersion-fuentes": "Licitaciones dispersas en muchas fuentes",
  "analisis-pliegos": "Revisión manual de pliegos y requisitos",
  "gestion-documental": "Documentación desorganizada o versiones incorrectas",
  plazos: "Control de fechas límite",
  "coordinacion-equipo": "Coordinación de tareas y responsables",
  trazabilidad: "Falta de trazabilidad y visibilidad",
  otra: "Otra",
};

function buildMessage(input: LeadInput): string {
  const parts: string[] = [];
  if (input.message) parts.push(input.message.trim());
  const meta: string[] = [];
  if (input.tendersPerYear && input.tendersPerYear !== "no-lo-se") {
    meta.push(`Licitaciones al año: ${input.tendersPerYear}`);
  }
  if (input.challenge) {
    meta.push(`Principal dificultad: ${CHALLENGE_LABELS[input.challenge] ?? input.challenge}`);
  }
  if (input.utm?.source || input.utm?.campaign) {
    meta.push(
      `Origen: ${[input.utm?.source, input.utm?.medium, input.utm?.campaign]
        .filter(Boolean)
        .join(" / ")}`,
    );
  }
  if (meta.length) parts.push(`\n---\n${meta.join("\n")}`);
  return parts.join("\n").trim();
}

export async function submitLeadToHubspot(
  input: LeadInput,
  meta: HubspotSubmitMeta = {},
): Promise<HubspotSubmitResult> {
  const portalId = process.env.HUBSPOT_PORTAL_ID ?? process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID ?? process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    return { delivered: false, reason: "not_configured" };
  }

  const fields = [
    { name: "firstname", value: input.firstName },
    { name: "lastname", value: input.lastName },
    { name: "email", value: input.email },
    { name: "company", value: input.company },
    { name: "jobtitle", value: input.jobTitle ?? "" },
    { name: "phone", value: input.phone ?? "" },
    { name: "message", value: buildMessage(input) },
  ].filter((f) => f.value !== "");

  const context: Record<string, string> = {};
  if (meta.hutk) context.hutk = meta.hutk;
  if (meta.pageUri) context.pageUri = meta.pageUri;
  if (meta.pageName) context.pageName = meta.pageName;
  if (meta.ipAddress) context.ipAddress = meta.ipAddress;

  const body = {
    fields,
    context,
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "Acepto que LICITATIS trate mis datos para gestionar mi solicitud de demostración.",
      },
    },
  };

  try {
    const res = await fetch(`${HUBSPOT_SUBMIT_BASE}/${portalId}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Evita cachear la respuesta del envío.
      cache: "no-store",
    });

    if (!res.ok) {
      // No exponemos el detalle al cliente; se registra en servidor.
      let detail = "";
      try {
        detail = JSON.stringify(await res.json());
      } catch {
        detail = await res.text().catch(() => "");
      }
      console.error(`[hubspot] Envío fallido (${res.status}): ${detail.slice(0, 500)}`);
      return { delivered: false, reason: `hubspot_error_${res.status}` };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[hubspot] Error de red al enviar el formulario:", error);
    return { delivered: false, reason: "network_error" };
  }
}
