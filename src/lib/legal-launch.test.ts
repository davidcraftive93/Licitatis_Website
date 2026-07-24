import { describe, it, expect } from "vitest";
import {
  PLACEHOLDER_PATTERNS,
  PROHIBITED_CLAIM_PATTERNS,
  CERTIFICATION_PATTERNS,
  BRAND_MISUSE_PATTERNS,
  REQUIRED_LEGAL_ROUTES,
  scanText,
  isCanonicalUrlOk,
  CANONICAL_DOMAIN,
} from "../../scripts/legal-launch-rules.mjs";

describe("release gate legal — detección de placeholders", () => {
  it("detecta datos legales sin resolver", () => {
    expect(scanText("Responsable: [Razón social] ([NIF])", PLACEHOLDER_PATTERNS)).toContain(
      "razón social sin resolver",
    );
    expect(
      scanText("Domicilio: [Dirección completa]", PLACEHOLDER_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("Última actualización: [pendiente].", PLACEHOLDER_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("[LEGAL_REVIEW_REQUIRED: base jurídica]", PLACEHOLDER_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("Plazos concretos pendientes de definir.", PLACEHOLDER_PATTERNS).length,
    ).toBeGreaterThan(0);
  });

  it("no marca texto legal ya resuelto", () => {
    const ok = "Responsable: Craftive S.L., NIF B12345678, con domicilio en Madrid.";
    expect(scanText(ok, PLACEHOLDER_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — claims prohibidos", () => {
  it("marca afirmaciones absolutas peligrosas", () => {
    expect(
      scanText("Tus datos están completamente seguros.", PROHIBITED_CLAIM_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("Cumplimos el RGPD al 100%.", PROHIBITED_CLAIM_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("Esta licitación la puedes ganar.", PROHIBITED_CLAIM_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(
      scanText("Los datos nunca salen de España.", PROHIBITED_CLAIM_PATTERNS).length,
    ).toBeGreaterThan(0);
  });

  it("NO marca el disclaimer legítimo 'no garantiza la adjudicación'", () => {
    const disclaimer =
      "LICITATIS no garantiza la adjudicación: asiste la preparación con revisión humana.";
    expect(scanText(disclaimer, PROHIBITED_CLAIM_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — coherencia de marca", () => {
  it("marca a LICITATIS escrito como sociedad", () => {
    expect(scanText("© LICITATIS S.L.", BRAND_MISUSE_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("Contrata con LICITATIS SL", BRAND_MISUSE_PATTERNS).length).toBeGreaterThan(0);
    expect(scanText("LICITATIS S.A. informa", BRAND_MISUSE_PATTERNS).length).toBeGreaterThan(0);
  });

  it("NO marca el uso correcto (marca + sociedad titular)", () => {
    const ok =
      "LICITATIS es un producto de Craftive — ZSE INNOVATION STUDIO SL. Servicio facturado por ZSE INNOVATION STUDIO SL.";
    expect(scanText(ok, BRAND_MISUSE_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — datos fiscales pendientes", () => {
  it("detecta marcadores [[DATO]]", () => {
    expect(scanText("CIF [[CIF]]", PLACEHOLDER_PATTERNS).length).toBeGreaterThan(0);
    expect(
      scanText("Domicilio: [[DOMICILIO SOCIAL]]", PLACEHOLDER_PATTERNS).length,
    ).toBeGreaterThan(0);
  });
});

describe("release gate legal — certificaciones", () => {
  it("marca ISO 27001 y SOC 2 (afirmadas)", () => {
    expect(
      scanText("Estamos certificados en ISO 27001.", CERTIFICATION_PATTERNS).length,
    ).toBeGreaterThan(0);
    expect(scanText("Cumplimos SOC 2.", CERTIFICATION_PATTERNS).length).toBeGreaterThan(0);
  });
  it("NO marca ISO 9001 (calidad, usada en el mock de demo)", () => {
    expect(scanText("ISO 9001 · vence 11/2026", CERTIFICATION_PATTERNS)).toHaveLength(0);
  });
});

describe("release gate legal — rutas legales requeridas", () => {
  it("incluye las 7 páginas legales (incl. seguridad, DPA y subencargados)", () => {
    for (const r of [
      "aviso-legal",
      "privacidad",
      "cookies",
      "terminos",
      "seguridad-y-privacidad",
      "acuerdo-tratamiento-datos",
      "subencargados",
    ]) {
      expect(REQUIRED_LEGAL_ROUTES).toContain(r);
    }
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
