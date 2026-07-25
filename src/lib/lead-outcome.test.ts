import { describe, expect, it } from "vitest";
import { outcomeForValidationErrors, outcomeForSubmit, VISIBLE_FIELDS } from "@/lib/lead-outcome";
import { buildMessage } from "@/lib/hubspot";
import { leadSchema } from "@/lib/validation";

/**
 * La regla crítica del proyecto —«nunca éxito sin entrega»— estaba protegida solo por
 * lectura manual del componente: Vitest corre en `node`, no hay DOM y no se pueden
 * añadir dependencias, así que `DemoForm` no se podía probar. Por eso la decisión se
 * extrajo a una función pura. Estas pruebas son la red que faltaba.
 */
describe("nunca éxito sin entrega", () => {
  it("solo `delivered` produce éxito", () => {
    expect(outcomeForSubmit({ delivered: true }).status).toBe("success");
  });

  it("HubSpot sin configurar NO es éxito, y ofrece el correo", () => {
    const outcome = outcomeForSubmit({ delivered: false, reason: "not_configured" });
    expect(outcome.status).toBe("error");
    expect(outcome.offerMailFallback).toBe(true);
    expect(outcome.message).toMatch(/no está disponible/i);
  });

  it("ningún fallo de entrega produce éxito, sea cual sea el motivo", () => {
    for (const reason of ["timeout", "network_error", "hubspot_error_400", "hubspot_error_500"]) {
      const outcome = outcomeForSubmit({ delivered: false, reason });
      expect(outcome.status, reason).toBe("error");
      expect(outcome.offerMailFallback, reason).toBe(true);
      expect(outcome.message.length, reason).toBeGreaterThan(0);
    }
  });

  it("el éxito no arrastra el enlace de correo", () => {
    expect(outcomeForSubmit({ delivered: true }).offerMailFallback).toBe(false);
  });
});

describe("errores de validación: nunca un callejón sin salida", () => {
  it("un campo visible se señala y recibe el foco", () => {
    const outcome = outcomeForValidationErrors({ email: "Introduce un correo válido." });
    expect(outcome.status).toBe("error");
    expect(outcome.focusField).toBe("email");
    expect(outcome.offerMailFallback).toBe(false);
    expect(outcome.message).toMatch(/campos marcados/i);
  });

  it("respeta el orden de lectura al elegir el foco", () => {
    const outcome = outcomeForValidationErrors({ privacy: "x", firstName: "y", company: "z" });
    expect(outcome.focusField).toBe("firstName");
  });

  it("si NADA es corregible, se ofrece el correo en vez de pedir lo imposible", () => {
    // Este era el defecto: claves sin interfaz (metadatos de atribución, campo trampa)
    // producían «revisa los campos marcados» sin ningún campo marcado, sin foco y sin
    // salida. El lead se perdía en silencio.
    const casos: Record<string, string>[] = [
      { utm: "String must contain at most 120 character(s)" },
      { pageUri: "String must contain at most 500 character(s)" },
      { company_url: "String must contain at most 0 character(s)" },
      { hutk: "x", ctaOrigin: "y" },
    ];
    for (const errors of casos) {
      const outcome = outcomeForValidationErrors(errors);
      expect(outcome.status).toBe("error");
      expect(outcome.focusField).toBeUndefined();
      expect(outcome.offerMailFallback, JSON.stringify(errors)).toBe(true);
      expect(outcome.message).not.toMatch(/campos marcados/i);
    }
  });

  it("un campo visible manda sobre uno invisible", () => {
    const outcome = outcomeForValidationErrors({ utm: "x", email: "y" });
    expect(outcome.focusField).toBe("email");
    expect(outcome.offerMailFallback).toBe(false);
  });

  it("los campos visibles coinciden con los que el formulario pinta", () => {
    expect([...VISIBLE_FIELDS]).toEqual([
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
    ]);
  });
});

describe("mensaje que llega a HubSpot", () => {
  const lead = leadSchema.parse({
    firstName: "Ana",
    lastName: "García",
    email: "ana@empresa.es",
    company: "Empresa Demo SL",
    privacy: true,
    tendersPerYear: "6-20",
    challenge: "plazos",
    message: "Queremos ordenar las candidaturas.",
    marketing: false,
    ctaOrigin: "hero-analizar",
    utm: { source: "google", medium: "cpc", campaign: "beta" },
  });

  it("lleva el mensaje, los metadatos y el consentimiento de marketing", () => {
    const text = buildMessage(lead);
    expect(text).toContain("Queremos ordenar las candidaturas.");
    expect(text).toContain("Licitaciones al año: 6-20");
    expect(text).toContain("Controlar plazos");
    expect(text).toContain("Origen: google / cpc / beta");
    expect(text).toContain("Consentimiento de marketing: No");
  });

  it("lleva el CTA de entrada DENTRO del mensaje, sin crear propiedades nuevas", () => {
    // Una propiedad inexistente haría que HubSpot rechazara el envío: el CTA viaja en
    // el cuerpo del mensaje justo para que no pueda costar un lead.
    expect(buildMessage(lead)).toContain("CTA de entrada: hero-analizar");
  });

  it("sin CTA no añade la línea", () => {
    const sinCta = { ...lead, ctaOrigin: undefined };
    expect(buildMessage(sinCta)).not.toContain("CTA de entrada");
  });

  it("registra el consentimiento de marketing cuando se da", () => {
    expect(buildMessage({ ...lead, marketing: true })).toContain("Consentimiento de marketing: Sí");
  });
});
