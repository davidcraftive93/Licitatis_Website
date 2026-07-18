import { cn } from "@/lib/utils";

/** Cronograma de ejemplo (fechas ficticias, solo demostración). */
const STEPS: { date: string; label: string; state: "done" | "current" | "todo" }[] = [
  { date: "02 sep", label: "Publicación del anuncio", state: "done" },
  { date: "04 sep", label: "Análisis del pliego", state: "done" },
  { date: "11 sep", label: "Preparación de documentación", state: "current" },
  { date: "16 sep", label: "Revisión interna", state: "todo" },
  { date: "18 sep", label: "Presentación", state: "todo" },
];

export function TimelineMock({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Vista de demostración: cronograma de una candidatura a licitación"
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-4 shadow-card",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900">Cronograma</p>
        <span className="text-2xs text-ink-400">EXP-2024-0142</span>
      </div>
      <ol className="relative ml-1.5 space-y-3.5 border-l border-ink-100 pl-5">
        {STEPS.map((s) => (
          <li key={s.label} className="relative">
            <span
              className={cn(
                "absolute -left-[1.6rem] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-white",
                s.state === "done" && "bg-brand-600",
                s.state === "current" && "bg-amber-500",
                s.state === "todo" && "bg-ink-200",
              )}
            >
              {s.state === "current" ? (
                <span className="h-3.5 w-3.5 animate-pulse-ring rounded-full bg-amber-400" />
              ) : null}
            </span>
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  "text-sm",
                  s.state === "todo" ? "text-ink-400" : "font-medium text-ink-800",
                )}
              >
                {s.label}
              </span>
              <span className="shrink-0 font-mono text-2xs text-ink-400">{s.date}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
