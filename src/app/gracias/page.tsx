import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { CONTACT_EMAIL } from "@/lib/content";

/**
 * Página de agradecimiento. Hoy **nada del sitio la enlaza**: existe para poder
 * apuntarla como destino de redirección cuando se configure el formulario de HubSpot.
 *
 * El copy anterior prometía «una sesión adaptada a tu caso» y hablaba de una
 * solicitud de demostración: es de otra campaña. El programa vigente es Beta Partner
 * y no promete ninguna sesión a medida, así que en cuanto alguien apuntara aquí, la
 * persona que acaba de dejar su lead habría leído una promesa que nadie hace.
 */
export const metadata: Metadata = {
  title: "Solicitud recibida",
  description: "Hemos recibido tu solicitud de plaza en la beta de LICITATIS.",
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white">
        <Icon name="check" size={32} />
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-fg-strong sm:text-4xl">Solicitud recibida</h1>
      <p className="mt-3 max-w-md text-pretty text-fg">
        Gracias por tu interés en el programa Beta Partner de LICITATIS. Nuestro equipo se pondrá en
        contacto contigo para la activación y para analizar tu primera licitación real.
      </p>
      <p className="mt-3 max-w-md text-sm text-fg-muted">
        Si necesitas algo antes, escríbenos a{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <div className="mt-8">
        <Button href="/" size="md">
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}
