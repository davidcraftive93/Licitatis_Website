import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { company, brand, legalContact, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal e información del titular de la web de LICITATIS.",
  // noindex mientras el contenido tenga datos pendientes (revisión legal pendiente).
  robots: { index: false, follow: false },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalShell
      title="Aviso legal"
      intro="Información del prestador del servicio conforme a la LSSI-CE."
      docMeta={legalDocs.avisoLegal}
    >
      <h2>1. Titular del sitio web y prestador del servicio</h2>
      <p>
        En cumplimiento del deber de información, se recogen los datos identificativos del prestador
        del servicio:
      </p>
      <ul>
        <li>
          <strong>Denominación social:</strong> {company.name}
        </li>
        <li>
          <strong>CIF:</strong> {company.taxId}
        </li>
        <li>
          <strong>Domicilio social:</strong> {company.address}
        </li>
        <li>
          <strong>Datos registrales:</strong> {company.registry}
        </li>
        <li>
          <strong>Correo de contacto:</strong> {legalContact.general}
        </li>
        <li>
          <strong>Correo de contacto legal:</strong> {company.legalEmail}
        </li>
        <li>
          <strong>Teléfono:</strong> {company.phone}
        </li>
        <li>
          <strong>Sitio web:</strong> {siteConfig.url}
        </li>
      </ul>

      <h2>2. LICITATIS es una marca comercial</h2>
      <p>
        <strong>{brand.name}</strong> es una <strong>marca comercial y un producto</strong> cuya
        titularidad corresponde a <strong>{company.name}</strong> (marca corporativa:{" "}
        {company.brand}). {brand.name} <strong>no es una sociedad mercantil</strong>: la prestación
        del servicio, la facturación y las responsabilidades legales corresponden en todo caso a{" "}
        {company.name}.
      </p>
      <p>
        A efectos de facturación y de cargos: el servicio se factura a nombre de {company.name} y,
        en el extracto bancario del cliente, el cargo figura a nombre de la sociedad —como «
        {brand.statementDescriptors[0]}» o «{brand.statementDescriptors[1]}»—, <strong>no</strong>{" "}
        como «{brand.name}».
      </p>

      <h2>3. Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo y comercial sobre el producto {brand.name} y la
        posibilidad de contratarlo o de solicitar una demostración. Estas condiciones se aplican al
        uso del sitio; si continúas utilizándolo, entendemos que las conoces, y si no estás de
        acuerdo, te pedimos que no lo utilices.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio (textos, marca, logotipos, diseño e imágenes) son titularidad
        de {company.name} o de terceros que han autorizado su uso, y están protegidos por la
        normativa de propiedad intelectual e industrial. Queda prohibida su reproducción sin
        autorización.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        Procuramos que la información del sitio sea correcta y esté actualizada, pero no podemos
        garantizar la ausencia total de errores. En la medida permitida por la ley, y salvo dolo o
        negligencia grave, no asumimos responsabilidad por el uso indebido de los contenidos por
        parte de terceros. Nada en este aviso excluye responsabilidades que no puedan excluirse
        legalmente frente a consumidores.
      </p>

      <h2>6. Enlaces a la aplicación</h2>
      <p>
        El acceso a la aplicación privada se realiza a través de <code>{siteConfig.appUrl}</code>,
        cuyo uso se rige por sus propias condiciones.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        El presente aviso legal se rige por la legislación española. La determinación del fuero y la
        jurisdicción competente queda pendiente de revisión profesional.
      </p>
    </LegalShell>
  );
}
