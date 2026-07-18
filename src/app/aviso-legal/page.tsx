import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal e información del titular de la web de LICITATIS.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalShell
      title="Aviso legal"
      intro="Información general en cumplimiento de la normativa aplicable (LSSI-CE)."
    >
      <h2>1. Titular del sitio web</h2>
      <p>
        En cumplimiento del deber de información, se recogen los datos identificativos del titular:
      </p>
      <ul>
        <li>
          <strong>Razón social:</strong> [Razón social]
        </li>
        <li>
          <strong>NIF/CIF:</strong> [NIF]
        </li>
        <li>
          <strong>Domicilio social:</strong> [Dirección completa]
        </li>
        <li>
          <strong>Correo de contacto:</strong> {siteConfig.contactEmail} (pendiente de confirmación)
        </li>
        <li>
          <strong>Datos registrales:</strong> [Registro Mercantil, tomo, folio, hoja]
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo y comercial sobre el producto {siteConfig.name} y
        la posibilidad de solicitar una demostración. El acceso y uso del sitio implica la
        aceptación del presente aviso legal.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio (textos, marca, logotipos, diseño e imágenes) son titularidad
        de [Razón social] o de terceros que han autorizado su uso, y están protegidos por la
        normativa de propiedad intelectual e industrial. Queda prohibida su reproducción sin
        autorización.
      </p>

      <h2>4. Exención de responsabilidad</h2>
      <p>
        [Razón social] no se hace responsable del uso indebido de los contenidos ni de posibles
        daños derivados del acceso al sitio. [Texto pendiente de revisión legal.]
      </p>

      <h2>5. Enlaces a la aplicación</h2>
      <p>
        El acceso a la aplicación privada se realiza a través de <code>{siteConfig.appUrl}</code>,
        que constituye un servicio y un proyecto independientes de esta web comercial.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        El presente aviso legal se rige por la legislación española. [Fuero y jurisdicción
        pendientes de definir.]
      </p>
    </LegalShell>
  );
}
