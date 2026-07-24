"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registro mínimo en cliente (sin exponer detalles internos al usuario).
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-semibold text-fg-strong">Algo no ha ido bien</h1>
      <p className="mt-2 max-w-md text-fg">
        Ha ocurrido un error inesperado. Puedes reintentar o volver al inicio.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Reintentar
        </button>
        <Button href="/" size="md" variant="secondary">
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}
