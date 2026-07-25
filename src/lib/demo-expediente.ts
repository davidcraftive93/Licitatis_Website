import type { IconName } from "@/components/ui/icons";

/**
 * FUENTE ÚNICA del expediente de demostración que hila toda la página
 * («El Expediente Vivo»: del hero al CTA es siempre el mismo caso).
 *
 * Antes este caso estaba copiado a mano en seis ficheros y las cifras ya se
 * contradecían: el panel del hero mostraba 64 % de checklist, el paso 04 mostraba
 * 2/4 (50 %) y el paso 05 un índice de preparación del 74 %. Tres avances distintos
 * para el mismo expediente, en una web que presume de no inventar datos.
 *
 * DATOS FICTICIOS Y NEUTRALES. Se etiquetan siempre como demostración en la interfaz.
 * Todo importe/porcentaje que se muestre del caso debe salir de aquí.
 */

/** Estados por los que pasa el expediente a lo largo de la página. */
export const EXPEDIENTE_STATES = [
  "Pliego recibido",
  "Oportunidad detectada",
  "Pliego estructurado",
  "Elegibilidad contrastada",
  "Expediente organizado",
  "Riesgos detectados",
  "Oferta simulada",
  "Informe para dirección",
  "Candidatura preparada",
] as const;

export type ExpedienteState = (typeof EXPEDIENTE_STATES)[number];

export interface DemoCredential {
  label: string;
  status: "vigente" | "pronto" | "caducado";
  date: string;
}

/** El caso. Un solo objeto para toda la narrativa. */
export const demoExpediente = {
  /** Referencia visible del expediente. Es la firma del hilo narrativo. */
  code: "EXP-2024-0142",
  title: "Servicios de mantenimiento de instalaciones",
  /** Órgano de contratación (genérico: no se nombra a ninguna administración real). */
  body: "Administración local (ejemplo)",
  cpv: "50700000",
  amountLabel: "214.000 €",
  /** Días naturales que quedan para presentar. */
  daysLeft: 6,

  /**
   * ÚNICA métrica de avance del expediente. Antes había tres cifras distintas.
   * Se expone como «índice de preparación» porque es la métrica global del producto.
   */
  readiness: 74,

  /** Encaje con el Pasaporte de la empresa (matching explicable). */
  fitScore: 87,

  /** Checklist documental: el detalle del que sale la fracción mostrada. */
  checklist: [
    { label: "Declaración responsable (DEUC)", done: true },
    { label: "Acreditación de solvencia", done: true },
    { label: "Certificado AEAT", done: false },
    { label: "Memoria técnica", done: false },
  ],

  /** Confianza del análisis de IA (siempre con revisión humana). */
  aiConfidence: 78,
  /** Avance del borrador de memoria técnica. */
  memoriaProgress: 62,

  /**
   * El bloqueante que VIAJA por la página: sale del Pasaporte y reaparece como
   * riesgo en el escáner anti-exclusión. Es la continuidad que ya funcionaba.
   */
  blocker: {
    label: "Certificado AEAT no vigente",
    detail: "Motivo de exclusión directa. Detectado en tu Pasaporte; renuévalo antes de presentar.",
    icon: "alert-triangle" as IconName,
  },

  /** Segundo aviso del escáner, coherente con el plazo (caduca antes de presentar). */
  secondRisk: {
    label: "Firma electrónica del apoderado caduca en 4 días",
    detail: "Antes del fin del plazo de presentación.",
    icon: "key" as IconName,
  },
} as const;

/** Empresa licitadora del Pasaporte (la memoria permanente, no el caso). */
export const demoCompany = {
  name: "Constructora Ejemplo, S.L.",
  taxId: "CIF B-12345678",
  /** Índice de Aptitud para Licitar del Pasaporte (no del expediente). */
  aptitude: 82,
  completeness: 85,
  credentials: [
    { label: "ISO 9001", status: "vigente", date: "vence 11/2026" },
    { label: "ENS · Categoría básica", status: "vigente", date: "vence 03/2027" },
    { label: "Certificado AEAT", status: "caducado", date: "no vigente" },
    { label: "ROLECE · clasificación", status: "pronto", date: "vence en 18 días" },
  ] as DemoCredential[],
} as const;

/** Fracción del checklist («2/4»), derivada — nunca escrita a mano. */
export function checklistFraction(): string {
  const done = demoExpediente.checklist.filter((item) => item.done).length;
  return `${done}/${demoExpediente.checklist.length}`;
}

/** Etiqueta corta de plazo, coherente en toda la página. */
export function daysLeftLabel(): string {
  const days: number = demoExpediente.daysLeft;
  return days === 1 ? "1 día" : `${days} días`;
}
