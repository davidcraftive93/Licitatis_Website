import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";

interface LegalShellProps {
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Estructura común para las páginas legales, con aviso de contenido pendiente de revisión. */
export function LegalShell({ title, intro, children }: LegalShellProps) {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800"
      >
        <Icon name="arrow-right" size={16} className="rotate-180" />
        Volver al inicio
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-3 text-lg text-ink-500">{intro}</p> : null}

      <div
        role="note"
        className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
      >
        <Icon name="alert-triangle" size={18} className="mt-0.5 shrink-0" />
        <p>
          <strong>Texto pendiente de revisión legal.</strong> Este contenido es una plantilla de
          referencia con datos de ejemplo. Debe revisarlo y completarlo un profesional antes de la
          publicación. Los campos entre corchetes <code>[así]</code> deben sustituirse por datos
          reales.
        </p>
      </div>

      <div className="legal-prose mt-8">{children}</div>

      <p className="mt-12 text-xs text-ink-400">
        Última actualización: [pendiente]. Documento generado como borrador; no constituye
        asesoramiento jurídico.
      </p>
    </Container>
  );
}
