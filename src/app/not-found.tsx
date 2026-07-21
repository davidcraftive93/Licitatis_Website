import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-700">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink-900">No encontramos esta página</h1>
      <p className="mt-2 max-w-md text-ink-500">
        Es posible que el enlace haya cambiado o que la página ya no exista.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="md">
          Volver al inicio
        </Button>
        <Button href="/#beta" size="md" variant="secondary">
          Solicitar demostración
        </Button>
      </div>
    </Container>
  );
}
