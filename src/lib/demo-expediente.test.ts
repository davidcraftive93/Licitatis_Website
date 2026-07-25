import { describe, expect, it } from "vitest";
import {
  demoExpediente,
  demoCompany,
  demoProvenance,
  checklistFraction,
  daysLeftLabel,
  EXPEDIENTE_STATES,
} from "@/lib/demo-expediente";
import { features, featureLayers } from "@/lib/content";

/**
 * El caso de demostración es el hilo de toda la página. Estas pruebas cubren lo
 * que se rompió una vez: cifras del mismo expediente que no cuadraban entre
 * secciones porque estaban copiadas a mano en seis ficheros.
 */
describe("expediente de demostración", () => {
  it("expone una única métrica de avance, normalizada", () => {
    expect(demoExpediente.readiness).toBeGreaterThan(0);
    expect(demoExpediente.readiness).toBeLessThanOrEqual(100);
    expect(demoExpediente.fitScore).toBeLessThanOrEqual(100);
    expect(demoExpediente.aiConfidence).toBeLessThanOrEqual(100);
    expect(demoCompany.aptitude).toBeLessThanOrEqual(100);
  });

  it("deriva la fracción del checklist en vez de escribirla a mano", () => {
    const done = demoExpediente.checklist.filter((item) => item.done).length;
    expect(checklistFraction()).toBe(`${done}/${demoExpediente.checklist.length}`);
  });

  it("concuerda el bloqueante del expediente con una credencial caducada del Pasaporte", () => {
    // Si el Pasaporte no tuviera nada caducado, el bloqueante que recorre la
    // página no tendría de dónde salir y la narrativa mentiría.
    const caducadas = demoCompany.credentials.filter((c) => c.status === "caducado");
    expect(caducadas.length).toBeGreaterThan(0);
    expect(demoExpediente.blocker.label.toLowerCase()).toContain("aeat");
    expect(caducadas.some((c) => c.label.toLowerCase().includes("aeat"))).toBe(true);
  });

  it("mantiene el plazo coherente con el segundo riesgo", () => {
    // El segundo aviso dice que la firma caduca antes del cierre: si el plazo
    // fuese más corto que esos días, el aviso sería falso.
    expect(demoExpediente.daysLeft).toBeGreaterThan(4);
    expect(daysLeftLabel()).toBe(`${demoExpediente.daysLeft} días`);
  });

  it("etiqueta los estados del expediente sin duplicados", () => {
    expect(new Set(EXPEDIENTE_STATES).size).toBe(EXPEDIENTE_STATES.length);
  });

  it("corta la cadena de procedencia en una decisión humana y sin fuente", () => {
    const last = demoProvenance[demoProvenance.length - 1];
    expect(demoProvenance.map((s) => s.kind)).toEqual([
      "Hecho",
      "Inferencia",
      "Recomendación",
      "Decisión",
    ]);
    expect(last.source).toBe("");
  });
});

describe("anatomía del expediente", () => {
  it("asigna cada funcionalidad a una capa existente", () => {
    const ids = new Set(featureLayers.map((l) => l.id));
    for (const feature of features) {
      expect(ids.has(feature.layer), `${feature.title} sin capa válida`).toBe(true);
    }
  });

  it("no deja ninguna capa vacía ni pierde funcionalidades", () => {
    const grouped = featureLayers.map((l) => features.filter((f) => f.layer === l.id));
    grouped.forEach((items, i) => {
      expect(items.length, `capa ${featureLayers[i].id} vacía`).toBeGreaterThan(0);
    });
    // Las nueve siguen en la página: agrupar no puede esconder contenido.
    expect(grouped.reduce((total, items) => total + items.length, 0)).toBe(features.length);
    expect(features).toHaveLength(9);
  });
});
