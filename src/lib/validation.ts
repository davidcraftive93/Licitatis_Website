import { z } from "zod";

/**
 * Esquema de validación del formulario de solicitud de demostración.
 * Se usa tanto en el cliente (feedback inmediato) como en el servidor (fuente de verdad).
 */
export const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Introduce tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  lastName: z
    .string()
    .trim()
    .min(2, "Introduce tus apellidos.")
    .max(120, "Los apellidos son demasiado largos."),
  email: z
    .string()
    .trim()
    .min(1, "Introduce tu correo corporativo.")
    .email("Introduce un correo válido.")
    .max(160, "El correo es demasiado largo."),
  company: z
    .string()
    .trim()
    .min(2, "Introduce el nombre de tu empresa.")
    .max(120, "El nombre de la empresa es demasiado largo."),
  jobTitle: z.string().trim().max(120, "El cargo es demasiado largo.").optional().default(""),
  phone: z.string().trim().max(40, "El teléfono es demasiado largo.").optional().default(""),
  tendersPerYear: z
    .enum(["1-5", "6-20", "21-50", "50+", "no-lo-se"])
    .optional()
    .default("no-lo-se"),
  challenge: z
    .enum([
      "dispersion-fuentes",
      "analisis-pliegos",
      "gestion-documental",
      "plazos",
      "coordinacion-equipo",
      "trazabilidad",
      "otra",
    ])
    .optional()
    .default("otra"),
  message: z.string().trim().max(2000, "El mensaje es demasiado largo.").optional().default(""),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad." }),
  }),
  // Campo trampa antispam: debe llegar vacío. Los bots suelen rellenarlo.
  company_url: z.string().max(0).optional().default(""),
  // Metadatos de atribución (se rellenan en cliente, no son obligatorios).
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(160).optional(),
      term: z.string().max(160).optional(),
      content: z.string().max(160).optional(),
    })
    .partial()
    .optional(),
  pageUri: z.string().max(500).optional(),
  hutk: z.string().max(120).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Opciones para los desplegables del formulario (etiquetas legibles). */
export const tendersPerYearOptions = [
  { value: "no-lo-se", label: "No lo sé todavía" },
  { value: "1-5", label: "Entre 1 y 5" },
  { value: "6-20", label: "Entre 6 y 20" },
  { value: "21-50", label: "Entre 21 y 50" },
  { value: "50+", label: "Más de 50" },
] as const;

export const challengeOptions = [
  { value: "dispersion-fuentes", label: "Licitaciones dispersas en muchas fuentes" },
  { value: "analisis-pliegos", label: "Revisión manual de pliegos y requisitos" },
  { value: "gestion-documental", label: "Documentación desorganizada o versiones incorrectas" },
  { value: "plazos", label: "Control de fechas límite" },
  { value: "coordinacion-equipo", label: "Coordinación de tareas y responsables" },
  { value: "trazabilidad", label: "Falta de trazabilidad y visibilidad" },
  { value: "otra", label: "Otra" },
] as const;
