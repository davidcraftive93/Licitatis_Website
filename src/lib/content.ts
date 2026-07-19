import type { IconName } from "@/components/ui/icons";

/**
 * Contenido estructurado de la landing (rediseño comercial).
 * Español de España, tono comercial y directo, sin exageraciones ni datos inventados.
 * - Funciones no confirmadas como operativas -> status "soon" ("Próximamente").
 * - Prueba social (logos, testimonios, cifras) -> PLACEHOLDERS marcados, a rellenar.
 */

/* ---------------------------------------------------------------- Banda de valor */
export interface ValueStat {
  value: string;
  label: string;
}
/** Cifras cualitativas y honestas (no son métricas de clientes inventadas). */
export const valueStats: ValueStat[] = [
  { value: "1", label: "único panel para todas tus candidaturas" },
  { value: "IA", label: "que resume pliegos y detecta requisitos" },
  { value: "0", label: "plazos que dependan de la memoria" },
  { value: "100%", label: "trazabilidad de quién hace qué y cuándo" },
];

/* --------------------------------------------------------------- Logos (placeholder) */
/** PLACEHOLDER: sustituir por logos reales de clientes cuando se disponga de ellos. */
export const clientLogosPlaceholder: string[] = [
  "Tu logo",
  "Cliente",
  "Empresa",
  "Consultora",
  "Constructora",
  "Ingeniería",
];

/* ---------------------------------------------------------------------- Problema */
export interface ProblemPoint {
  icon: IconName;
  title: string;
  text: string;
}
export const problemPoints: ProblemPoint[] = [
  {
    icon: "inbox",
    title: "Oportunidades dispersas",
    text: "Licitaciones repartidas entre portales, correos y avisos que alguien revisa a mano.",
  },
  {
    icon: "document-search",
    title: "Pliegos leídos a mano",
    text: "Cada pliego se relee para localizar requisitos, criterios y documentación exigida.",
  },
  {
    icon: "layers",
    title: "Documentos sin control",
    text: "Carpetas, adjuntos duplicados y dudas sobre cuál es la versión buena.",
  },
  {
    icon: "clock",
    title: "Plazos al límite",
    text: "Fechas de presentación que dependen de que nadie se despiste con un recordatorio.",
  },
  {
    icon: "users",
    title: "Equipo descoordinado",
    text: "Reparto de tareas por correo y mensajes, sin una visión común de quién hace qué.",
  },
  {
    icon: "alert-triangle",
    title: "Riesgo de exclusión",
    text: "Un anexo que falta o un requisito formal olvidado puede dejar fuera la candidatura.",
  },
];

/* --------------------------------------------------------------------- Pipeline */
export interface PipelineStep {
  label: string;
  description: string;
}
export const pipelineSteps: PipelineStep[] = [
  { label: "Oportunidad", description: "Incorporas la licitación al panel." },
  { label: "Análisis IA", description: "La IA estructura el pliego." },
  { label: "Requisitos", description: "Se identifican requisitos y criterios." },
  { label: "Documentos", description: "Checklist de lo que falta y lo que ya está." },
  { label: "Tareas", description: "Se generan y asignan las tareas." },
  { label: "Responsables", description: "Cada tarea tiene una persona." },
  { label: "Plazos", description: "Fechas y avisos bajo control." },
  { label: "Revisión", description: "Comprobación final antes de presentar." },
  { label: "Presentación", description: "Candidatura lista y trazable." },
];

/* ---------------------------------------------------------- Spotlights (funciones) */
export type FeatureStatus = "available" | "soon";
export type SpotlightVisual = "dashboard" | "requirements" | "timeline" | "metrics";

export interface Spotlight {
  eyebrow: string;
  ai: boolean;
  status: FeatureStatus;
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  visual: SpotlightVisual;
}

