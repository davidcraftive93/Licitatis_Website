import type { IconName } from "@/components/ui/icons";

/**
 * Contenido estructurado de la landing.
 * Copy en español de España, tono comercial, claro y sin exageraciones.
 * Las funcionalidades no confirmadas como operativas se marcan con status "soon".
 */

export interface ProblemPoint {
  icon: IconName;
  title: string;
  text: string;
}

export const problemPoints: ProblemPoint[] = [
  {
    icon: "inbox",
    title: "Oportunidades dispersas",
    text: "Licitaciones repartidas entre portales, correos y avisos que alguien tiene que revisar a mano.",
  },
  {
    icon: "document-search",
    title: "Pliegos revisados a mano",
    text: "Cada pliego se lee de nuevo para localizar requisitos, criterios y documentación exigida.",
  },
  {
    icon: "layers",
    title: "Documentos sin control de versiones",
    text: "Carpetas compartidas, adjuntos duplicados y dudas sobre cuál es la versión buena.",
  },
  {
    icon: "clock",
    title: "Plazos críticos al límite",
    text: "Fechas de presentación que dependen de que nadie se despiste con un recordatorio.",
  },
  {
    icon: "users",
    title: "Tareas y responsables difusos",
    text: "Reparto de trabajo por correo y mensajes, sin una visión común de quién hace qué.",
  },
  {
    icon: "alert-triangle",
    title: "Riesgo de exclusión por un detalle",
    text: "Un anexo que falta o un requisito formal que se pasa por alto puede dejar fuera la candidatura.",
  },
];

export interface PipelineStep {
  label: string;
  description: string;
}

export const pipelineSteps: PipelineStep[] = [
  { label: "Oportunidad", description: "Incorporas la licitación al panel." },
  { label: "Análisis", description: "Se estructura el pliego en información accionable." },
  { label: "Requisitos", description: "Se identifican requisitos y criterios." },
  { label: "Documentos", description: "Checklist documental con lo que falta y lo que ya está." },
  { label: "Tareas", description: "Se generan las tareas necesarias." },
  { label: "Responsables", description: "Cada tarea tiene una persona asignada." },
  { label: "Plazos", description: "Fechas y avisos bajo control." },
  { label: "Revisión", description: "Comprobación final antes de presentar." },
  { label: "Presentación", description: "Candidatura lista, con trazabilidad completa." },
];

export type FeatureStatus = "available" | "soon";

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
    text: "Todas tus candidaturas y su estado en un único lugar, sin saltar entre herramientas.",
    status: "available",
  },
  {
    icon: "document-search",
    title: "Análisis estructurado de pliegos",
    text: "Convierte el pliego en información organizada: objeto, criterios, requisitos y documentación.",
    status: "available",
  },
  {
    icon: "checklist",
    title: "Requisitos y checklist documental",
    text: "Lista clara de lo que exige cada licitación y control de lo que ya tienes preparado.",
    status: "available",
  },
  {
    icon: "tasks",
    title: "Tareas y asignación de responsables",
    text: "Genera tareas a partir de cada candidatura y reparte el trabajo con claridad.",
    status: "available",
  },
  {
    icon: "calendar",
    title: "Control de plazos y calendario",
    text: "Fechas de presentación, hitos y avisos para que ningún plazo dependa de la memoria.",
    status: "available",
  },
  {
    icon: "layers",
    title: "Repositorio documental con versiones",
    text: "Un único repositorio con control de versiones para trabajar siempre sobre el documento correcto.",
    status: "available",
  },
  {
    icon: "bell",
    title: "Alertas y seguimiento de estado",
    text: "Sigue el avance de cada candidatura y recibe avisos de lo que requiere atención.",
    status: "available",
  },
  {
    icon: "users",
    title: "Colaboración y trazabilidad",
    text: "El equipo trabaja coordinado y queda registro de quién hizo qué y cuándo.",
    status: "available",
  },
  {
    icon: "history",
    title: "Histórico de candidaturas",
    text: "Consulta candidaturas anteriores y reutiliza lo que ya funcionó.",
    status: "available",
  },
  {
    icon: "scale",
    title: "Evaluación de oportunidades",
    text: "Apoyo para decidir a qué licitaciones conviene presentarse.",
    status: "soon",
  },
  {
    icon: "sparkles",
    title: "Generación asistida de contenidos",
    text: "Ayuda para redactar apartados de la candidatura a partir de tu información.",
    status: "soon",
  },
  {
    icon: "chart",
    title: "Panel de métricas e indicadores",
    text: "Indicadores de actividad, plazos y resultados para la toma de decisiones.",
    status: "soon",
  },
];

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
    text: "Añade la oportunidad al panel y ten toda su información reunida desde el primer momento.",
  },
  {
    number: "02",
    icon: "checklist",
    title: "Estructura requisitos y documentación",
    text: "Organiza el pliego en requisitos y en un checklist documental claro y accionable.",
  },
  {
    number: "03",
    icon: "users",
    title: "Coordina tareas, responsables y fechas",
    text: "Reparte el trabajo, asigna responsables y controla los plazos desde un mismo sitio.",
  },
  {
    number: "04",
    icon: "shield",
    title: "Revisa y presenta con más control",
    text: "Haz una revisión final con trazabilidad completa y presenta con mayor seguridad.",
  },
];

export interface Audience {
  icon: IconName;
  title: string;
  text: string;
}

