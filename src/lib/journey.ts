/**
 * Geometría del viaje del expediente. Funciones PURAS, sin DOM: el componente
 * mide y escribe, aquí solo se calcula. Así el comportamiento que antes solo se
 * podía comprobar bajando con el ratón queda cubierto por pruebas.
 */

/** Fracción del viewport donde está la «línea de avance» del viaje. */
export const JOURNEY_LINE = 0.62;

/** Acota a [0, 1] y neutraliza NaN/Infinity: un valor sucio aquí rompe el trazo. */
export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Progreso del recorrido (0 = sin empezar, 1 = completo) según dónde está la
 * lista de pasos respecto a la línea de avance.
 *
 * `height <= 0` devuelve 0 en vez de dividir: pasa de verdad — la lista mide 0
 * antes del primer layout y en `display: none`, y `0/0` produce `NaN`, que como
 * `stroke-dashoffset` es un valor inválido y deja la ruta sin dibujar.
 */
export function journeyProgress(
  top: number,
  height: number,
  viewportHeight: number,
  line: number = JOURNEY_LINE,
): number {
  if (!(height > 0) || !Number.isFinite(top) || !Number.isFinite(viewportHeight)) return 0;
  return clamp01((viewportHeight * line - top) / height);
}

/**
 * Desplazamiento del trazo para un progreso dado: la longitud completa está
 * «sin recorrer» y 0 es la ruta entera dibujada.
 */
export function dashOffset(pathLength: number, progress: number): number {
  if (!Number.isFinite(pathLength) || pathLength <= 0) return 0;
  return pathLength * (1 - clamp01(progress));
}

/**
 * Escena activa entre los pasos que cruzan la banda central.
 *
 * Con la banda estrecha suele cruzar uno solo, pero en viewports altos o con
 * pasos cortos pueden cruzar dos. Antes ganaba el último que llegara en el lote
 * del observador —y el orden de ese lote no está garantizado—, así que el paso
 * activo podía retroceder al bajar. Se elige siempre el más avanzado, que es lo
 * que acompaña al progreso de la ruta.
 */
export function pickActiveStep(intersecting: readonly number[], current: number): number {
  if (!intersecting.length) return current;
  return intersecting.reduce((max, index) => (index > max ? index : max), intersecting[0]);
}
