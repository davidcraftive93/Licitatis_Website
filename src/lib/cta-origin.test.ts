import { describe, expect, it } from "vitest";
import { readCtaOrigin, getCtaOrigin, resetCtaOrigin, CTA_ORIGIN_ATTR } from "@/lib/cta-origin";

/**
 * Doble mínimo del objetivo de un clic: `closest` devuelve el CTA más cercano,
 * o `null` si no hay ninguno. Suficiente para probar la lógica sin arrancar un
 * DOM (y sin añadir una dependencia de entorno solo para esto).
 */
function target(cta?: string) {
  return {
    closest: (selector: string) =>
      selector === `[${CTA_ORIGIN_ATTR}]` && cta !== undefined ? { getAttribute: () => cta } : null,
  };
}

/**
 * La intención de entrada no puede costarle un lead a nadie: si no hay atributo,
 * el valor queda vacío y el envío sigue su curso igual.
 */
describe("intención de entrada (CTA)", () => {
  it("no registra nada antes del primer clic", () => {
    resetCtaOrigin();
    expect(getCtaOrigin()).toBeUndefined();
  });

  it("lee el CTA del elemento pulsado", () => {
    expect(readCtaOrigin(target("hero-analizar"))).toBe("hero-analizar");
  });

  it("devuelve undefined cuando el clic cae fuera de un CTA", () => {
    expect(readCtaOrigin(target())).toBeUndefined();
  });

  it("tolera objetivos que no son elementos", () => {
    expect(readCtaOrigin(null)).toBeUndefined();
    expect(readCtaOrigin(undefined)).toBeUndefined();
    expect(readCtaOrigin({})).toBeUndefined();
    expect(readCtaOrigin("texto")).toBeUndefined();
  });

  it("ignora un atributo vacío o en blanco", () => {
    expect(readCtaOrigin(target(""))).toBeUndefined();
    expect(readCtaOrigin(target("   "))).toBeUndefined();
  });

  it("acota la longitud al máximo del esquema", () => {
    expect(readCtaOrigin(target("x".repeat(200)))).toHaveLength(80);
  });
});
