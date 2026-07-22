import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies utiliza la web de LICITATIS y cómo puedes gestionarlas.",
  // noindex mientras el contenido tenga placeholders sin resolver (revisión legal pendiente).
  robots: { index: false, follow: false },
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

      <h2>2. Cookies que utilizamos</h2>
      <p>
        Esta web es un sitio estático. En una primera visita <strong>no</strong> se cargan cookies
        de analítica ni de marketing: solo se activan tras tu consentimiento. Relación de cookies y
        tecnologías por categoría:
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
              <td>LICITATIS (1ª parte)</td>
              <td>Recordar tu elección de cookies</td>
              <td>180 días</td>
            </tr>
            <tr>
              <td>
                <code>hubspotutk</code>
              </td>
              <td>Marketing</td>
              <td>HubSpot</td>
              <td>Atribución de contactos (solo si aceptas marketing)</td>
              <td>Hasta 13 meses</td>
            </tr>
            <tr>
              <td>
                <code>_ga</code>, <code>_ga_*</code>
              </td>
              <td>Analítica</td>
              <td>Google Analytics 4</td>
              <td>Medición de uso agregada (solo si se activa la analítica y aceptas)</td>
              <td>Hasta 24 meses</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La analítica (Google Analytics 4) está desactivada por defecto y solo se habilita si el
        propietario la activa y tú prestas tu consentimiento. La confirmación definitiva de las
        cookies de terceros (HubSpot/Google) queda sujeta a revisión antes de la apertura pública.
      </p>

      <h2>3. Gestión del consentimiento</h2>
      <p>
        Al acceder por primera vez te mostramos un banner para aceptar, rechazar o configurar las
        cookies no necesarias. Puedes cambiar tu decisión en cualquier momento desde el enlace
        <strong> «Preferencias de cookies»</strong> disponible en el pie de página.
      </p>

      <h2>4. Cómo desactivarlas en tu navegador</h2>
      <p>
        También puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que
        deshabilitar algunas cookies puede afectar al funcionamiento del sitio.
      </p>
    </LegalShell>
  );
}
