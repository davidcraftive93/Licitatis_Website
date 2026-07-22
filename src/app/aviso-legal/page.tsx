import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { legalEntity, legalContact, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal e información del titular de la web de LICITATIS.",
  // noindex mientras el contenido tenga placeholders sin resolver (revisión legal pendiente).
  robots: { index: false, follow: false },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalShell
      title="Aviso legal"
      intro="Información general en cumplimiento de la normativa aplicable (LSSI-CE)."
      docMeta={legalDocs.avisoLegal}
    >
      <h2>1. Titular del sitio web</h2>
      <p>
        En cumplimiento del deber de información, se recogen los datos identificativos del titular:
      </p>
      <ul>
        <li>
          <strong>Denominación:</strong> {legalEntity.commercialName} — {legalEntity.legalName}
        </li>
        <li>
          <strong>NIF/CIF:</strong> {legalEntity.taxId}
        </li>
        <li>
          <strong>Domicilio social:</strong> {legalEntity.address}
        </li>
        <li>
          <strong>Correo de contacto:</strong> {legalContact.general}
        </li>
        <li>
          <strong>Datos registrales:</strong> {legalEntity.registry}
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo y comercial sobre el producto {siteConfig.name} y
        la posibilidad de solicitar una demostración. Estas condiciones se aplican al uso del sitio;
        si continúas utilizándolo, entendemos que las conoces, y si no estás de acuerdo, te pedimos
        que no lo utilices.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio (textos, marca, logotipos, diseño e imágenes) son titularidad
        de {legalEntity.commercialName} ({legalEntity.legalName}) o de terceros que han autorizado
        su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda
        prohibida su reproducción sin autorización.
      </p>

      <h2>4. Responsabilidad</h2>
      <p>
        Procuramos que la información del sitio sea correcta y esté actualizada, pero no podemos
        garantizar la ausencia total de errores. En la medida permitida por la ley, y salvo dolo o
        negligencia grave, no asumimos responsabilidad por el uso indebido de los contenidos por
        parte de terceros. Nada en este aviso excluye responsabilidades que no puedan excluirse
        legalmente frente a consumidores.
      </p>

      <h2>5. Enlaces a la aplicación</h2>
      <p>
        El acceso a la aplicación privada se realiza a través de <code>{siteConfig.appUrl}</code>,
        que constituye un servicio y un proyecto independientes de esta web comercial.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        El presente aviso legal se rige por la legislación española. La determinación del fuero y la
        jurisdicción competente queda pendiente de revisión profesional.
      </p>
    </LegalShell>
  );
}
