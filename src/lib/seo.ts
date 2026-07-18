import { siteConfig } from "@/lib/site";
import { faqs } from "@/lib/content";

/**
 * Datos estructurados (JSON-LD) razonables y verificables. No se incluyen datos
 * inventados (valoraciones, número de clientes, precios, etc.).
 */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: `${siteConfig.descriptor}. ${siteConfig.shortValue}`,
    slogan: siteConfig.descriptor,
    logo: `${siteConfig.url}/icon.svg`,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-ES",
  };
}

export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "es-ES",
    description:
      "Plataforma para preparar, organizar, controlar y presentar candidaturas a licitaciones: pliegos, requisitos, documentos, tareas y plazos en un proceso claro y coordinado.",
    url: siteConfig.url,
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
