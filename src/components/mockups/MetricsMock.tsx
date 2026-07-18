import { Icon, type IconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Indicadores de ejemplo (datos ficticios, solo demostración). */
const KPIS: { label: string; value: string; delta: string; icon: IconName }[] = [
  { label: "Candidaturas activas", value: "19", delta: "+4", icon: "route" },
  { label: "En plazo", value: "12", delta: "esta semana", icon: "calendar" },
  { label: "Documentos al día", value: "94%", delta: "+6 pts", icon: "layers" },
];

const BARS = [
  { m: "Ene", v: 6 },
  { m: "Feb", v: 9 },
  { m: "Mar", v: 7 },
  { m: "Abr", v: 12 },
  { m: "May", v: 10 },
  { m: "Jun", v: 15 },
];

export function MetricsMock({ className }: { className?: string }) {
  const max = Math.max(...BARS.map((b) => b.v));
  return (
    <div
      role="img"
      aria-label="Vista de demostración: panel de indicadores de licitaciones"
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-4 shadow-card",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900">Indicadores</p>
        <span className="rounded-full bg-ink-50 px-2 py-0.5 text-2xs text-ink-400">
          Datos de ejemplo
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl bg-paper p-2.5 ring-1 ring-ink-100">
            <Icon name={k.icon} size={16} className="text-brand-600" />
            <div className="mt-1.5 font-display text-lg font-bold text-ink-900">{k.value}</div>
            <div className="text-2xs leading-tight text-ink-400">{k.label}</div>
            <div className="mt-0.5 text-2xs font-medium text-brand-700">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 text-2xs font-medium text-ink-400">Candidaturas por mes</div>
        <div className="flex h-24 items-end gap-2">
          {BARS.map((b, i) => (
            <div key={b.m} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "w-full rounded-t-md",
                  i === BARS.length - 1 ? "bg-brand-600" : "bg-brand-200",
                )}
                style={{ height: `${(b.v / max) * 100}%` }}
              />
              <span className="text-2xs text-ink-400">{b.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
