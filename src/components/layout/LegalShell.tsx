import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { PrintButton } from "@/components/layout/PrintButton";
import type { LegalDocMeta } from "@/lib/legal";

export interface LegalTocItem {
  id: string;
  label: string;
}

interface LegalShellProps {
  title: string;
  intro?: string;
  children: ReactNode;
  /** Versión y fecha del documento (de la config legal central). */
  docMeta?: LegalDocMeta;
  /** Índice de navegación interna (para documentos largos). */
  toc?: LegalTocItem[];
  /**
   * true (por defecto) muestra el aviso de plantilla pendiente de revisión legal. Poner a
   * false solo cuando el contenido esté validado y sin placeholders.
   */
  draft?: boolean;
}

/** Estructura común para las páginas legales. */
export function LegalShell({
  title,
  intro,
  children,
  docMeta,
  toc,
  draft = true,
}: LegalShellProps) {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <div className="no-print flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800"
        >
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Volver al inicio
        </Link>
        <PrintButton />
      </div>

      <h1 className="mt-6 text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-3 text-lg text-ink-500">{intro}</p> : null}

      {docMeta ? (
        <p className="mt-3 text-xs text-ink-400">
          Versión: {docMeta.version} · Última actualización: {docMeta.updated}
        </p>
      ) : null}

      {draft ? (
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          <Icon name="alert-triangle" size={18} className="mt-0.5 shrink-0" />
          <p>
            <strong>Texto pendiente de revisión legal.</strong> Este contenido es una plantilla de
            referencia. Debe revisarlo y completarlo un profesional antes de la publicación. Los
            datos marcados como <code>[LEGAL_REVIEW_REQUIRED: …]</code> deben sustituirse por datos
            reales. Mientras tanto, esta página no se indexa.
          </p>
        </div>
      ) : null}

      {toc && toc.length > 1 ? (
        <nav
          aria-label="Índice de la página"
          className="mt-6 rounded-xl border border-ink-100 bg-paper p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            En esta página
          </p>
          <ol className="mt-2 grid gap-1 sm:grid-cols-2">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-brand-700 underline-offset-2 hover:underline"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="legal-prose mt-8">{children}</div>

      <p className="mt-12 text-xs text-ink-400">
        Documento generado como borrador; no constituye asesoramiento jurídico.
      </p>
    </Container>
  );
}
