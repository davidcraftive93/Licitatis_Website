import { describe, it, expect } from "vitest";
import {
  PLACEHOLDER_PATTERNS,
  PROHIBITED_CLAIM_PATTERNS,
  scanText,
  isCanonicalUrlOk,
  CANONICAL_DOMAIN,
} from "../../scripts/legal-launch-rules.mjs";

describe("release gate legal — detección de placeholders", () => {
  it("detecta datos legales sin resolver", () => {
    expect(scanText("Responsable: [Razón social] ([NIF])", PLACEHOLDER_PATTERNS)).toContain(
      "razón social sin resolver",
    );
    expect(scanText("Domicilio: [Dirección completa]", PLACEHOLDER_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Última actualización: [pendiente].", PLACEHOLDER_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("[LEGAL_REVIEW_REQUIRED: base jurídica]", PLACEHOLDER_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Plazos concretos pendientes de definir.", PLACEHOLDER_PATTERNS).length).toBeGreaterThan(0);
  });

  it("no marca texto legal ya resuelto", () => {
    const ok = "Responsable: Craftive S.L., NIF B12345678, con domicilio en Madrid.";
    expect(scanText(ok, PLACEHOLDER_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — claims prohibidos", () => {
  it("marca afirmaciones absolutas peligrosas", () => {
    expect(scanText("Tus datos están completamente seguros.", PROHIBITED_CLAIM_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Cumplimos el RGPD al 100%.", PROHIBITED_CLAIM_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Esta licitación la puedes ganar.", PROHIBITED_CLAIM_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Los datos nunca salen de España.", PROHIBITED_CLAIM_PATTERNS).length).toBeGreaterThan(0);
  });

  it("NO marca el disclaimer legítimo 'no garantiza la adjudicación'", () => {
    const disclaimer = "LICITATIS no garantiza la adjudicación: asiste la preparación con revisión humana.";
    expect(scanText(disclaimer, PROHIBITED_CLAIM_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — dominio canónico", () => {
  it("acepta solo https://licitatis.es (sin www)", () => {
    expect(isCanonicalUrlOk(CANONICAL_DOMAIN)).toBe(true);
    expect(isCanonicalUrlOk("https://licitatis.es/")).toBe(true);
    expect(isCanonicalUrlOk("https://www.licitatis.es")).toBe(false);
    expect(isCanonicalUrlOk("http://licitatis.es")).toBe(false);
    expect(isCanonicalUrlOk("")).toBe(false);
  });
});
