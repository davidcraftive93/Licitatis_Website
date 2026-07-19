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
  { value: "1", label: "Pasaporte que alimenta todo el proceso" },
  { value: "6", label: "pasos del pliego a la candidatura lista" },
  { value: "0", label: "datos de empresa inventados por la IA" },
  { value: "PLACSP", label: "+ subvenciones BDNS, con matching explicable" },
];

/* ------------------------------------------------------------- Problema → solución */
export const problemSolution = {
  a: {
    title: "El problema no es encontrar licitaciones.",
    body: "Los buscadores y las alertas ya existen. Lo que cuesta dinero es lo de después: decidir sin criterio si presentarse, descubrir tarde un requisito de solvencia, perder una oferta por un certificado caducado o una firma que falta, y redactar memorias técnicas contra reloj sin reutilizar nada.",
  },
  b: {
    title: "LICITATIS trabaja del pliego a la candidatura.",
    body: "De la alerta a la oferta lista para presentar: análisis del expediente, encaje con tu empresa, matriz de elegibilidad, checklist documental, tareas, riesgos de exclusión, escenarios económicos, memoria técnica asistida y un informe ejecutivo para decidir con dirección.",
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
    text: "Feed de PLACSP con perfiles de búsqueda, o sube el pliego a mano.",
  },
  {
    number: "02",
    icon: "sparkles",
    title: "Analiza con IA",
    text: "Resumen, requisitos, criterios de adjudicación y un go/no-go argumentado.",
  },
  {
    number: "03",
    icon: "scale",
    title: "Comprueba elegibilidad",
    text: "Qué cumples, qué no y qué está dudoso — con evidencia y severidad.",
  },
  {
    number: "04",
    icon: "checklist",
    title: "Prepara el expediente",
    text: "Tareas, checklist documental y memoria técnica sobre tu evidencia real.",
  },
  {
    number: "05",
    icon: "shield",
    title: "Controla el riesgo",
    text: "Escáner anti-exclusión, brecha UTE/socio e índice de preparación.",
  },
  {
    number: "06",
    icon: "euro",
    title: "Decide y exporta",
    text: "Escenarios económicos e informe ejecutivo imprimible para dirección.",
  },
];

/* ------------------------------------------------- El Pasaporte del Licitador (§6) */
export const passport = {
  eyebrow: "El diferencial",
  title: "El Pasaporte del Licitador",
  lead: "Rellena tu Pasaporte una vez. A partir de ahí, cada licitación que encaja, cada certificado que caduca y cada oferta que preparas parte de él.",
  contains: [
    { icon: "id-card" as IconName, title: "Identidad", text: "CIF (validado con dígito de control), razón social, CNAE, contacto." },
    { icon: "radar" as IconName, title: "Qué busca", text: "CPVs, zonas, palabras clave, importes, lotes y organismos favoritos o vetados." },
    { icon: "trending-up" as IconName, title: "Capacidad", text: "Experiencia, solvencia técnica y económica, facturación, certificaciones." },
    { icon: "key" as IconName, title: "Credenciales con caducidad", text: "ISO, ENS, ROLECE, clasificación, AEAT/TGSS, seguros y poderes, con fechas." },
  ],
  highlights: [
    {
      icon: "gauge" as IconName,
      title: "Índice de Aptitud para Licitar",
      text: "Un score general y por vertical/CPV, con bloqueantes explícitos (p. ej. «certificado AEAT no vigente»).",
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

/* --------------------------------------------------------------- Funcionalidades (§8) */
export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}
export const features: Feature[] = [
  { icon: "sparkles", title: "Análisis IA del expediente", text: "Go/no-go con confianza, información faltante y revisión humana obligatoria." },
  { icon: "scale", title: "Matriz de elegibilidad", text: "¿Podemos presentarnos? Requisito a requisito, con semáforo y evidencia." },
  { icon: "shield", title: "Escáner anti-exclusión", text: "Los errores que dejan ofertas fuera, detectados antes de presentar." },
  { icon: "handshake", title: "Brecha UTE / Socio", text: "Un «no cumples» convertido en «viable con el socio adecuado»." },
  { icon: "euro", title: "Escenarios económicos", text: "Conservador, equilibrado y agresivo — con margen y aviso de baja temeraria." },
  { icon: "book", title: "Memoria técnica asistida", text: "Estructura por criterios con tu evidencia real. La IA no inventa capacidades." },
  { icon: "message", title: "Chat con citas al pliego", text: "Pregunta al expediente; responde citando documento, fragmento y página." },
  { icon: "checklist", title: "Tareas y checklist", text: "Generadas del análisis, asignables al equipo, exportables en formato estándar." },
  { icon: "gauge", title: "Índice de preparación", text: "Un % explicable con bloqueantes: sabes qué falta para estar listos." },
];

/* --------------------------------------------------- Por qué NO es un buscador (§9) */
export interface ContrastRow {
  search: string;
  licitatis: string;
}
export const searchVsLicitatis: ContrastRow[] = [
  { search: "Te avisa de la oportunidad.", licitatis: "Te lleva hasta la oferta lista para presentar." },
  { search: "«Aquí tienes 200 licitaciones».", licitatis: "«Estas encajan contigo; esta la puedes ganar, esta te excluiría por X»." },
  { search: "La documentación es cosa tuya.", licitatis: "Checklist, memoria y expediente sobre tu evidencia real." },
  { search: "El riesgo de exclusión lo descubres al presentar.", licitatis: "Lo ves antes: escáner anti-exclusión e índice de preparación." },
  { search: "Cada oferta empieza de cero.", licitatis: "El Pasaporte y la Biblioteca reutilizan lo que ya hiciste." },
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
    text: "Para pymes que se presentan a licitaciones públicas y hoy preparan ofertas contra reloj, sin proceso y con miedo a la exclusión.",
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
    text: "Para consultoras y despachos que gestionan concursos de varias empresas cliente y multiplican el trabajo manual por cada una.",
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
    text: "Owner, admin, gestor y lector con permisos granulares; la autorización vive en el servidor.",
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
    title: "Hospedaje en la UE",
    text: "Infraestructura en la Unión Europea; sesiones endurecidas.",
  },
];

/* --------------------------------------------------------- Programa Beta Partner (§15) */
export const betaPartner = {
  eyebrow: "Conversión",
  title: "Programa Beta Partner LICITATIS",
  sub: "Plazas limitadas para empresas licitadoras y consultoras. Incluye la Activación Documental IA: cargamos tu documentación, configuramos tu perfil de solvencia y analizamos contigo tu primera licitación real.",
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
      "No. Prepara y controla el expediente, pero no custodia tus certificados ni firma o presenta en tu nombre. Tú das el paso final.",
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
      "Con tu Pasaporte y un cálculo determinista y explicable (CPV, territorio, importe, palabras clave…). Si no hay señal en tu Pasaporte, no te llenamos de ruido.",
  },
  {
    question: "¿Usáis mis documentos para entrenar la IA?",
    answer: "No.",
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
