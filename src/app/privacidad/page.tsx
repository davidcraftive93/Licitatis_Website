import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";
import { company, brand, legalContact, legalRefs, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata LICITATIS los datos personales de quienes solicitan una demostración.",
  // Indexable: el noindex existía porque el documento tenía datos sin resolver, y ya
  // no los tiene. Un aviso legal que no se puede encontrar cumple peor su función.
  robots: { index: true, follow: true },
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
        Tratamos tus datos para gestionar tu solicitud sobre la base de la{" "}
        <strong>aplicación de medidas precontractuales</strong> a petición tuya (artículo 6.1.b del
        RGPD): nos escribes para pedir plaza en el programa y necesitamos tus datos para atenderte.
      </p>
      <p>
        El envío de <strong>comunicaciones comerciales</strong> tiene base distinta: tu{" "}
        <strong>consentimiento</strong> específico (artículo 6.1.a del RGPD), que prestas marcando
        una casilla opcional, nunca premarcada, y que puedes retirar cuando quieras sin que ello
        afecte a la gestión de tu solicitud ni a la licitud del tratamiento anterior a la retirada.
      </p>
      <p>
        Facilitar los datos del formulario es voluntario, pero sin los marcados como obligatorios no
        podemos atender la solicitud.
      </p>

      <h2>4. Destinatarios y transferencias internacionales</h2>
      <p>
        Utilizamos <strong>HubSpot, Inc.</strong> (25 First Street, Cambridge, MA 02141, Estados
        Unidos) como encargado del tratamiento para gestionar los contactos comerciales: trata tus
        datos únicamente siguiendo nuestras instrucciones y para las finalidades del apartado 2, con
        el contrato de encargo que la propia HubSpot publica en su{" "}
        <a href="https://legal.hubspot.com/dpa" target="_blank" rel="noopener noreferrer">
          Acuerdo de Tratamiento de Datos
        </a>
        . No cedemos tus datos a nadie más, salvo obligación legal.
      </p>
      <p>
        HubSpot ofrece alojamiento en la Unión Europea (centro de datos de Fráncfort, Alemania) y
        también en Estados Unidos; la región concreta depende de la configuración de la cuenta. Para
        los tratamientos que impliquen acceso desde Estados Unidos, HubSpot, Inc. está{" "}
        <strong>certificada en el EU-US Data Privacy Framework</strong> —marco declarado adecuado
        por la Comisión Europea mediante la Decisión de Ejecución (UE) 2023/1795— y aplica además
        las <strong>cláusulas contractuales tipo</strong> aprobadas por la Comisión para las
        transferencias entre sus sociedades.
      </p>
      <p>
        Puedes consultar el detalle en la <a href="/subencargados">lista de subencargados</a> y en
        la{" "}
        <a
          href="https://legal.hubspot.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidad de HubSpot
        </a>
        .
      </p>

      <h2>5. Conservación</h2>
      <p>Conservamos los datos el tiempo estrictamente necesario para cada finalidad:</p>
      <ul>
        <li>
          <strong>Solicitud de plaza en el programa:</strong> mientras dure la relación y, si no
          llega a haberla, hasta <strong>12 meses</strong> desde el último contacto, plazo en el que
          una conversación comercial puede razonablemente retomarse.
        </li>
        <li>
          <strong>Comunicaciones comerciales:</strong> hasta que retires tu consentimiento o
          solicites la baja.
        </li>
        <li>
          <strong>Prueba del consentimiento y de la baja:</strong> mientras puedan derivarse
          responsabilidades, con un máximo de <strong>3 años</strong>, que es el plazo general de
          prescripción de las acciones personales del artículo 1964.2 del Código Civil.
        </li>
      </ul>
      <p>
        Cumplidos esos plazos, los datos se suprimen o se anonimizan. Si nos pides antes la
        supresión, la atendemos salvo que debamos conservarlos por una obligación legal.
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
