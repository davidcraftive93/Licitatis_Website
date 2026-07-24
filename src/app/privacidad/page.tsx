import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { company, brand, legalContact, legalRefs, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata LICITATIS los datos personales de quienes solicitan una demostración.",
  // noindex mientras el contenido tenga placeholders sin resolver (revisión legal pendiente).
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de privacidad"
      intro="Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD."
      docMeta={legalDocs.privacidad}
    >
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable del tratamiento:</strong> {company.name} (CIF {company.taxId}),
          titular de la marca {brand.name}
        </li>
        <li>
          <strong>Domicilio:</strong> {company.address}
        </li>
        <li>
          <strong>Contacto de privacidad:</strong> {legalContact.privacy}
        </li>
        <li>
          <strong>Delegado de Protección de Datos:</strong> {company.dpo}
        </li>
      </ul>

      <h2>2. Finalidad</h2>
      <p>
        Tratamos los datos que nos facilitas a través del formulario de solicitud de demostración
        con la finalidad de gestionar tu solicitud, ponernos en contacto contigo y, en su caso,
        informarte sobre el producto {siteConfig.name}. Si marcas la casilla opcional de
        comunicaciones comerciales, además trataremos tus datos para enviarte novedades del
        producto; puedes retirar ese consentimiento en cualquier momento.
      </p>

      <h2>3. Legitimación</h2>
      <p>
        La base jurídica para gestionar tu solicitud es tu <strong>consentimiento</strong>, prestado
        al enviar el formulario y aceptar esta política, y/o la aplicación de medidas
        precontractuales a petición tuya. El envío de comunicaciones comerciales se basa en tu
        consentimiento específico (casilla opcional). Podrás retirar cualquier consentimiento en
        cualquier momento. La determinación definitiva de la base jurídica queda pendiente de
        revisión profesional.
      </p>

      <h2>4. Destinatarios y encargados</h2>
      <p>
        Para gestionar los contactos comerciales utilizamos <strong>HubSpot</strong> como
        proveedor/encargado del tratamiento. La región de alojamiento de los datos y las garantías
        de una eventual transferencia internacional (por ejemplo, cláusulas contractuales tipo o el
        marco de adecuación aplicable) deben confirmarse y detallarse aquí. Puedes consultar la
        lista de subencargados en la página correspondiente cuando esté disponible.
      </p>

      <h2>5. Conservación</h2>
      <p>
        Conservaremos tus datos mientras exista interés mutuo o hasta que solicites su supresión, y
        durante los plazos legalmente exigibles. Los plazos concretos quedan pendientes de definir
        en la revisión profesional.
      </p>

      <h2>6. Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a {legalContact.privacy}. Asimismo, puedes reclamar ante la{" "}
        <a href={legalRefs.supervisoryAuthorityUrl} target="_blank" rel="noopener noreferrer">
          {legalRefs.supervisoryAuthority}
        </a>
        .
      </p>

      <h2>7. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos, incluyendo
        control de acceso y el principio de mínimo privilegio. El detalle se recoge en la página de{" "}
        <a href="/seguridad-y-privacidad">seguridad y privacidad</a>.
      </p>
    </LegalShell>
  );
}
