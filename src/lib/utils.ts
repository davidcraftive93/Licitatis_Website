/** Utilidades compartidas y sin dependencias externas. */

export type ClassValue = string | number | null | false | undefined;

/** Une clases condicionales descartando valores falsy. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Año del copyright del footer. Como las páginas son estáticas, se evalúa en el
 * momento del build; se actualizará en el siguiente despliegue tras el cambio de año.
 */
export function currentYear(): number {
  return new Date().getFullYear();
}
