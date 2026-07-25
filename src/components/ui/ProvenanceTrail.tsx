import { Icon } from "@/components/ui/icons";
import { ExpedienteChip } from "@/components/ui/ExpedienteChip";
import { demoProvenance, demoExpediente } from "@/lib/demo-expediente";
import { cn } from "@/lib/utils";

/**
 * Cadena de procedencia del análisis: hecho → inferencia → recomendación →
 * decisión humana, sobre el mismo bloqueante que recorre la página.
 *
 * La sección de transparencia decía «la IA no decide por ti» seis veces sin
 * mostrarlo nunca. Esto lo hace comprobable: se ve de dónde sale cada
 * afirmación y dónde se corta la cadena. Lista ordenada, texto plano, sin
 * JavaScript.
 */
export function ProvenanceTrail() {
  return (
    <div className="rounded-3xl border border-hairline bg-surface-raised p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
          De dónde sale cada afirmación
        </p>
        <ExpedienteChip state="Riesgos detectados" />
      </div>
      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg">
        El bloqueante de {demoExpediente.code}, nivel a nivel. La cadena se corta siempre en el
        mismo sitio: la decisión.
      </p>

      <ol className="mt-6 space-y-3">
        {demoProvenance.map((step, i) => {
          const isDecision = step.kind === "Decisión";
          return (
            <li key={step.kind} className="relative pl-11">
              {/* Hilo entre niveles. */}
              {i < demoProvenance.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[0.9375rem] top-9 w-px bg-hairline"
                />
              ) : null}

              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-xl",
                  isDecision
                    ? "bg-gradient-brand text-white"
                    : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
                )}
              >
                <Icon name={step.icon} size={16} />
              </span>

              <div className="pb-2">
                <p
                  className={cn(
                    "text-2xs font-semibold uppercase tracking-[0.12em]",
                    isDecision ? "text-brand-700 dark:text-brand-300" : "text-fg-muted",
                  )}
                >
                  {step.kind}
                </p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-fg-strong">
                  {step.text}
                </p>
                {step.source ? (
                  <p className="mt-1 text-2xs text-fg-muted">{step.source}</p>
                ) : (
                  <p className="mt-1 text-2xs font-medium text-brand-700 dark:text-brand-300">
                    Aquí no hay fuente que citar: hay una persona responsable.
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
