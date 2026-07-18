import { Icon, type IconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Datos de ejemplo, ficticios y neutrales. Solo con fines de demostración visual. */
const NAV: { icon: IconName; label: string; active?: boolean }[] = [
  { icon: "dashboard", label: "Panel" },
  { icon: "route", label: "Licitaciones", active: true },
  { icon: "layers", label: "Documentos" },
  { icon: "tasks", label: "Tareas" },
  { icon: "calendar", label: "Calendario" },
  { icon: "chart", label: "Métricas" },
];

const STATS = [
  { label: "En preparación", value: "7", tone: "amber" as const },
  { label: "En plazo", value: "12", tone: "brand" as const },
  { label: "Presentadas", value: "34", tone: "ink" as const },
];

type Estado = "En preparación" | "En revisión" | "Presentada";

const TENDERS: {
  exp: string;
  title: string;
  entity: string;
  estado: Estado;
  progress: number;
  days: number;
  team: string[];
}[] = [
  {
    exp: "EXP-2024-0142",
    title: "Servicios de mantenimiento de instalaciones",
    entity: "Administración local (ejemplo)",
    estado: "En preparación",
    progress: 64,
    days: 6,
    team: ["MR", "JL"],
  },
  {
    exp: "EXP-2024-0138",
    title: "Suministro de equipamiento informático",
    entity: "Organismo autonómico (ejemplo)",
    estado: "En revisión",
    progress: 88,
    days: 3,
    team: ["AP", "MR", "CS"],
  },
  {
    exp: "EXP-2024-0129",
    title: "Consultoría de transformación digital",
    entity: "Ente público (ejemplo)",
    estado: "Presentada",
    progress: 100,
    days: 0,
    team: ["JL"],
  },
  {
    exp: "EXP-2024-0151",
    title: "Servicios de limpieza y conserjería",
    entity: "Administración local (ejemplo)",
    estado: "En preparación",
    progress: 32,
    days: 12,
    team: ["CS", "AP"],
  },
];

const estadoStyles: Record<Estado, string> = {
  "En preparación": "bg-amber-50 text-amber-700 ring-amber-200",
  "En revisión": "bg-brand-50 text-brand-700 ring-brand-200",
  Presentada: "bg-ink-100 text-ink-600 ring-ink-200",
};

function Avatar({ initials, i }: { initials: string; i: number }) {
  const tones = [
    "bg-brand-100 text-brand-800",
    "bg-ink-100 text-ink-700",
    "bg-amber-100 text-amber-700",
  ];
  return (
    <span
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full text-2xs font-semibold ring-2 ring-white",
        tones[i % tones.length],
      )}
    >
      {initials}
    </span>
  );
}

export function DashboardMock() {
  return (
    <div className="flex min-h-[420px] text-left">
      {/* Barra lateral */}
      <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-ink-100 bg-white/60 p-3 md:flex">
        <div className="mb-3 flex items-center gap-2 px-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-sm font-bold text-brand-400">
            L
          </span>
          <span className="font-display text-sm font-semibold text-ink-900">Licitatis</span>
        </div>
        {NAV.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm",
              item.active ? "bg-brand-50 font-semibold text-brand-800" : "text-ink-500",
            )}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </div>
        ))}
      </aside>

      {/* Contenido principal */}
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-base font-semibold text-ink-900">Licitaciones</p>
            <p className="text-xs text-ink-400">Estado de tus candidaturas</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs text-ink-400 ring-1 ring-ink-100 sm:flex">
              <Icon name="document-search" size={14} /> Buscar
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-2.5 py-1.5 text-xs font-semibold text-white">
              + Nueva
            </span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-3 ring-1 ring-ink-100">
              <div
                className={cn(
                  "font-display text-xl font-bold",
                  s.tone === "amber" && "text-amber-600",
                  s.tone === "brand" && "text-brand-700",
                  s.tone === "ink" && "text-ink-800",
                )}
              >
                {s.value}
              </div>
              <div className="text-2xs text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Lista de licitaciones */}
        <div className="mt-4 space-y-2.5">
          {TENDERS.map((t) => (
            <div
              key={t.exp}
              className="rounded-xl bg-white p-3 ring-1 ring-ink-100 transition-shadow hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xs text-ink-400">{t.exp}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset",
                        estadoStyles[t.estado],
                      )}
                    >
                      {t.estado}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-ink-900">{t.title}</p>
                  <p className="truncate text-xs text-ink-400">{t.entity}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <div className="flex -space-x-2">
                    {t.team.map((m, i) => (
                      <Avatar key={m} initials={m} i={i} />
                    ))}
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-1 text-2xs font-medium",
                      t.days === 0
                        ? "text-ink-400"
                        : t.days <= 3
                          ? "text-amber-600"
                          : "text-ink-500",
                    )}
                  >
                    <Icon name="clock" size={12} />
                    {t.days === 0 ? "Presentada" : `${t.days} días`}
                  </span>
                </div>
              </div>
              {/* Progreso del checklist documental */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      t.progress === 100 ? "bg-brand-500" : "bg-brand-600",
                    )}
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
                <span className="w-9 text-right text-2xs font-medium text-ink-400">
                  {t.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
