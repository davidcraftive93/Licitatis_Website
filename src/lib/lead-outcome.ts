import type { HubspotSubmitResult } from "@/lib/hubspot";

/**
 * Decisión de qué ve la persona tras enviar el formulario. PURA y sin DOM, para que
 * la regla crítica del proyecto se pueda **probar** en vez de sostenerse en una
 * lectura atenta del componente:
 *
 *   NUNCA se muestra éxito si el lead no se entregó.
 *
 * El formulario en sí no se puede probar (Vitest corre en `node`, no hay DOM y no se
 * pueden añadir dependencias), así que lo que se extrae aquí es exactamente la
 * decisión: resultado de la validación y de HubSpot → estado, mensaje y si se ofrece
 * el canal de correo.
 */

export type LeadStatus = "success" | "error";

export interface LeadOutcome {
  status: LeadStatus;
  /** Mensaje para la persona. Vacío cuando el éxito habla por sí solo. */
  message: string;
  /** Si se muestra el enlace de correo con los datos ya escritos. */
  offerMailFallback: boolean;
  /** Campo al que mover el foco, si hay alguno corregible. */
  focusField?: string;
}

/** Campos con interfaz, en el orden en que se leen. */
export const VISIBLE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "company",
  "jobTitle",
  "phone",
  "tendersPerYear",
  "challenge",
  "message",
  "privacy",
] as const;

/**
 * Qué hacer cuando la validación falla.
 *
 * Si ningún error corresponde a un campo visible, la persona no tiene nada que
 * corregir: decirle «revisa los campos marcados» sin marcar ninguno la dejaba en un
 * callejón sin salida y el lead se perdía en silencio. En ese caso no se finge éxito
 * ni se envía: se dice la verdad y se ofrece el correo.
 */
export function outcomeForValidationErrors(errors: Record<string, string>): LeadOutcome {
  const focusField = VISIBLE_FIELDS.find((field) => errors[field]);
  if (focusField) {
    return {
      status: "error",
      message: "Revisa los campos marcados e inténtalo de nuevo.",
      offerMailFallback: false,
      focusField,
    };
  }
  return {
    status: "error",
    message:
      "No hemos podido validar el formulario automáticamente. Escríbenos por correo con estos datos y te damos plaza igualmente.",
    offerMailFallback: true,
  };
}

/** Qué hacer con la respuesta de HubSpot. El éxito exige entrega confirmada. */
export function outcomeForSubmit(result: HubspotSubmitResult): LeadOutcome {
  if (result.delivered) {
    return { status: "success", message: "", offerMailFallback: false };
  }
  return {
    status: "error",
    offerMailFallback: true,
    message:
      result.reason === "not_configured"
        ? "El envío automático del formulario no está disponible ahora mismo. Escríbenos directamente por correo con estos datos y te damos plaza igualmente."
        : "No hemos podido enviar tu solicitud en este momento. Inténtalo de nuevo en unos minutos o escríbenos directamente por correo.",
  };
}