export const spotlights: Spotlight[] = [
  {
    eyebrow: "Análisis de pliegos",
    ai: true,
    status: "available",
    icon: "document-search",
    title: "La IA lee el pliego por ti y te deja lo importante",
    description:
      "Convierte cada pliego en información accionable: objeto, criterios de adjudicación, requisitos de solvencia y documentación exigida, estructurados de un vistazo.",
    bullets: [
      "Resumen del pliego con una estructura siempre igual.",
      "Requisitos y criterios de adjudicación identificados.",
      "Menos horas releyendo, más tiempo para decidir y preparar.",
    ],
    visual: "requirements",
  },
  {
    eyebrow: "Documentación",
    ai: true,
    status: "soon",
    icon: "checklist",
    title: "Checklist documental y generación asistida",
    description:
      "Una lista clara de todo lo que exige cada licitación, con estado y responsable. La generación asistida te ayuda a redactar apartados a partir de la información de tu empresa.",
    bullets: [
      "Sabes en todo momento qué documento falta antes de presentar.",
      "Repositorio con control de versiones: siempre el archivo correcto.",
      "Generación asistida de contenidos a partir de tus datos.",
    ],
    visual: "dashboard",
  },
  {
    eyebrow: "Coordinación y control",
    ai: false,
    status: "available",
    icon: "users",
    title: "Tu equipo coordinado, cada plazo bajo control",
    description:
      "Aquí está la diferencia: LICITATIS no es solo un buscador. Genera tareas, asigna responsables y controla los plazos, con trazabilidad de cada acción y visibilidad para dirección.",
    bullets: [
      "Tareas y responsables por candidatura, sin correos sueltos.",
      "Calendario y avisos para que ningún plazo dependa de la memoria.",
      "Trazabilidad completa: quién hizo qué y cuándo.",
    ],
    visual: "timeline",
  },
  {
    eyebrow: "Decisión",
    ai: true,
    status: "soon",
    icon: "trending-up",
    title: "Decide a qué presentarte con datos",
    description:
      "Evaluación de oportunidades y panel de métricas para orientar la estrategia: a qué licitaciones conviene presentarse y cómo va el rendimiento de tus candidaturas.",
    bullets: [
      "Apoyo para decidir a qué merece la pena presentarse.",
      "Indicadores de actividad, plazos y resultados.",
      "Visión directiva sin pedir informes a mano.",
    ],
    visual: "metrics",
  },
];

/* ------------------------------------------------------------------- Ventajas */
export interface Benefit {
  icon: IconName;
  title: string;
  text: string;
}
export const benefits: Benefit[] = [
  {
    icon: "zap",
    title: "Menos trabajo manual",
    text: "La IA hace lo repetitivo: leer pliegos, extraer requisitos y preparar checklists.",
  },
  {
    icon: "shield",
    title: "Menor riesgo de exclusión",
    text: "Checklists y revisión estructurada para que no se escape ningún requisito formal.",
  },
  {
    icon: "clock",
    title: "Todo en plazo",
    text: "Calendario y avisos por candidatura: se acabó depender de recordatorios sueltos.",
  },
  {
    icon: "eye",
    title: "Visibilidad total",
    text: "El estado de cada candidatura, siempre visible, sin reuniones para saber cómo va.",
  },
];

/* --------------------------------------------------------------- Funcionalidades */
export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  status: FeatureStatus;
}
export const features: Feature[] = [
  {
    icon: "dashboard",
    title: "Panel central de licitaciones",
    text: "Todas tus candidaturas y su estado en un único lugar.",
    status: "available",
  },
  {
    icon: "document-search",
    title: "Análisis de pliegos con IA",
    text: "Objeto, criterios, requisitos y documentación, estructurados.",
    status: "available",
  },
  {
    icon: "checklist",
    title: "Checklist documental",
    text: "Lo que exige cada licitación y lo que ya tienes preparado.",
    status: "available",
  },
  {
    icon: "tasks",
    title: "Tareas y responsables",
    text: "Genera tareas y reparte el trabajo con claridad.",
    status: "available",
  },
  {
    icon: "calendar",
    title: "Plazos y calendario",
    text: "Fechas, hitos y avisos para no depender de la memoria.",
    status: "available",
  },
  {
    icon: "layers",
    title: "Repositorio con versiones",
    text: "Un único sitio para trabajar sobre el documento correcto.",
    status: "available",
  },
  {
    icon: "bell",
    title: "Alertas y seguimiento",
    text: "Sigue el avance y recibe avisos de lo que requiere atención.",
    status: "available",
  },
  {
    icon: "users",
    title: "Colaboración y trazabilidad",
    text: "Equipo coordinado y registro de cada acción.",
    status: "available",
  },
  {
    icon: "history",
    title: "Histórico de candidaturas",
    text: "Consulta lo anterior y reutiliza lo que funcionó.",
    status: "available",
  },
  {
    icon: "scale",
    title: "Evaluación de oportunidades",
    text: "Apoyo para decidir a qué presentarse.",
    status: "soon",
  },
  {
    icon: "sparkles",
    title: "Generación asistida",
    text: "Ayuda para redactar apartados de la candidatura.",
    status: "soon",
  },
  {
    icon: "chart",
    title: "Panel de métricas",
    text: "Indicadores de actividad, plazos y resultados.",
    status: "soon",
  },
];

