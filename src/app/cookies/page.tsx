import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalDocs } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

/**
 * Estado REAL de las herramientas de terceros, leído del propio build.
 *
 * Escribir «hoy no hay cookies de terceros» a mano habría sido cierto el día que se
 * redactó y falso el día que se configure HubSpot, sin que nadie se enterase. Esto se
 * recalcula en cada despliegue.
 */
const HUBSPOT_ACTIVO = Boolean(process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID);
const ANALYTICS_ACTIVO =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && Boolean(process.env.NEXT_PUBLIC_GA_ID);

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies utiliza la web de LICITATIS y cómo puedes gestionarlas.",
  // Indexable: el noindex existía porque el documento tenía datos sin resolver, y ya
  // no los tiene. Un aviso legal que no se puede encontrar cumple peor su función.
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalShell
      title="Política de cookies"
      intro="Información sobre las cookies y tecnologías similares que utiliza este sitio."
      docMeta={legalDocs.cookies}
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al visitar un sitio
        web. Sirven para recordar preferencias, medir el uso del sitio o apoyar acciones de
        marketing.
      </p>

      <h2>2. Cookies y almacenamiento que utilizamos</h2>
      <p>
        Esta web es un sitio estático. En una primera visita <strong>no</strong> se instala ninguna
        cookie de analítica ni de marketing: solo se activan si prestas tu consentimiento. La tabla
        distingue lo que hay <em>siempre</em> de lo que aparece <em>solo si</em> consientes.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>licitatis_consent</code>
              </td>
              <td>Necesaria</td>
              <td>{siteConfig.name} (primera parte)</td>
              <td>Guardar tu decisión sobre cookies para no volver a preguntártela</td>
              <td>180 días</td>
            </tr>
            <tr>
              <td>
                <code>licitatis_theme</code> (almacenamiento local, no es una cookie)
              </td>
              <td>Necesaria</td>
              <td>{siteConfig.name} (primera parte)</td>
              <td>Recordar si prefieres el tema claro u oscuro</td>
              <td>Hasta que borres los datos del navegador</td>
            </tr>
            <tr>
              <td>
                <code>__hstc</code>, <code>hubspotutk</code>
              </td>
              <td>Marketing</td>
              <td>HubSpot, Inc.</td>
              <td>Identificar la visita y evitar contactos duplicados</td>
              <td>6 meses</td>
            </tr>
            <tr>
              <td>
                <code>__hssc</code>, <code>__hssrc</code>
              </td>
              <td>Marketing</td>
              <td>HubSpot, Inc.</td>
              <td>Distinguir sesiones y detectar si se reinicia el navegador</td>
              <td>30 minutos y sesión</td>
            </tr>
            <tr>
              <td>
                <code>_ga</code>, <code>_ga_*</code>
              </td>
              <td>Analítica</td>
              <td>Google Ireland Ltd. (Google Analytics 4)</td>
              <td>Medición agregada de uso, con anonimización de IP</td>
              <td>24 meses</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {HUBSPOT_ACTIVO || ANALYTICS_ACTIVO ? (
          <>
            En esta web están activos{" "}
            {[
              HUBSPOT_ACTIVO ? "el seguimiento de HubSpot" : null,
              ANALYTICS_ACTIVO ? "Google Analytics" : null,
            ]
              .filter(Boolean)
              .join(" y ")}
            . Sus cookies <strong>solo</strong> se instalan si aceptas la categoría correspondiente.
          </>
        ) : (
          <>
            <strong>Hoy no se instala ninguna cookie de terceros</strong>, aunque las aceptes: ni el
            seguimiento de HubSpot ni Google Analytics están activos en esta web. Se documentan aquí
            de antemano para que sepas qué implicaría aceptar si se activan.
          </>
        )}
      </p>
      <p>
        Las cookies de HubSpot y de Google son de <strong>terceros</strong>: quien las instala trata
        tus datos según sus propias condiciones. Puedes consultar la{" "}
        <a
          href="https://legal.hubspot.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidad de HubSpot
        </a>{" "}
        y la{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          política de privacidad de Google
        </a>
        .
      </p>

      <h2>3. Cómo se pide y se retira tu consentimiento</h2>
      <p>
        En la primera visita aparece un aviso con tres acciones al mismo nivel:{" "}
        <strong>aceptar</strong>, <strong>rechazar</strong> y <strong>configurar</strong>. Rechazar
        cuesta exactamente un clic, igual que aceptar; no hay opciones premarcadas y seguir
        navegando no equivale a aceptar.
      </p>
      <p>
        Puedes elegir por categorías: la analítica y el marketing son independientes entre sí. Las
        cookies necesarias no se pueden desactivar porque sin ellas no podemos ni recordar que has
        dicho que no.
      </p>
      <p>
        Tu decisión se guarda <strong>180 días</strong>; pasado ese plazo volvemos a preguntarte.
        Puedes cambiarla antes cuando quieras desde <strong>«Preferencias de cookies»</strong>, en
        el pie de página de cualquier página. Retirar el consentimiento es tan sencillo como darlo y
        no tiene ninguna consecuencia sobre el resto del sitio.
      </p>

      <h2>4. Cómo desactivarlas en tu navegador</h2>
      <p>
        Con independencia de lo anterior, puedes bloquear o eliminar cookies desde la configuración
        de tu navegador. Ten en cuenta que deshabilitar las necesarias puede afectar al
        funcionamiento del sitio, y que borrarlas hará que volvamos a preguntarte por tus
        preferencias.
      </p>

      <h2>5. Actualizaciones de esta política</h2>
      <p>
        Si añadimos, quitamos o cambiamos cookies, actualizaremos esta tabla y la versión del
        documento. Si el cambio afecta a cookies no necesarias, te volveremos a pedir el
        consentimiento antes de instalarlas.
      </p>
    </LegalShell>
  );
}
