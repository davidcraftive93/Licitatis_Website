/**
 * Niveles de calidad del movimiento (`docs/EXPEDIENTE-VIVO-MOTION-SYSTEM.md` §4).
 *
 * REGLA DURA: el nivel afecta al MOVIMIENTO, nunca a la información. El contenido
 * es idéntico en los tres niveles; lo único que cambia es cuánto se mueve.
 *
 * Señales permitidas: `prefers-reduced-motion`, `pointer: fine`, `saveData`,
 * `deviceMemory` y `hardwareConcurrency`. Nunca el user-agent.
 *
 * Puro y sin DOM a propósito: la decisión se puede probar sin navegador.
 */

export type QualityTier = "low" | "standard" | "enhanced";

export interface QualitySignals {
  /** `prefers-reduced-motion: reduce`. */
  reducedMotion: boolean;
  /** `pointer: fine` — ratón o trackpad. */
  finePointer: boolean;
  /** `navigator.connection.saveData`. */
  saveData: boolean;
  /** `navigator.hardwareConcurrency`. */
  cores: number;
  /** `navigator.deviceMemory` en GB, si el navegador lo expone. */
  deviceMemory?: number;
}

/** Núcleos por debajo de los cuales se recorta el número de nodos. */
const MODEST_CORES = 4;
/** GB de memoria por debajo de los cuales no se anima en bucle. */
const MODEST_MEMORY_GB = 2;

/**
 * `low` cuando animar en bucle no aporta o molesta: el usuario pide menos
 * movimiento, no hay puntero fino (táctil, donde además no hay hover que seguir),
 * el navegador pide ahorrar datos o el equipo declara poca memoria.
 */
export function resolveQualityTier(signals: QualitySignals): QualityTier {
  const { reducedMotion, finePointer, saveData, cores, deviceMemory } = signals;
  if (reducedMotion || saveData || !finePointer) return "low";
  if (deviceMemory !== undefined && deviceMemory <= MODEST_MEMORY_GB) return "low";
  return cores <= MODEST_CORES ? "standard" : "enhanced";
}

/** Si el nivel admite un bucle de animación continuo. */
export function animatesContinuously(tier: QualityTier): boolean {
  return tier !== "low";
}

/**
 * Techo de nodos de la constelación. Se decide con las señales y no con el
 * nivel: incluso en `low` se dibuja un fotograma, y ese fotograma debe pesar
 * poco en un equipo modesto.
 */
export function particleBudget(signals: Pick<QualitySignals, "saveData" | "cores">): number {
  if (signals.saveData) return 18;
  return signals.cores <= MODEST_CORES ? 32 : 55;
}

/** Lee las señales del navegador. Devuelve valores neutros fuera de él. */
export function readQualitySignals(overrides: {
  reducedMotion: boolean;
  finePointer: boolean;
}): QualitySignals {
  if (typeof navigator === "undefined") {
    return { ...overrides, saveData: false, cores: 4 };
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  return {
    ...overrides,
    saveData: nav.connection?.saveData === true,
    cores: nav.hardwareConcurrency || 4,
    deviceMemory: nav.deviceMemory,
  };
}
