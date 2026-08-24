import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalContact, legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Subencargados del tratamiento",
  description: "Proveedores que intervienen en el tratamiento de datos de LICITATIS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/subencargados" },
};

export default function SubencargadosPage() {
  return (
    <LegalShell
      title="Subencargados del tratamiento"
      intro="Proveedores que intervienen en el tratamiento de datos de la web pública."
      docMeta={legalDocs.subencargados}
    >
      <h2>1. Subencargados de la web pública</h2>
      <p>
        Para prestar los servicios de esta web recurrimos a los siguientes proveedores. La región de
        datos y las garantías de transferencia internacional deben confirmarse antes de la apertura
        pública (revisión profesional).
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Servicio</th>
              <th>Datos</th>
              <th>Región / transferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hostinger International Ltd.</td>
              <td>Alojamiento web (sitio estático)</td>
              <td>Registros de servidor (dirección IP, fecha, recurso solicitado)</td>
              <td>
                Unión Europea. A la fecha de esta versión, el servidor que atiende licitatis.es está
                en París (Francia)
              </td>
            </tr>
            <tr>
              <td>HubSpot, Inc.</td>
              <td>Gestión de contactos comerciales (formulario de captación)</td>
              <td>Nombre, apellidos, correo, empresa, cargo, teléfono y mensaje</td>
              <td>
                Unión Europea (Fráncfort) o Estados Unidos según la configuración de la cuenta.
                Certificación en el EU-US Data Privacy Framework y cláusulas contractuales tipo
              </td>
            </tr>
            <tr>
              <td>Google Ireland Ltd.</td>
              <td>Analítica (Google Analytics 4). Solo si se activa y das tu consentimiento</td>
              <td>Identificadores de uso e IP anonimizada</td>
              <td>
                Unión Europea, con posible acceso desde fuera del EEE conforme a las garantías que
                Google documenta en sus términos de tratamiento de datos
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Subencargados de la aplicación</h2>
      <p>
        Los subencargados que intervienen en la aplicación privada (incluidos, en su caso,
        proveedores de IA) se detallan en la documentación de la propia aplicación y quedan sujetos
        a su acuerdo de tratamiento.
      </p>

      <h2>3. Actualizaciones y contacto</h2>
      <p>
        Podremos actualizar esta lista al incorporar o sustituir proveedores. Para cualquier
        consulta, escríbenos a {legalContact.privacy}.
      </p>
    </LegalShell>
  );
}
