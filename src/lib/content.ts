import type { IconName } from "@/components/ui/icons";

/**
 * Contenido de la landing — fiel al brand kit de LICITATIS (julio 2026).
 * Voz: profesional que licita, no folleto. Concreta, honesta, sobria (§13).
 * Producto en producción como BETA GRATUITA. Sin datos inventados (precios, clientes,
 * métricas, premios). Disclaimers obligatorios (§18).
 */

export const CONTACT_EMAIL = "david@craftive.es";
export const BETA_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Beta%20Partner%20LICITATIS`;

/* Disclaimers obligatorios (§18) */
export const disclaimers = {
  noGuarantee: "LICITATIS no garantiza la adjudicación: asiste la preparación con revisión humana.",
  dataSources:
    "Las licitaciones proceden de la PLACSP (Plataforma de Contratación del Sector Público). Las convocatorias de ayudas y subvenciones proceden de la BDNS (Base de Datos Nacional de Subvenciones).",
  beta: "Beta gratuita mientras dure el programa. Sin tarjeta. Los precios se anunciarán al salir de beta.",
};

/* --------------------------------------------------------------- Banda de valor */
export interface ValueStat {
  value: string;
  label: string;
}
/** Cifras cualitativas honestas (no métricas de clientes). */
export const valueStats: ValueStat[] = [
  { value: "1", label: "Pasaporte: lo rellenas una vez, vale para todas tus licitaciones" },
  { value: "6", label: "pasos del pliego a la candidatura lista" },
  { value: "0", label: "datos de tu empresa inventados por la IA" },
  {
    value: "PLACSP",
    label: "y subvenciones BDNS, con un encaje que se explica criterio a criterio",
  },
];

/* ------------------------------------------------------------- Problema → solución */
export const problemSolution = {
  a: {
    title: "El problema no es encontrar licitaciones.",
    body: "Buscadores y alertas hay muchos. Lo caro viene después: decidir a ciegas si presentarte, descubrir tarde un requisito de solvencia, quedarte fuera por un certificado caducado o una firma que faltaba, y escribir la memoria técnica de madrugada sin poder aprovechar nada de la anterior.",
  },
  b: {
    title: "LICITATIS trabaja del pliego a la candidatura.",
    body: "Del aviso a la oferta lista: analiza el expediente, te dice si encajas y qué te podría dejar fuera, te monta el checklist y las tareas, te ayuda con la memoria y con los números, y te prepara un informe para decidirlo con dirección en una reunión, no en cinco.",
  },
};

/* -------------------------------------------------------------- Cómo funciona (§7) */
export interface HowItWorksStep {
  number: string;
  icon: IconName;
  title: string;
  text: string;
}
export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    icon: "radar",
    title: "Detecta o importa",
    text: "El feed de PLACSP te avisa de lo que encaja contigo. ¿Ya tienes el pliego? Súbelo y listo.",
  },
  {
    number: "02",
    icon: "sparkles",
    title: "Analiza con IA",
    text: "El resumen, los requisitos, los criterios y una recomendación clara: ir o no ir, y por qué.",
  },
  {
    number: "03",
    icon: "scale",
    title: "Comprueba elegibilidad",
    text: "Requisito a requisito: esto lo cumples, esto no, esto conviene mirarlo. Con la evidencia al lado.",
  },
  {
    number: "04",
    icon: "checklist",
    title: "Prepara el expediente",
    text: "Tareas, checklist y una memoria técnica que parte de proyectos que tu empresa ya ha ejecutado.",
  },
  {
    number: "05",
    icon: "shield",
    title: "Controla el riesgo",
    text: "Antes de presentar, el escáner busca los fallos que suelen dejar ofertas fuera. Y si no llegas solo, te dice qué perfil de socio te falta.",
  },
  {
    number: "06",
    icon: "euro",
    title: "Decide y exporta",
    text: "Tres escenarios de oferta y un informe listo para imprimir y decidir con tu dirección.",
  },
];

/* ------------------------------------------------- El Pasaporte del Licitador (§6) */
export const passport = {
  eyebrow: "El diferencial",
  title: "El Pasaporte del Licitador",
  lead: "Lo rellenas una vez y trabaja para ti en cada licitación: te avisa de lo que encaja, de lo que caduca y de lo que falta — antes de que se convierta en un problema.",
  contains: [
    {
      icon: "id-card" as IconName,
      title: "Identidad",
      text: "CIF (validado con dígito de control), razón social, CNAE, contacto.",
    },
    {
      icon: "radar" as IconName,
      title: "Qué busca",
      text: "CPVs, zonas, palabras clave, importes, lotes y organismos favoritos o vetados.",
    },
    {
      icon: "trending-up" as IconName,
      title: "Capacidad",
      text: "Experiencia, solvencia técnica y económica, facturación, certificaciones.",
    },
    {
      icon: "key" as IconName,
      title: "Credenciales con caducidad",
      text: "ISO, ENS, ROLECE, clasificación, AEAT/TGSS, seguros y poderes, con fechas.",
    },
  ],
  highlights: [
    {
      icon: "gauge" as IconName,
      title: "Índice de Aptitud para Licitar",
      text: "Una puntuación general y por vertical/CPV, con bloqueantes explícitos (p. ej. «certificado AEAT no vigente»).",
    },
    {
      icon: "shield" as IconName,
      title: "Titularidad verificada",
      text: "El NIF del certificado debe coincidir con el CIF del titular. Subes el justificante, la IA extrae fechas y tú validas.",
    },
    {
      icon: "clock" as IconName,
      title: "Alertas de caducidad con memoria",
      text: "A 30 días o menos te avisa; al renovar, el aviso se rearma para la nueva fecha.",
    },
  ],
};

/* ------------------------------------------------- Cómo usamos la IA (transparencia) */
export interface AiPoint {
  icon: IconName;
  title: string;
  text: string;
}
export const aiTransparency = {
  eyebrow: "Transparencia de IA",
  title: "Cómo utiliza la IA LICITATIS",
  lead: "Usamos IA para ayudarte a preparar candidaturas, no para decidir por ti. Queremos que sepas qué hace, qué no hace y dónde está siempre tu criterio.",
  points: [
    {
      icon: "sparkles" as IconName,
      title: "Tareas asistidas por IA",
      text: "Resumen de pliegos, extracción de requisitos, borradores de memoria, análisis de elegibilidad y de riesgos. Son apoyos al trabajo, no resoluciones.",
    },
    {
      icon: "alert-triangle" as IconName,
      title: "Puede equivocarse",
      text: "La IA puede omitir o interpretar mal un dato. Por eso separa hechos, inferencias y recomendaciones, y marca lo que le falta en vez de rellenarlo con datos no verificados.",
    },
    {
      icon: "check" as IconName,
      title: "Revisión humana obligatoria",
      text: "Ningún resultado se da por bueno sin que una persona lo valide. La decisión de presentarse, y cómo, es siempre del equipo usuario.",
    },
    {
      icon: "book" as IconName,
      title: "El pliego oficial manda",
      text: "Lo que dice LICITATIS es un apoyo; ante cualquier duda, prevalece el pliego y la documentación oficial de la licitación.",
    },
    {
      icon: "shield" as IconName,
      title: "Datos que tratan proveedores",
      text: "Algunas funciones pueden apoyarse en proveedores de IA. Qué se envía, a qué proveedor y con qué garantías se detalla en la política de privacidad y en la lista de subencargados.",
    },
    {
      icon: "scale" as IconName,
      title: "Sin decisiones automáticas de adjudicación",
      text: "LICITATIS no adjudica ni excluye por ti, y no garantiza la obtención de contratos. Prepara y controla; tú decides y presentas.",
    },
  ] as AiPoint[],
  note: "La información específica de transparencia dentro de la aplicación (por ejemplo, el marcado de contenido generado por IA) se implementa en la propia app y está pendiente de revisión jurídica; esta web no afirma un cumplimiento definitivo del Reglamento de IA.",
};

/* --------------------------------------------------------------- Funcionalidades (§8) */
export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}
export const features: Feature[] = [
  {
    icon: "sparkles",
    title: "Análisis IA del expediente",
    text: "Te dice si ir o no ir, con cuánta confianza y qué le falta por saber. Tú tienes la última palabra.",
  },
  {
    icon: "scale",
    title: "Matriz de elegibilidad",
    text: "¿Podemos presentarnos? Requisito a requisito, con semáforo y evidencia.",
  },
  {
    icon: "shield",
    title: "Escáner anti-exclusión",
    text: "Los errores que dejan ofertas fuera, detectados cuando aún tienen arreglo.",
  },
  {
    icon: "handshake",
    title: "Brecha UTE / Socio",
    text: "Un «no cumples» convertido en «viable con el socio adecuado».",
  },
  {
    icon: "euro",
    title: "Escenarios económicos",
    text: "Tres formas de ofertar: prudente, equilibrada o agresiva. Con el margen claro y aviso si rozas la baja temeraria.",
  },
  {
    icon: "book",
    title: "Memoria técnica asistida",
    text: "Se estructura según los criterios del pliego y se apoya en lo que has hecho de verdad. Nada de capacidades inventadas.",
  },
  {
    icon: "message",
    title: "Chat con citas al pliego",
    text: "Pregúntale lo que quieras al expediente: te responde citando el documento y la página exacta.",
  },
  {
    icon: "checklist",
    title: "Tareas y checklist",
    text: "Salen solas del análisis, se reparten entre el equipo y se exportan donde las necesites.",
  },
  {
    icon: "gauge",
    title: "Índice de preparación",
    text: "Un porcentaje que se entiende: qué está listo, qué falta y qué te está bloqueando.",
  },
];

/* --------------------------------------------------- Por qué NO es un buscador (§9) */
export interface ContrastRow {
  search: string;
  licitatis: string;
}
export const searchVsLicitatis: ContrastRow[] = [
  {
    search: "Te avisa de la oportunidad.",
    licitatis: "Te lleva hasta la oferta lista para presentar.",
  },
  {
    search: "«Aquí tienes 200 licitaciones».",
    licitatis: "«Estas encajan contigo; esta merece que la pelees, esta te excluiría por X».",
  },
  {
    search: "La documentación es cosa tuya.",
    licitatis: "Checklist, memoria y expediente sobre tu evidencia real.",
  },
  {
    search: "El riesgo de exclusión lo descubres al presentar.",
    licitatis: "Lo ves antes: escáner anti-exclusión e índice de preparación.",
  },
  {
    search: "Cada oferta empieza de cero.",
    licitatis: "El Pasaporte y la Biblioteca reutilizan lo que ya hiciste.",
  },
];

/* -------------------------------------------------------------- Dos públicos (§3, §15) */
export interface AudienceCard {
  icon: IconName;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  badge?: string;
}
export const audiences: AudienceCard[] = [
  {
    icon: "building",
    eyebrow: "Para empresas",
    title: "Un proceso repetible, del pliego al expediente listo",
    text: "Para pymes que licitan y se conocen el proceso de memoria: ofertas contra reloj, carpetas por todas partes y el miedo a quedarse fuera por un papel.",
    points: [
      "Activación documental guiada",
      "Análisis de licitaciones reales",
      "Elegibilidad + checklist + anti-exclusión",
      "Informe ejecutivo para dirección",
    ],
  },
  {
    icon: "briefcase",
    eyebrow: "Para consultoras",
    title: "Modo multicliente, con expedientes por cliente",
    text: "Para consultoras y despachos que llevan concursos de varios clientes y acaban repitiendo el mismo trabajo una vez por cada uno.",
    points: [
      "Espacios de cliente separados y aislados",
      "Expedientes y candidaturas por cliente",
      "Exportaciones profesionales",
      "Soporte prioritario",
    ],
    badge: "Beta Agency",
  },
];

export const sectors: string[] = [
  "Constructoras",
  "Ingenierías",
  "Servicios",
  "Tecnología",
  "Limpieza y mantenimiento",
  "Despachos y consultoras",
];

/* ------------------------------------------------- Confianza y privacidad (§10) */
export interface PrivacyPoint {
  icon: IconName;
  title: string;
  text: string;
}
export const privacyPoints: PrivacyPoint[] = [
  {
    icon: "lock",
    title: "Aislado por organización",
    text: "Documentos y expedientes separados por organización (y por espacio de cliente en modo Agencia).",
  },
  {
    icon: "key",
    title: "Acceso por roles",
    text: "Owner, admin, gestor y lector con permisos granulares, comprobados siempre en el servidor.",
  },
  {
    icon: "shield",
    title: "Sin entrenar con tus datos",
    text: "No usamos tus documentos para entrenar modelos propios.",
  },
  {
    icon: "check",
    title: "IA con revisión humana",
    text: "Cada análisis separa hechos, inferencias y recomendaciones, y exige que tú valides.",
  },
  {
    icon: "id-card",
    title: "RGPD y 2FA",
    text: "Consentimiento, exportación y borrado de datos; autenticación con 2FA (TOTP) y códigos de respaldo.",
  },
  {
    icon: "backup",
    title: "Datos alojados en la UE",
    text: "Infraestructura en la Unión Europea, con protección de sesión reforzada.",
  },
];

/* --------------------------------------------------------- Programa Beta Partner (§15) */
export const betaPartner = {
  eyebrow: "Programa Beta",
  title: "Programa Beta Partner LICITATIS",
  sub: "Plazas limitadas para empresas que licitan y consultoras. Nosotros hacemos el trabajo pesado de arrancar: cargamos tu documentación, montamos tu perfil de solvencia y analizamos contigo tu primera licitación real.",
};

/* ------------------------------------------------------------------------ Planes (§11) */
export interface Plan {
  name: string;
  tagline: string;
  highlights: string[];
  highlighted: boolean;
}
export const plans: Plan[] = [
  {
    name: "Free",
    tagline: "Para evaluar el producto",
    highlights: ["3 análisis/mes (IA simulada)", "1 candidatura activa", "1 perfil de búsqueda"],
    highlighted: false,
  },
  {
    name: "Starter",
    tagline: "Para empresas que licitan cada mes",
    highlights: ["50 análisis/mes (IA real)", "10 candidaturas", "3 perfiles de búsqueda"],
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "Para preparar y defender más ofertas",
    highlights: ["250 análisis/mes", "Candidaturas y documentos ∞", "10 perfiles de búsqueda"],
    highlighted: true,
  },
  {
    name: "Agency",
    tagline: "Para consultoras multi-cliente",
    highlights: ["500 análisis/mes", "Perfiles ∞ · 30 miembros", "Espacios de cliente separados"],
    highlighted: false,
  },
];

/** Límites reales por plan (se aplican en el servidor). `∞` = ilimitado. */
export const planLimitRows: { label: string; values: [string, string, string, string] }[] = [
  { label: "Análisis IA / mes", values: ["3 (simulada)", "50", "250", "500"] },
  { label: "Candidaturas activas", values: ["1", "10", "∞", "∞"] },
  { label: "Documentos", values: ["10", "100", "∞", "∞"] },
  { label: "Perfiles de búsqueda", values: ["1", "3", "10", "∞"] },
  { label: "Miembros del equipo", values: ["1", "5", "15", "30"] },
  { label: "Credenciales del Pasaporte", values: ["3", "20", "∞", "∞"] },
  { label: "Webhooks salientes", values: ["0", "1", "5", "∞"] },
  { label: "Subvenciones / día", values: ["0", "3", "10", "30"] },
];
export const planNames = ["Free", "Starter", "Pro", "Agency"] as const;

/* ------------------------------------------------------------------------- FAQ (§15) */
export interface Faq {
  question: string;
  answer: string;
}
export const faqs: Faq[] = [
  {
    question: "¿LICITATIS presenta la oferta por mí?",
    answer:
      "No. Prepara y controla el expediente, pero no custodia tus certificados y no firma ni presenta en tu nombre. Tú das el paso final.",
  },
  {
    question: "¿La IA se inventa datos de mi empresa?",
    answer:
      "No. Cuando falta un dato, lo deja marcado como hueco ([[FALTA: …]]) para que lo completes; nunca rellena con datos no verificados.",
  },
  {
    question: "¿De dónde salen las licitaciones?",
    answer:
      "Del feed oficial de PLACSP (Plataforma de Contratación del Sector Público) y, para ayudas y subvenciones, de la BDNS. También puedes subir un pliego a mano.",
  },
  {
    question: "¿Cómo sabe qué licitaciones me encajan?",
    answer:
      "Con tu Pasaporte y un cálculo con reglas fijas que puedes revisar (CPV, territorio, importe, palabras clave…). Si no hay señal en tu Pasaporte, no te llenamos de ruido.",
  },
  {
    question: "¿Usáis mis documentos para entrenar la IA?",
    answer: "No. No usamos tus documentos para entrenar modelos propios.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Ahora estamos en beta gratuita. Los planes están definidos; el precio se anunciará al salir de beta.",
  },
  {
    question: "¿Sirve para consultoras?",
    answer:
      "Sí, con modo multicliente (espacios separados y portal por cliente). Está en beta Agency.",
  },
];
