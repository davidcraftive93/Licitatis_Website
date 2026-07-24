import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalContact, legalDocs, pendingLegalData, company, brand } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Acuerdo de tratamiento de datos (DPA)",
  description: "Información sobre el acuerdo de tratamiento de datos de LICITATIS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/acuerdo-tratamiento-datos" },
};

export default function DpaPage() {
  return (
    <LegalShell
      title="Acuerdo de tratamiento de datos (DPA)"
      intro="Marco del acuerdo de encargado de tratamiento (art. 28 RGPD)."
      docMeta={legalDocs.dpa}
    >
      <h2>1. Cuándo aplica</h2>
      <p>
        Un acuerdo de tratamiento de datos (DPA) regula el tratamiento de datos personales cuando
        {company.name} (titular de la marca {brand.name}) actúa como <strong>encargado</strong> por
        cuenta de un cliente que es responsable del tratamiento. Esto es propio del uso de la{" "}
        <strong>aplicación</strong> (app.licitatis.es), no de esta web comercial.
      </p>

      <h2>2. Estado</h2>
      <p>
        El texto del DPA (objeto, duración, instrucciones, confidencialidad, seguridad,
        subencargados, asistencia, supresión, auditoría) debe redactarse y revisarse por un
        profesional antes de contratar el servicio.
      </p>
      <p>{pendingLegalData("TEXTO COMPLETO DEL DPA conforme al art. 28 RGPD")}</p>

      <h2>3. Subencargados</h2>
      <p>
        La relación de subencargados que intervienen en el tratamiento se publica en la página de{" "}
        <a href="/subencargados">subencargados</a>.
      </p>

      <h2>4. Contacto</h2>
      <p>
        Para solicitar el DPA aplicable a la contratación del servicio, escríbenos a{" "}
        {legalContact.privacy}.
      </p>
    </LegalShell>
  );
}
