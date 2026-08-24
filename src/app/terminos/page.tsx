import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { company, brand, legalContact, legalDocs, vatLabel } from "@/lib/legal";
import { plans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de contratación y uso del servicio LICITATIS.",
  // Indexable: ya no quedan datos sin resolver en el documento.
  robots: { index: true, follow: true },
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
        La suscripción de los planes de pago es mensual. El primer cobro se realiza al contratar y
        los siguientes el mismo día de cada mes, renovándose automáticamente por periodos iguales
        salvo que canceles antes de la fecha de renovación. Te avisaremos con antelación de
        cualquier cambio de precio, que nunca se aplicará al periodo ya pagado.
      </p>

      <h2>5. Cancelación</h2>
      <p>
        Puedes cancelar la renovación en cualquier momento; la cancelación surte efecto al final del
        periodo ya facturado, sin que se generen nuevos cargos. Para cancelar, escríbenos a{" "}
        {legalContact.general}. No reembolsamos la parte del periodo ya disfrutada, salvo que el
        servicio no haya estado disponible por causa que nos sea imputable.
      </p>
      <p>
        Si contratas como <strong>consumidor</strong>, dispones de{" "}
        <strong>14 días naturales</strong> para desistir sin justificación. Al tratarse de un
        servicio digital de acceso inmediato, si nos pides empezar a usarlo dentro de ese plazo
        aceptas que la ejecución comience antes de que termine y que, una vez ejecutado por
        completo, pierdas el derecho de desistimiento. Este derecho no corresponde a quien contrata
        como empresa o profesional.
      </p>

      <h2>6. A quién se dirige el servicio</h2>
      <p>
        {brand.name} se ofrece y se contrata en el marco de una actividad{" "}
        <strong>empresarial o profesional</strong>: prepara candidaturas a licitaciones públicas,
        algo que por su naturaleza hacen empresas, autónomos y consultoras. El alta requiere los
        datos fiscales de una empresa o profesional.
      </p>
      <p>
        El formulario de esta web es una solicitud de contacto, no una contratación. Si aun así
        alguien contratara como consumidor, conservaría íntegros los derechos que la normativa de
        consumo le reconoce, incluidos los descritos en el apartado de cancelación.
      </p>

      <h2>7. Uso del sitio y del servicio</h2>
      <p>
        Te comprometes a hacer un uso lícito del servicio y a no realizar actividades que puedan
        dañar, sobrecargar o deteriorar su funcionamiento o el de terceros.
      </p>

      <h2>8. Ausencia de garantías sobre resultados</h2>
      <p>
        {brand.name} no garantiza la obtención de adjudicaciones ni sustituye el criterio
        profesional del equipo usuario. Ante cualquier discrepancia, prevalece el pliego y la
        documentación oficial de la licitación.
      </p>

      <h2>9. Aplicación privada</h2>
      <p>
        El uso de la aplicación disponible en <code>{siteConfig.appUrl}</code> se rige por estas
        condiciones y por las específicas que se indiquen en ella.
      </p>

      <h2>10. Modificaciones, ley aplicable y jurisdicción</h2>
      <p>
        Podremos actualizar estos términos; publicaremos la versión vigente en esta página, con su
        número de versión y su fecha. Se rigen por la legislación española.
      </p>
      <p>
        Si contratas como <strong>empresa, profesional o autónomo</strong>, las partes se someten a
        los juzgados y tribunales de <strong>Valencia</strong>, con renuncia a cualquier otro fuero
        que pudiera corresponderles.
      </p>
      <p>
        Si contratas como <strong>consumidor</strong>, esta cláusula no te aplica: el fuero es el
        que la ley te reconoce, normalmente el de tu domicilio. Tampoco pierdes ninguno de los
        derechos que la normativa de consumo te garantiza.
      </p>
    </LegalShell>
  );
}
