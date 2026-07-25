import { describe, expect, it } from "vitest";
import { clamp01, journeyProgress, dashOffset, pickActiveStep, JOURNEY_LINE } from "@/lib/journey";

describe("normalización del progreso", () => {
  it("acota a [0, 1]", () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(0)).toBe(0);
    expect(clamp01(0.5)).toBe(0.5);
    expect(clamp01(1)).toBe(1);
    expect(clamp01(42)).toBe(1);
  });

  it("neutraliza valores no finitos en vez de propagarlos", () => {
    // Un NaN aquí llega a `stroke-dashoffset`, que lo descarta como valor
    // inválido: la ruta se quedaría sin dibujar sin ningún error visible.
    expect(clamp01(NaN)).toBe(0);
    expect(clamp01(Infinity)).toBe(0);
    expect(clamp01(-Infinity)).toBe(0);
  });

  it("progresa de 0 a 1 conforme la lista sube por el viewport", () => {
    const height = 1000;
    const vh = 1000;
    const line = vh * JOURNEY_LINE; // 620

    expect(journeyProgress(line, height, vh)).toBe(0); // la lista empieza justo en la línea
    expect(journeyProgress(line - 500, height, vh)).toBeCloseTo(0.5, 5);
    expect(journeyProgress(line - height, height, vh)).toBe(1);
  });

  it("devuelve 0 antes de entrar y 1 una vez pasada del todo", () => {
    expect(journeyProgress(5000, 800, 900)).toBe(0);
    expect(journeyProgress(-5000, 800, 900)).toBe(1);
  });

  it("no divide por cero cuando la lista aún no tiene alto", () => {
    // Ocurre antes del primer layout y con `display: none`.
    expect(journeyProgress(0, 0, 900)).toBe(0);
    expect(journeyProgress(-100, 0, 900)).toBe(0);
    expect(journeyProgress(100, -50, 900)).toBe(0);
  });

  it("tolera medidas corruptas", () => {
    expect(journeyProgress(NaN, 800, 900)).toBe(0);
    expect(journeyProgress(100, 800, NaN)).toBe(0);
  });
});

describe("desplazamiento del trazo", () => {
  it("sin recorrer es la longitud completa y completo es 0", () => {
    expect(dashOffset(1000, 0)).toBe(1000);
    expect(dashOffset(1000, 1)).toBe(0);
    expect(dashOffset(1000, 0.25)).toBe(750);
  });

  it("acota el progreso recibido", () => {
    expect(dashOffset(1000, -1)).toBe(1000);
    expect(dashOffset(1000, 5)).toBe(0);
    expect(dashOffset(1000, NaN)).toBe(1000);
  });

  it("con longitud aún sin medir no produce basura", () => {
    // `getTotalLength()` no se ha llamado todavía: 0 en vez de NaN.
    expect(dashOffset(0, 0.5)).toBe(0);
    expect(dashOffset(NaN, 0.5)).toBe(0);
  });

  it("fallback de reduced-motion: progreso 1 deja la ruta dibujada entera", () => {
    // Con `prefers-reduced-motion` el componente no registra listeners y la ruta
    // nace con offset 0, que es exactamente esto.
    expect(dashOffset(2174.92, 1)).toBe(0);
  });
});

describe("selección de escena", () => {
  it("mantiene la actual si ningún paso cruza la banda", () => {
    expect(pickActiveStep([], 3)).toBe(3);
  });

  it("activa el único paso que cruza", () => {
    expect(pickActiveStep([2], 0)).toBe(2);
  });

  it("con dos pasos en la banda gana el más avanzado, sea cual sea el orden recibido", () => {
    // El orden del lote del IntersectionObserver no está garantizado: el
    // resultado no puede depender de él o el paso activo retrocede al bajar.
    expect(pickActiveStep([2, 3], 2)).toBe(3);
    expect(pickActiveStep([3, 2], 2)).toBe(3);
    expect(pickActiveStep([1, 5, 4], 1)).toBe(5);
  });
});
