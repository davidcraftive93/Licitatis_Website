import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata LICITATIS los datos personales de quienes solicitan una demostración.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de privacidad"
      intro="Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD."
    >
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> [Razón social] ([NIF])
        </li>
        <li>
          <strong>Domicilio:</strong> [Dirección completa]
        </li>
        <li>
          <strong>Contacto:</strong> {siteConfig.contactEmail} (pendiente de confirmación)
        </li>
        <li>
          <strong>Delegado de Protección de Datos:</strong> [Si aplica]
        </li>
      </ul>

      <h2>2. Finalidad</h2>
      <p>
        Tratamos los datos que nos facilitas a través del formulario de solicitud de demostración
        con la finalidad de gestionar tu solicitud, ponernos en contacto contigo y, en su caso,
        informarte sobre el producto {siteConfig.name}.
      </p>

      <h2>3. Legitimación</h2>
      <p>
        La base jurídica es tu <strong>consentimiento</strong>, prestado al enviar el formulario y
        aceptar esta política. Podrás retirarlo en cualquier momento.
      </p>

      <h2>4. Destinatarios</h2>
      <p>
        Para gestionar los contactos comerciales utilizamos <strong>HubSpot</strong> como
        proveedor/encargado del tratamiento. Sus servidores y garantías de transferencia
        internacional deben detallarse aquí. [Texto pendiente de revisión legal, incluyendo, si
        procede, las transferencias internacionales y sus garantías.]
      </p>

      <h2>5. Conservación</h2>
      <p>
        Conservaremos tus datos mientras exista interés mutuo o hasta que solicites su supresión, y
        durante los plazos legalmente exigibles. [Plazos concretos pendientes de definir.]
      </p>

      <h2>6. Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a {siteConfig.contactEmail}. Asimismo, puedes reclamar ante la
        Agencia Española de Protección de Datos (www.aepd.es).
      </p>

      <h2>7. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos, incluyendo
        control de acceso y el principio de mínimo privilegio. [Detalle pendiente de revisión.]
      </p>
    </LegalShell>
  );
}
