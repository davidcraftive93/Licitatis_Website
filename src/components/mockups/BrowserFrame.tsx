import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
  /** Etiqueta de transparencia: son datos/pantallas de demostración. */
  demoLabel?: boolean;
  /**
   * Etiqueta accesible. El marco se expone como una sola imagen (role="img"),
   * de modo que los encabezados y datos ficticios del interior no contaminan
   * el árbol de accesibilidad ni el esquema de encabezados de la página.
   */
  "aria-label"?: string;
}

/**
 * Marco de "ventana de aplicación" para presentar mockups del producto.
 * Es una representación visual; las pantallas y datos son de demostración.
 */
export function BrowserFrame({
  children,
  url = "app.licitatis.es",
  className,
  demoLabel = true,
  "aria-label": ariaLabel = "Vista de demostración de la aplicación LICITATIS",
}: BrowserFrameProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-lift ring-1 ring-ink-900/5",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-ink-100 bg-ink-50/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        </div>
        <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 text-2xs text-ink-400 ring-1 ring-ink-100">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {url}
        </div>
        {demoLabel ? (
          <span className="hidden shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-2xs font-semibold text-amber-700 ring-1 ring-amber-200 sm:inline">
            Demo
          </span>
        ) : (
          <span className="w-6" />
        )}
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}