export const audiences: Audience[] = [
  {
    icon: "target",
    title: "Empresas que licitan de forma ocasional",
    text: "Para profesionalizar cada candidatura sin montar un proceso complejo desde cero.",
  },
  {
    icon: "dashboard",
    title: "Equipos con muchas candidaturas",
    text: "Para gestionar volumen sin perder el control de plazos, documentos ni responsables.",
  },
  {
    icon: "briefcase",
    title: "Consultoras que licitan para clientes",
    text: "Para preparar candidaturas de varios clientes con orden, trazabilidad y coordinación.",
  },
  {
    icon: "activity",
    title: "Responsables comerciales",
    text: "Para decidir con criterio a qué presentarse y no dejar escapar oportunidades.",
  },
  {
    icon: "checklist",
    title: "Responsables técnicos",
    text: "Para asegurar que cada requisito y anexo está cubierto antes de presentar.",
  },
  {
    icon: "eye",
    title: "Dirección",
    text: "Para tener visibilidad del estado de las candidaturas sin pedir informes manuales.",
  },
];

export const sectors: string[] = [
  "Consultoras",
  "Ingenierías",
  "Constructoras",
  "Empresas de servicios",
  "Empresas tecnológicas",
  "Despachos",
  "Proveedores de administraciones públicas",
];

export interface ComparisonRow {
  dimension: string;
  traditional: string;
  licitatis: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: "Información",
    traditional: "Dispersa entre portales, correos y carpetas.",
    licitatis: "Centralizada por candidatura en un único panel.",
  },
  {
    dimension: "Tareas",
    traditional: "Repartidas por correo y mensajería.",
    licitatis: "Generadas y asignadas con estado y responsable.",
  },
  {
    dimension: "Documentación",
    traditional: "Versiones duplicadas y dudas sobre la buena.",
    licitatis: "Repositorio con control de versiones.",
  },
  {
    dimension: "Plazos",
    traditional: "Dependen de recordatorios manuales.",
    licitatis: "Calendario y avisos por candidatura.",
  },
  {
    dimension: "Responsables",
    traditional: "No siempre está claro quién hace qué.",
    licitatis: "Cada tarea tiene una persona asignada.",
  },
  {
    dimension: "Seguimiento",
    traditional: "Reuniones y correos para saber el estado.",
    licitatis: "Estado de cada candidatura, siempre visible.",
  },
  {
    dimension: "Trazabilidad",
    traditional: "Difícil reconstruir qué se hizo y cuándo.",
    licitatis: "Registro de acciones y cambios.",
  },
  {
    dimension: "Riesgo",
    traditional: "Errores formales que pueden excluir.",
    licitatis: "Checklists y revisión estructurada.",
  },
  {
    dimension: "Visibilidad directiva",
    traditional: "Informes elaborados a mano.",
    licitatis: "Visión del estado sin trabajo adicional.",
  },
];

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
    title: "Acceso autenticado a la aplicación",
    text: "El acceso a la plataforma requiere autenticación; esta web pública no expone datos internos.",
  },
  {
    icon: "key",
    title: "Principio de mínimo privilegio",
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
    title: "Cumplimiento normativo como objetivo",
    text: "Trabajamos con el cumplimiento normativo como objetivo permanente en el diseño del producto.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "¿Qué es LICITATIS?",
    answer:
      "Es una plataforma para preparar, organizar, controlar y presentar candidaturas a licitaciones. Actúa como un copiloto que convierte pliegos, requisitos, documentos, tareas y plazos en un proceso claro y coordinado.",
  },
  {
    question: "¿Es un buscador de licitaciones?",
    answer:
      "No principalmente. La detección de oportunidades puede formar parte del producto, pero el foco de LICITATIS está en la preparación, la coordinación y el control de las candidaturas, no en ser un simple buscador.",
  },
  {
    question: "¿Qué tipo de empresas pueden usarlo?",
    answer:
      "Desde empresas que se presentan de forma ocasional hasta equipos que gestionan muchas candidaturas: consultoras, ingenierías, constructoras, empresas de servicios y tecnológicas, despachos y proveedores de administraciones públicas, entre otros.",
  },
  {
    question: "¿Analiza los pliegos?",
    answer:
      "Sí: ayuda a estructurar el pliego para identificar requisitos, criterios y documentación exigida, de forma que el equipo trabaje sobre información organizada en lugar de releer cada documento a mano.",
  },
  {
    question: "¿Permite organizar la documentación?",
    answer:
      "Sí. Incluye un repositorio documental con control de versiones y checklists para saber qué documentos exige cada licitación y cuáles ya están preparados.",
  },
  {
    question: "¿Ayuda a coordinar al equipo?",
    answer:
      "Sí. Permite generar tareas, asignar responsables y controlar plazos desde un mismo lugar, con trazabilidad de lo que hace cada persona.",
  },
  {
    question: "¿Cómo se gestiona una demostración?",
    answer:
      "Rellenas el formulario de solicitud de demostración y el equipo de LICITATIS se pone en contacto contigo para enseñarte la plataforma y resolver tus dudas.",
  },
  {
    question: "¿Cómo se protegen los datos?",
    answer:
      "La web pública y la aplicación privada son proyectos separados. El acceso a la aplicación es autenticado, se aplica el principio de mínimo privilegio, hay control de acceso y copias de seguridad, y trabajamos con el cumplimiento normativo como objetivo.",
  },
  {
    question: "¿Sustituye al criterio profesional?",
    answer:
      "No. LICITATIS mejora la organización, el control y la trazabilidad del proceso, pero las decisiones y la responsabilidad sobre cada candidatura siguen siendo del equipo. No garantiza adjudicaciones.",
  },
  {
    question: "¿Está disponible comercialmente?",
    answer:
      "Puedes solicitar una demostración desde esta web. Para conocer condiciones y disponibilidad, el equipo te informará durante el contacto. Las funcionalidades marcadas como «Próximamente» estarán disponibles más adelante.",
  },
];
