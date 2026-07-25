import { demoExpediente, type ExpedienteState } from "@/lib/demo-expediente";
import { cn } from "@/lib/utils";

/**
 * Firma visual del hilo narrativo: donde aparece este chip, el visitante
 * reconoce que sigue EL MISMO expediente, y en qué estado está en ese tramo.
 *
 * Es texto plano en el HTML (sin JavaScript, indexable) y va SIEMPRE etiquetado
 * como demostración: el caso es ficticio y no puede confundirse con una
 * licitación real.
 */
export function ExpedienteChip({
  state,
  tone = "light",
  className,
}: {
  /** Estado del expediente en este punto de la página. */
  state: ExpedienteState;
  /** `dark` para las secciones de fondo tinta (hero, confianza, cierre). */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border px-3 py-1 text-2xs font-medium",
        tone === "dark"
          ? "border-white/15 bg-white/10 text-ink-100"
          : "border-hairline bg-surface-raised text-fg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-brand-400" : "bg-brand-600",
        )}
      />
      <span className={cn("font-mono", tone === "dark" ? "text-white" : "text-fg-strong")}>
        {demoExpediente.code}
      </span>
      <span aria-hidden="true" className="opacity-40">
        ·
      </span>
      <span>{state}</span>
      <span aria-hidden="true" className="opacity-40">
        ·
      </span>
      <span className={tone === "dark" ? "text-ink-300" : "text-fg-muted"}>Demo</span>
    </span>
  );
}
