import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { PrintButton } from "@/components/layout/PrintButton";
import { hasUnresolvedLegalData, type LegalDocMeta } from "@/lib/legal";

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
   * Muestra el aviso de «texto pendiente de revisión legal».
   *
   * Por defecto NO se decide a mano: sale de `hasUnresolvedLegalData()`, que mira si
   * queda algún marcador [[DATO]] en la fuente legal. Así el aviso desaparece solo
   * cuando de verdad no falta nada, y reaparece solo si alguien vuelve a dejar un dato
   * sin resolver. Un booleano escrito a mano se queda desactualizado y acaba mintiendo
   * en las dos direcciones.
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
  draft = hasUnresolvedLegalData(),
}: LegalShellProps) {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <div className="no-print flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-fg-strong"
        >
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Volver al inicio
        </Link>
        <PrintButton />
      </div>

      <h1 className="mt-6 text-3xl font-semibold text-fg-strong sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-3 text-lg text-fg">{intro}</p> : null}

      {docMeta ? (
        <p className="mt-3 text-xs text-fg-muted">
          Versión: {docMeta.version} · Última actualización: {docMeta.updated}
        </p>
      ) : null}

      {draft ? (
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-500/15"
        >
          <Icon name="alert-triangle" size={18} className="mt-0.5 shrink-0" />
          <p>
            <strong>Faltan datos por resolver.</strong> Este documento contiene marcadores
            <code> [[ASÍ]] </code> en lugar de datos reales, que deben sustituirse antes de darlo
            por bueno. Mientras existan, esta página no se indexa y el control previo al despliegue
            sigue bloqueando la publicación.
          </p>
        </div>
      ) : null}

      {toc && toc.length > 1 ? (
        <nav
          aria-label="Índice de la página"
          className="mt-6 rounded-xl border border-hairline bg-surface p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
            En esta página
          </p>
          <ol className="mt-2 grid gap-1 sm:grid-cols-2">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="legal-prose mt-8">{children}</div>

      <p className="mt-12 text-xs text-fg-muted">
        Documento generado como borrador; no constituye asesoramiento jurídico.
      </p>
    </Container>
  );
}
