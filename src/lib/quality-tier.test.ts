import { describe, expect, it } from "vitest";
import {
  resolveQualityTier,
  animatesContinuously,
  particleBudget,
  type QualitySignals,
} from "@/lib/quality-tier";

/** Equipo de escritorio holgado: el caso «enhanced». */
const potente: QualitySignals = {
  reducedMotion: false,
  finePointer: true,
  saveData: false,
  cores: 12,
};

describe("niveles de calidad", () => {
  it("equipo holgado con ratón: enhanced", () => {
    expect(resolveQualityTier(potente)).toBe("enhanced");
  });

  it("pocos núcleos: standard (sigue animando, con menos nodos)", () => {
    expect(resolveQualityTier({ ...potente, cores: 4 })).toBe("standard");
    expect(resolveQualityTier({ ...potente, cores: 2 })).toBe("standard");
  });

  it("reduced-motion manda por encima de todo lo demás", () => {
    expect(resolveQualityTier({ ...potente, reducedMotion: true })).toBe("low");
    expect(resolveQualityTier({ ...potente, reducedMotion: true, cores: 32 })).toBe("low");
  });

  it("táctil (sin puntero fino): low", () => {
    // No hay puntero al que responder, así que el bucle no aporta nada.
    expect(resolveQualityTier({ ...potente, finePointer: false })).toBe("low");
  });

  it("ahorro de datos: low", () => {
    expect(resolveQualityTier({ ...potente, saveData: true })).toBe("low");
  });

  it("poca memoria declarada: low", () => {
    expect(resolveQualityTier({ ...potente, deviceMemory: 2 })).toBe("low");
    expect(resolveQualityTier({ ...potente, deviceMemory: 0.5 })).toBe("low");
  });

  it("memoria holgada o no declarada no degrada", () => {
    expect(resolveQualityTier({ ...potente, deviceMemory: 8 })).toBe("enhanced");
    expect(resolveQualityTier({ ...potente, deviceMemory: undefined })).toBe("enhanced");
  });

  it("solo low renuncia al bucle continuo", () => {
    expect(animatesContinuously("low")).toBe(false);
    expect(animatesContinuously("standard")).toBe(true);
    expect(animatesContinuously("enhanced")).toBe(true);
  });
});

describe("presupuesto de nodos", () => {
  it("recorta con ahorro de datos y con pocos núcleos", () => {
    expect(particleBudget({ saveData: true, cores: 16 })).toBe(18);
    expect(particleBudget({ saveData: false, cores: 4 })).toBe(32);
    expect(particleBudget({ saveData: false, cores: 16 })).toBe(55);
  });

  it("el ahorro de datos pesa más que los núcleos", () => {
    expect(particleBudget({ saveData: true, cores: 2 })).toBe(18);
  });

  it("en low también hay nodos: se dibuja un fotograma estático", () => {
    // El nivel decide si hay BUCLE, no si hay composición: quitar los nodos
    // cambiaría lo que se ve, y el contenido debe ser idéntico entre niveles.
    const tactil: QualitySignals = { ...potente, finePointer: false };
    expect(resolveQualityTier(tactil)).toBe("low");
    expect(particleBudget(tactil)).toBeGreaterThan(0);
  });
});
