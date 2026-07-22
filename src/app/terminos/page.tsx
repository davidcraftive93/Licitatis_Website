import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones de uso de la web comercial de LICITATIS.",
  // noindex mientras el contenido tenga placeholders sin resolver (revisión legal pendiente).
  robots: { index: false, follow: false },
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos de uso"
      intro="Condiciones que regulan el acceso y uso de esta web comercial."
    >
      <h2>1. Aceptación</h2>
      <p>
        El acceso y uso de este sitio web implica la aceptación de los presentes términos. Si no
        estás de acuerdo, te rogamos que no utilices el sitio.
      </p>

      <h2>2. Uso del sitio</h2>
      <p>
        Te comprometes a hacer un uso lícito del sitio y a no realizar actividades que puedan dañar,
        sobrecargar o deteriorar su funcionamiento o el de terceros.
      </p>

      <h2>3. Solicitudes de demostración</h2>
      <p>
        El envío del formulario de demostración no genera ninguna obligación contractual. La
        información sobre condiciones comerciales, disponibilidad y precios de {siteConfig.name} se
        facilitará, en su caso, durante el contacto comercial. [Contenido pendiente de confirmar.]
      </p>

      <h2>4. Ausencia de garantías sobre resultados</h2>
      <p>
        {siteConfig.name} es una herramienta de apoyo a la preparación y el control de candidaturas.
        No garantiza la obtención de adjudicaciones ni sustituye el criterio profesional del equipo
        usuario.
      </p>

      <h2>5. Aplicación privada</h2>
      <p>
        El uso de la aplicación disponible en <code>{siteConfig.appUrl}</code> se rige por sus
        propias condiciones, independientes de estos términos.
      </p>

      <h2>6. Modificaciones y legislación</h2>
      <p>
        Nos reservamos el derecho a modificar estos términos. Se rigen por la legislación española.
        [Texto pendiente de revisión legal.]
      </p>
    </LegalShell>
  );
}
