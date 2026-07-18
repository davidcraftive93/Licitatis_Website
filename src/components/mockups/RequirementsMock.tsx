import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Checklist documental de ejemplo (datos ficticios, solo demostración). */
const ITEMS: { label: string; done: boolean; owner: string }[] = [
  { label: "Declaración responsable", done: true, owner: "MR" },
  { label: "Solvencia económica y financiera", done: true, owner: "JL" },
  { label: "Solvencia técnica y profesional", done: true, owner: "JL" },
  { label: "Certificado de estar al corriente", done: false, owner: "AP" },
  { label: "Memoria técnica", done: false, owner: "CS" },
  { label: "Oferta económica", done: false, owner: "MR" },
];

export function RequirementsMock({ className }: { className?: string }) {
  const done = ITEMS.filter((i) => i.done).length;
  return (
    <div
      role="img"
      aria-label="Vista de demostración: checklist de requisitos documentales de una licitación"
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xs text-ink-400">EXP-2024-0142</span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-2xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
              En preparación
            </span>
          </div>
          <p className="mt-0.5 text-sm font-semibold text-ink-900">Requisitos documentales</p>
        </div>
        <div className="text-right">
          <div className="font-display text-lg font-bold text-brand-700">
            {done}/{ITEMS.length}
          </div>
          <div className="text-2xs text-ink-400">completados</div>
        </div>
      </div>
      <ul className="divide-y divide-ink-50">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-3 px-4 py-2.5">
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md ring-1 ring-inset",
                item.done
                  ? "bg-brand-600 text-white ring-brand-600"
                  : "bg-white text-transparent ring-ink-200",
              )}
            >
              <Icon name="check" size={13} />
            </span>
            <span
              className={cn(
                "flex-1 text-sm",
                item.done ? "text-ink-500 line-through decoration-ink-200" : "text-ink-800",
              )}
            >
              {item.label}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-2xs font-semibold text-ink-600">
              {item.owner}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
