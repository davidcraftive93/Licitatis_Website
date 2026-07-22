/**
 * Integración con HubSpot desde el CLIENTE (compatible con export estático).
 *
 * Se envía a la Forms Submission API pública, que solo requiere identificadores
 * PÚBLICOS (Portal ID y Form ID) y NO un token privado:
 *   POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}
 *
 * Se eligió el envío directo (manteniendo el formulario propio, accesible y con nuestro
 * diseño) frente al formulario embebido porque:
 *  - No inyecta scripts ni cookies de terceros para poder enviar (mejor para el
 *    consentimiento: el envío es una acción explícita de primera parte y no depende de
 *    aceptar cookies de marketing).
 *  - Preserva la accesibilidad y el diseño del formulario.
 * La alternativa embebida está documentada en docs/HUBSPOT.md.
 *
 * NUNCA se usa aquí HUBSPOT_PRIVATE_APP_TOKEN. Si hiciera falta una integración privada,
 * debe hacerse desde un backend/servicio seguro independiente (fuera de este sitio estático).
 */

import type { LeadInput } from "@/lib/validation";

const HUBSPOT_SUBMIT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";

export interface HubspotSubmitResult {
  delivered: boolean;
  reason?: string;
}

const CHALLENGE_LABELS: Record<string, string> = {
  "decidir-presentarse": "Decidir con criterio si presentarnos",
  "requisitos-solvencia": "Descubrir tarde un requisito de solvencia",
  documentacion: "Certificados o firmas que faltan o caducan",
  "memoria-tecnica": "Redactar memorias técnicas contra reloj",
  plazos: "Controlar plazos y no perder oportunidades",
  exclusion: "Evitar la exclusión por fallos administrativos",
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
  // El consentimiento de marketing se registra por separado del de privacidad.
  meta.push(`Consentimiento de marketing: ${input.marketing ? "Sí" : "No"}`);
  if (meta.length) parts.push(`\n---\n${meta.join("\n")}`);
  return parts.join("\n").trim();
}

/** Envía el lead a HubSpot desde el navegador. No lanza; devuelve un resultado. */
export async function submitLeadToHubspot(input: LeadInput): Promise<HubspotSubmitResult> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

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
  if (input.hutk) context.hutk = input.hutk;
  if (input.pageUri) context.pageUri = input.pageUri;
  context.pageName = "Landing LICITATIS — Solicitud de demostración";

  const body = {
    fields,
    context,
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "Acepto que LICITATIS trate mis datos para gestionar mi solicitud de demostración. El consentimiento de comunicaciones comerciales es opcional y se recoge por separado.",
      },
    },
  };

  try {
    const res = await fetch(`${HUBSPOT_SUBMIT_BASE}/${portalId}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { delivered: false, reason: `hubspot_error_${res.status}` };
    }
    return { delivered: true };
  } catch {
    return { delivered: false, reason: "network_error" };
  }
}