/* -------------------------------------------------------------- Cómo funciona */
export interface HowItWorksStep {
  number: string;
  icon: IconName;
  title: string;
  text: string;
}
export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    icon: "inbox",
    title: "Incorpora la licitación",
    text: "Añade la oportunidad y ten toda su información reunida desde el minuto uno.",
  },
  {
    number: "02",
    icon: "document-search",
    title: "La IA analiza el pliego",
    text: "Requisitos, criterios y documentación estructurados automáticamente.",
  },
  {
    number: "03",
    icon: "users",
    title: "Coordina tareas y plazos",
    text: "Reparte el trabajo, asigna responsables y controla las fechas desde un mismo sitio.",
  },
  {
    number: "04",
    icon: "shield",
    title: "Revisa y presenta",
    text: "Comprobación final con trazabilidad completa y presenta con más seguridad.",
  },
];

/* -------------------------------------------------------------------- Para quién */
export interface Audience {
  icon: IconName;
  title: string;
  text: string;
}
export const audiences: Audience[] = [
  {
    icon: "target",
    title: "Empresas que licitan de forma ocasional",
    text: "Profesionaliza cada candidatura sin montar un proceso complejo desde cero.",
  },
  {
    icon: "dashboard",
    title: "Equipos con muchas candidaturas",
    text: "Gestiona volumen sin perder el control de plazos, documentos ni responsables.",
  },
  {
    icon: "briefcase",
    title: "Consultoras que licitan para clientes",
    text: "Prepara candidaturas de varios clientes con orden, trazabilidad y coordinación.",
  },
  {
    icon: "activity",
    title: "Responsables comerciales",
    text: "Decide con criterio a qué presentarse y no dejes escapar oportunidades.",
  },
  {
    icon: "checklist",
    title: "Responsables técnicos",
    text: "Asegura que cada requisito y anexo está cubierto antes de presentar.",
  },
  {
    icon: "eye",
    title: "Dirección",
    text: "Ten visibilidad del estado de las candidaturas sin pedir informes manuales.",
  },
];

export const sectors: string[] = [
  "Consultoras",
  "Ingenierías",
  "Constructoras",
  "Empresas de servicios",
  "Empresas tecnológicas",
  "Despachos",
  "Proveedores de AAPP",
];

/* -------------------------------------------------------------------- Comparativa */
export interface ComparisonRow {
  dimension: string;
  traditional: string;
  licitatis: string;
}
export const comparisonRows: ComparisonRow[] = [
  { dimension: "Información", traditional: "Dispersa en portales, correos y carpetas.", licitatis: "Centralizada por candidatura." },
  { dimension: "Pliegos", traditional: "Se releen a mano cada vez.", licitatis: "Analizados con IA en una estructura clara." },
  { dimension: "Tareas", traditional: "Repartidas por correo y chat.", licitatis: "Generadas y asignadas con estado." },
  { dimension: "Documentación", traditional: "Versiones duplicadas y dudas.", licitatis: "Repositorio con control de versiones." },
  { dimension: "Plazos", traditional: "Dependen de recordatorios.", licitatis: "Calendario y avisos por candidatura." },
  { dimension: "Seguimiento", traditional: "Reuniones y correos para saber el estado.", licitatis: "Estado siempre visible." },
  { dimension: "Trazabilidad", traditional: "Difícil reconstruir qué se hizo.", licitatis: "Registro de acciones y cambios." },
  { dimension: "Riesgo", traditional: "Errores formales que excluyen.", licitatis: "Checklists y revisión estructurada." },
];

