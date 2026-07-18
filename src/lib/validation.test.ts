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
