"use client";

import { Icon } from "@/components/ui/icons";

/** Botón para imprimir/guardar como PDF la página legal actual. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-50"
    >
      <Icon name="document-search" size={14} />
      Imprimir o guardar en PDF
    </button>
  );
}
