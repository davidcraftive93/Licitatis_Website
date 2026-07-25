import { z } from "zod";

/**
 * Esquema de validación del formulario de solicitud de demostración.
 * Se usa tanto en el cliente (feedback inmediato) como en el servidor (fuente de verdad).
 */

/**
 * Texto de atribución: se acota recortando, nunca fallando.
 *
 * Estos valores no los escribe la persona (vienen de la URL, de una cookie o del
 * DOM), así que un valor demasiado largo no es un error que ella pueda corregir:
 * si lo rechazáramos, el formulario quedaría bloqueado sin nada que señalar.
 * El recorte conserva la garantía de no mandar cadenas absurdas a HubSpot.
 */
function attributionText(max: number) {
  return z
    .string()
    .trim()
    .transform((value) => value.slice(0, max) || undefined)
    .optional();
}
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
      "decidir-presentarse",
      "requisitos-solvencia",
      "documentacion",
      "memoria-tecnica",
      "plazos",
      "exclusion",
      "otra",
    ])
    .optional()
    .default("otra"),
  message: z.string().trim().max(2000, "El mensaje es demasiado largo.").optional().default(""),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad." }),
  }),
  // Consentimiento de marketing: OPCIONAL, no premarcado y no obligatorio para solicitar
  // la demostración. Se registra por separado del consentimiento de privacidad.
  marketing: z.boolean().optional().default(false),
  // Campo trampa antispam: debe llegar vacío. Los bots suelen rellenarlo.
  company_url: z.string().max(0).optional().default(""),
  /**
   * Metadatos de atribución. Los rellena el cliente leyendo la URL, las cookies
   * y el DOM: la persona que rellena el formulario NO puede corregirlos.
   *
   * Por eso se RECORTAN en vez de rechazarse. Con un `.max()` que falla, un
   * enlace de campaña con una `utm_campaign` larguísima invalidaba el formulario
   * por un campo sin interfaz: el aviso decía «revisa los campos marcados», no
   * había ninguno marcado, y no existía forma de enviar. El lead se perdía en
   * silencio, que es justo lo que este formulario no puede hacer.
   */
  utm: z
    .object({
      source: attributionText(120),
      medium: attributionText(120),
      campaign: attributionText(160),
      term: attributionText(160),
      content: attributionText(160),
    })
    .partial()
    .optional(),
  pageUri: attributionText(500),
  hutk: attributionText(120),
  /**
   * Qué botón trajo a la persona hasta el formulario. Se recoge del propio DOM
   * (atributo `data-cta`), nunca de la URL, y viaja dentro del mensaje: no crea
   * ninguna propiedad nueva en HubSpot, así que no puede tumbar un envío.
   */
  ctaOrigin: attributionText(80),
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
  { value: "decidir-presentarse", label: "Decidir con criterio si presentarnos" },
  { value: "requisitos-solvencia", label: "Descubrir tarde un requisito de solvencia" },
  { value: "documentacion", label: "Certificados o firmas que faltan o caducan" },
  { value: "memoria-tecnica", label: "Redactar memorias técnicas contra reloj" },
  { value: "plazos", label: "Controlar plazos y no perder oportunidades" },
  { value: "exclusion", label: "Evitar la exclusión por fallos administrativos" },
  { value: "otra", label: "Otra" },
] as const;
