import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { company, brand, legalContact, legalDocs, vatLabel } from "@/lib/legal";
import { plans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de contratación y uso del servicio LICITATIS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terminos" },
};

const paidPlans = plans.filter((p) => p.paid);

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos y condiciones"
      intro="Condiciones que regulan el uso del sitio y la contratación del servicio."
      docMeta={legalDocs.terminos}
    >
      <h2>1. Prestador y aceptación</h2>
      <p>
        El servicio {brand.name} lo presta <strong>{company.name}</strong> (CIF {company.taxId}),
        titular de la marca {brand.name}. {brand.name} es una marca comercial, no una sociedad.
        Estas condiciones se aplican al uso del sitio y a la contratación del servicio; si contratas
        o continúas utilizándolo, entendemos que las conoces.
      </p>

      <h2>2. Objeto</h2>
      <p>
        {brand.name} es una herramienta de apoyo a la preparación, organización y control de
        candidaturas a licitaciones públicas. Incluye funciones asistidas por inteligencia
        artificial cuyos resultados requieren revisión humana.
      </p>

      <h2>3. Precio y facturación</h2>
      <p>Planes de pago vigentes (importes finales, IVA incluido):</p>
      <ul>
        {paidPlans.map((p) => (
          <li key={p.name}>
            <strong>{p.name}:</strong> {p.price}
            {p.period} ({vatLabel})
          </li>
        ))}
        <li>
          Existe además un <strong>plan gratuito</strong>, sin tarjeta.
        </li>
      </ul>
      <p>
        La factura se emite a nombre de <strong>{company.name}</strong>. En el extracto bancario del
        cliente, el cargo figura a nombre de la sociedad —como «{brand.statementDescriptors[0]}» o «
        {brand.statementDescriptors[1]}»—, <strong>no</strong> como «{brand.name}». Los importes
        indicados son finales e incluyen el IVA aplicable según la normativa vigente y los datos
        fiscales del cliente.
      </p>

      <h2>4. Periodo de suscripción y renovación</h2>
      <p>
        La suscripción de los planes de pago es mensual y se renueva automáticamente por periodos
        iguales, salvo cancelación previa. El detalle del momento del cobro y de las condiciones de
        renovación queda pendiente de revisión profesional antes de la comercialización.
      </p>

      <h2>5. Cancelación</h2>
      <p>
        Puedes cancelar la renovación en cualquier momento; la cancelación surte efecto al final del
        periodo ya facturado, sin que se generen nuevos cargos. Para cancelar, escríbenos a{" "}
        {legalContact.general}. Las condiciones de reembolso y el derecho de desistimiento, cuando
        resulte aplicable, quedan pendientes de revisión profesional.
      </p>

      <h2>6. Uso del sitio y del servicio</h2>
      <p>
        Te comprometes a hacer un uso lícito del servicio y a no realizar actividades que puedan
        dañar, sobrecargar o deteriorar su funcionamiento o el de terceros.
      </p>

      <h2>7. Ausencia de garantías sobre resultados</h2>
      <p>
        {brand.name} no garantiza la obtención de adjudicaciones ni sustituye el criterio
        profesional del equipo usuario. Ante cualquier discrepancia, prevalece el pliego y la
        documentación oficial de la licitación.
      </p>

      <h2>8. Aplicación privada</h2>
      <p>
        El uso de la aplicación disponible en <code>{siteConfig.appUrl}</code> se rige por estas
        condiciones y por las específicas que se indiquen en ella.
      </p>

      <h2>9. Modificaciones, ley aplicable y jurisdicción</h2>
      <p>
        Podremos actualizar estos términos; publicaremos la versión vigente en esta página. Se rigen
        por la legislación española. La determinación del fuero y la jurisdicción competente queda
        pendiente de revisión profesional.
      </p>
    </LegalShell>
  );
}
