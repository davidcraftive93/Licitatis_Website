/**
 * Intención de entrada: qué botón trajo a la persona hasta el formulario.
 *
 * Se resuelve con UN solo listener delegado en el documento que lee el atributo
 * `data-cta` del botón pulsado. Sin listeners por botón, sin cambiar ninguna
 * URL, sin almacenamiento en el navegador (no hace falta: la landing y el
 * formulario viven en la misma página) y sin pedir nada al usuario.
 *
 * El valor viaja después DENTRO del mensaje del lead. No se crea ninguna
 * propiedad nueva en HubSpot: una propiedad inexistente haría que HubSpot
 * rechazara el envío, y perder un lead por telemetría sería inaceptable.
 */

export const CTA_ORIGIN_ATTR = "data-cta";

/** Longitud máxima registrada (coincide con la del esquema Zod). */
const MAX_LENGTH = 80;

/** Lo mínimo que necesitamos del objetivo del clic. */
interface ClickTargetLike {
  closest(selector: string): { getAttribute(name: string): string | null } | null;
}

function isClickTargetLike(value: unknown): value is ClickTargetLike {
  // Duck typing en vez de `instanceof Element`: sobrevive a otros realms
  // (iframes) y es comprobable sin arrancar un DOM entero en las pruebas.
  return typeof (value as ClickTargetLike | null)?.closest === "function";
}

/** Extrae la intención del objetivo de un clic. Devuelve `undefined` si no hay. */
export function readCtaOrigin(target: unknown): string | undefined {
  if (!isClickTargetLike(target)) return undefined;
  const raw = target.closest(`[${CTA_ORIGIN_ATTR}]`)?.getAttribute(CTA_ORIGIN_ATTR);
  const value = raw?.trim();
  return value ? value.slice(0, MAX_LENGTH) : undefined;
}

/** Última intención registrada en esta visita. */
let lastOrigin: string | undefined;

/** Arranca la captura. Devuelve la función de limpieza. */
export function startCtaOriginCapture(): () => void {
  if (typeof document === "undefined") return () => {};

  const onClick = (event: Event) => {
    const origin = readCtaOrigin(event.target);
    // Un clic fuera de un CTA no borra el anterior: interesa por dónde entró.
    if (origin) lastOrigin = origin;
  };

  // En la fase de captura: así se registra aunque algo detenga la propagación.
  document.addEventListener("click", onClick, { capture: true, passive: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}

export function getCtaOrigin(): string | undefined {
  return lastOrigin;
}

/** Solo para pruebas: reinicia el estado del módulo. */
export function resetCtaOrigin(): void {
  lastOrigin = undefined;
}