/* ------------------------------------------------------------------------ Planes */
export interface Plan {
  name: string;
  tagline: string;
  audience: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
/** Planes por perfil SIN importes: el precio se comunica en la demostración. */
export const plans: Plan[] = [
  {
    name: "Inicia",
    tagline: "Para empezar a profesionalizar tus candidaturas.",
    audience: "Empresas que se presentan de forma ocasional.",
    features: [
      "Panel central de licitaciones",
      "Análisis de pliegos con IA",
      "Checklist documental",
      "Plazos y calendario",
    ],
    cta: "Solicitar demostración",
    highlighted: false,
  },
  {
    name: "Profesional",
    tagline: "El proceso completo para equipos que licitan a menudo.",
    audience: "Equipos que gestionan muchas candidaturas.",
    features: [
      "Todo lo de Inicia",
      "Tareas, responsables y colaboración",
      "Repositorio con control de versiones",
      "Alertas y seguimiento del estado",
      "Histórico de candidaturas",
    ],
    cta: "Solicitar demostración",
    highlighted: true,
  },
  {
    name: "Empresa",
    tagline: "A medida para consultoras y grandes volúmenes.",
    audience: "Consultoras y organizaciones con necesidades avanzadas.",
    features: [
      "Todo lo de Profesional",
      "Panel de métricas e indicadores",
      "Evaluación de oportunidades",
      "Configuración y soporte a medida",
    ],
    cta: "Hablar con el equipo",
    highlighted: false,
  },
];

/* --------------------------------------------------------------------- Seguridad */
export interface SecurityPoint {
  icon: IconName;
  title: string;
  text: string;
}
export const securityPoints: SecurityPoint[] = [
  {
    icon: "route",
    title: "Web y aplicación separadas",
    text: "Esta web comercial y la aplicación privada son proyectos independientes, sin credenciales compartidas.",
  },
  {
    icon: "lock",
    title: "Acceso autenticado",
    text: "El acceso a la plataforma requiere autenticación; esta web pública no expone datos internos.",
  },
  {
    icon: "key",
    title: "Mínimo privilegio",
    text: "Cada persona accede solo a lo que necesita para su trabajo.",
  },
  {
    icon: "shield",
    title: "Protección de la información",
    text: "Tratamos la información con controles de acceso y buenas prácticas de seguridad.",
  },
  {
    icon: "backup",
    title: "Copias de seguridad",
    text: "Los datos de la aplicación cuentan con copias de seguridad para su recuperación.",
  },
  {
    icon: "check",
    title: "Cumplimiento como objetivo",
    text: "Trabajamos con el cumplimiento normativo como objetivo permanente del producto.",
  },
];

/* ----------------------------------------------------------- Testimonios (placeholder) */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}
/** PLACEHOLDER: sustituir por testimonios reales antes de publicar. */
export const testimonialsPlaceholder: Testimonial[] = [
  {
    quote:
      "[Testimonio pendiente] Espacio reservado para la valoración de un cliente real sobre cómo LICITATIS le ayuda a preparar y controlar sus licitaciones.",
    author: "[Nombre y apellidos]",
    role: "[Cargo] · [Empresa]",
    initials: "··",
  },
  {
    quote:
      "[Testimonio pendiente] Aquí irá una cita real destacando el ahorro de tiempo y la reducción de errores en la preparación de candidaturas.",
    author: "[Nombre y apellidos]",
    role: "[Cargo] · [Empresa]",
    initials: "··",
  },
  {
    quote:
      "[Testimonio pendiente] Reservado para una consultora que gestiona candidaturas de varios clientes con LICITATIS.",
    author: "[Nombre y apellidos]",
    role: "[Cargo] · [Consultora]",
    initials: "··",
  },
];

/* ------------------------------------------------------------------------- FAQ */
export interface Faq {
  question: string;
  answer: string;
}
export const faqs: Faq[] = [
  {
    question: "¿Qué es LICITATIS?",
    answer:
      "Una plataforma con IA para preparar, organizar, controlar y presentar candidaturas a licitaciones. Actúa como un copiloto que convierte pliegos, requisitos, documentos, tareas y plazos en un proceso claro y coordinado.",
  },
  {
    question: "¿Es un buscador de licitaciones?",
    answer:
      "No principalmente. La detección de oportunidades puede formar parte del producto, pero el foco de LICITATIS está en la preparación, la coordinación y el control de las candidaturas, no en ser un simple buscador.",
  },
  {
    question: "¿La IA analiza los pliegos de verdad?",
    answer:
      "Sí: ayuda a estructurar el pliego para identificar objeto, criterios de adjudicación, requisitos y documentación exigida, de forma que el equipo trabaje sobre información organizada en lugar de releer cada documento a mano.",
  },
  {
    question: "¿Qué tipo de empresas pueden usarlo?",
    answer:
      "Desde empresas que se presentan de forma ocasional hasta equipos que gestionan muchas candidaturas: consultoras, ingenierías, constructoras, empresas de servicios y tecnológicas, despachos y proveedores de administraciones públicas.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Ofrecemos planes por perfil (Inicia, Profesional y Empresa). Las condiciones y el precio se comunican durante la demostración, adaptándolos a tu caso y volumen de candidaturas.",
  },
  {
    question: "¿Cómo se gestiona una demostración?",
    answer:
      "Rellenas el formulario de solicitud y el equipo de LICITATIS se pone en contacto contigo para enseñarte la plataforma, adaptarla a tu caso y resolver tus dudas, sin compromiso.",
  },
  {
    question: "¿Cómo se protegen mis datos?",
    answer:
      "La web pública y la aplicación privada son proyectos separados. El acceso a la aplicación es autenticado, se aplica el principio de mínimo privilegio, hay control de acceso y copias de seguridad, y trabajamos con el cumplimiento normativo como objetivo.",
  },
  {
    question: "¿Sustituye al criterio profesional?",
    answer:
      "No. LICITATIS mejora la organización, el control y la trazabilidad del proceso, pero las decisiones y la responsabilidad sobre cada candidatura siguen siendo del equipo. No garantiza adjudicaciones.",
  },
];
