import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/validation";

const validLead = {
  firstName: "Ana",
  lastName: "García López",
  email: "ana@empresa.es",
  company: "Empresa Demo SL",
  jobTitle: "Responsable de licitaciones",
  phone: "600000000",
  tendersPerYear: "6-20",
  challenge: "plazos",
  message: "Nos interesa organizar mejor las candidaturas.",
  privacy: true,
  company_url: "",
};

describe("leadSchema", () => {
  it("acepta un lead válido", () => {
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it("rechaza si no se acepta la privacidad", () => {
    const result = leadSchema.safeParse({ ...validLead, privacy: false });
    expect(result.success).toBe(false);
  });

  it("rechaza un correo no válido", () => {
    const result = leadSchema.safeParse({ ...validLead, email: "no-es-un-email" });
    expect(result.success).toBe(false);
  });

  it("rechaza si el honeypot company_url viene relleno", () => {
    const result = leadSchema.safeParse({ ...validLead, company_url: "http://spam.example" });
    expect(result.success).toBe(false);
  });

  it("aplica valores por defecto a los campos opcionales", () => {
    const minimal = {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@empresa.es",
      company: "Constructora Ejemplo",
      privacy: true,
    };
    const result = leadSchema.safeParse(minimal);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tendersPerYear).toBe("no-lo-se");
      expect(result.data.challenge).toBe("otra");
      expect(result.data.jobTitle).toBe("");
    }
  });

  it("rechaza un nombre demasiado corto", () => {
    const result = leadSchema.safeParse({ ...validLead, firstName: "A" });
    expect(result.success).toBe(false);
  });
});

/**
 * La atribución la rellena el navegador leyendo la URL, las cookies y el DOM: la
 * persona no puede corregirla. Si un valor largo invalidara el formulario, el
 * aviso pediría revisar «los campos marcados» sin marcar ninguno y no habría
 * forma de enviar. Estas pruebas fijan que eso no puede volver a pasar.
 */
describe("metadatos de atribución: recortan, no bloquean", () => {
  it("una utm_campaign larguísima no invalida el lead", () => {
    const result = leadSchema.safeParse({
      ...validLead,
      utm: { source: "x".repeat(400), medium: "y".repeat(400), campaign: "z".repeat(1000) },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.utm?.source).toHaveLength(120);
      expect(result.data.utm?.medium).toHaveLength(120);
      expect(result.data.utm?.campaign).toHaveLength(160);
    }
  });

  it("una URL de página kilométrica no invalida el lead", () => {
    const pageUri = `https://licitatis.es/?${"a=1&".repeat(400)}`;
    const result = leadSchema.safeParse({ ...validLead, pageUri });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.pageUri).toHaveLength(500);
  });

  it("una cookie hutk anómala no invalida el lead", () => {
    const result = leadSchema.safeParse({ ...validLead, hutk: "h".repeat(500) });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.hutk).toHaveLength(120);
  });

  it("el origen del CTA se acota y no bloquea", () => {
    const result = leadSchema.safeParse({ ...validLead, ctaOrigin: "c".repeat(300) });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.ctaOrigin).toHaveLength(80);
  });

  it("un valor vacío o en blanco no viaja como cadena vacía", () => {
    const result = leadSchema.safeParse({ ...validLead, ctaOrigin: "   ", hutk: "" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ctaOrigin).toBeUndefined();
      expect(result.data.hutk).toBeUndefined();
    }
  });

  it("sigue rechazando lo que la persona SÍ puede corregir", () => {
    // El recorte es solo para la atribución: los campos con interfaz siguen
    // validándose de verdad, porque ahí el aviso es accionable.
    expect(leadSchema.safeParse({ ...validLead, message: "m".repeat(2100) }).success).toBe(false);
    expect(leadSchema.safeParse({ ...validLead, company: "C" }).success).toBe(false);
  });
});
