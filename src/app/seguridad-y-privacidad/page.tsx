import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalContact, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Seguridad y privacidad",
  description: "Medidas técnicas y organizativas de la web pública de LICITATIS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/seguridad-y-privacidad" },
};

export default function SeguridadPage() {
  return (
    <LegalShell
      title="Seguridad y privacidad"
      intro="Medidas técnicas y organizativas aplicadas en esta web comercial."
      docMeta={legalDocs.seguridad}
    >
      <h2>1. Alcance</h2>
      <p>
        Este documento describe las medidas de la <strong>web pública</strong> de LICITATIS (landing
        comercial y formulario de contacto). La aplicación privada (app.licitatis.es) es un servicio
        independiente con sus propias medidas y documentación.
      </p>

      <h2>2. Medidas técnicas de la web (verificables en el código)</h2>
      <ul>
        <li>
          Conexión cifrada HTTPS forzada y cabeceras de seguridad (CSP, X-Frame-Options, etc.).
        </li>
        <li>
          Sin cookies de analítica ni de marketing antes de tu consentimiento; consentimiento
          granular, reversible y versionado.
        </li>
        <li>
          Recogida de datos minimizada: el formulario solo pide los datos necesarios para gestionar
          tu solicitud.
        </li>
        <li>
          El formulario no simula envíos: si el proveedor no entrega el dato, se te ofrece un canal
          de correo alternativo (no se pierden solicitudes de forma silenciosa).
        </li>
      </ul>

      <h2>3. Medidas organizativas</h2>
      <ul>
        <li>Principio de mínimo privilegio en el acceso a los contactos comerciales.</li>
        <li>
          Uso de proveedores como encargados del tratamiento con contrato; ver la lista de{" "}
          <a href="/subencargados">subencargados</a>.
        </li>
      </ul>

      <h2>4. Alojamiento y localización de datos</h2>
      <p>
        Esta web se sirve desde infraestructura de Hostinger en la Unión Europea; a la fecha de esta
        versión, el servidor que responde en licitatis.es está en París (Francia). Los datos que
        envías por el formulario los trata HubSpot, con alojamiento en la Unión Europea (Fráncfort)
        o en Estados Unidos según la configuración de la cuenta y, en ese segundo caso, al amparo
        del EU-US Data Privacy Framework y de cláusulas contractuales tipo. El detalle está en la{" "}
        <a href="/privacidad">política de privacidad</a> y en la lista de{" "}
        <a href="/subencargados">subencargados</a>.
      </p>

      <h2>5. Contacto de seguridad</h2>
      <p>
        Si detectas un problema de seguridad, escríbenos a {legalContact.security} con el asunto
        «Seguridad». Te confirmaremos la recepción y te mantendremos informado del estado. Te
        pedimos que no hagas público el hallazgo hasta que podamos corregirlo, y te agradecemos que
        nos lo cuentes.
      </p>
    </LegalShell>
  );
}
