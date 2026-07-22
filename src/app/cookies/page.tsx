import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

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
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al visitar un sitio
        web. Sirven para recordar preferencias, medir el uso del sitio o apoyar acciones de
        marketing.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <p>Clasificamos las cookies en las siguientes categorías:</p>
      <ul>
        <li>
          <strong>Necesarias:</strong> imprescindibles para el funcionamiento del sitio y para
          recordar tus preferencias de consentimiento. Están siempre activas.
        </li>
        <li>
          <strong>Analítica:</strong> nos ayudan a entender cómo se usa el sitio. Solo se activan
          con tu consentimiento. [Herramienta y cookies concretas pendientes de detallar, p. ej.
          Google Analytics 4.]
        </li>
        <li>
          <strong>Marketing:</strong> permiten medir campañas y la atribución de contactos. Solo se
          activan con tu consentimiento. [Cookies de HubSpot pendientes de detallar.]
        </li>
      </ul>
      <p>
        [Se recomienda incluir aquí una tabla con el nombre de cada cookie, su proveedor, finalidad
        y duración. Contenido pendiente de completar con auditoría de cookies.]
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
