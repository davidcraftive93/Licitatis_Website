import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Gracias por tu solicitud",
  description: "Hemos recibido tu solicitud de demostración de LICITATIS.",
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white">
        <Icon name="check" size={32} />
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-fg-strong sm:text-4xl">
        Gracias por tu interés
      </h1>
      <p className="mt-3 max-w-md text-fg">
        Hemos recibido tu solicitud de demostración. Nuestro equipo se pondrá en contacto contigo lo
        antes posible para organizar una sesión adaptada a tu caso.
      </p>
      <div className="mt-8">
        <Button href="/" size="md">
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}
