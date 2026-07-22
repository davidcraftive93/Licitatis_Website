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
              <td>Hostinger</td>
              <td>Alojamiento web (sitio estático)</td>
              <td>Logs de servidor</td>
              <td>Pendiente de confirmar (UE)</td>
            </tr>
            <tr>
              <td>HubSpot</td>
              <td>Gestión de contactos comerciales (formulario)</td>
              <td>Nombre, correo, empresa, mensaje</td>
              <td>Pendiente de confirmar (UE/EEUU + garantías)</td>
            </tr>
            <tr>
              <td>Google (Analytics 4)</td>
              <td>Analítica (solo si se activa y aceptas)</td>
              <td>Identificadores de uso agregados</td>
              <td>Pendiente de confirmar</td>
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
