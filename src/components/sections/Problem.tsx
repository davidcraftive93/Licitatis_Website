import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { problemPoints } from "@/lib/content";

const fragments = [
  "Pliegos",
  "Correos",
  "Carpetas compartidas",
  "Hojas de cálculo",
  "Portales",
  "Mensajería",
  "Fechas límite",
];

export function Problem() {
  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="El problema"
        title="Preparar una licitación no debería ser una carrera de obstáculos"
        description="Cuando el proceso vive repartido entre herramientas, cada candidatura depende de que nadie se despiste. Eso cuesta tiempo, genera descoordinación y multiplica el riesgo de errores."
      />

      {/* Visual de la fragmentación */}
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <div className="rounded-2xl border border-dashed border-ink-300 bg-white/70 p-6 sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            El proceso habitual
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {fragments.map((f, i) => (
              <span key={f} className="flex items-center gap-2.5">
                <span className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-600 shadow-sm">
                  {f}
                </span>
                {i < fragments.length - 1 ? (
                  <span className="text-ink-300" aria-hidden="true">
                    +
                  </span>
                ) : null}
              </span>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-ink-500">
            = tiempo perdido, descoordinación, duplicidades y{" "}
            <span className="font-semibold text-amber-700">riesgo de exclusión</span> por un detalle
            formal.
          </p>
        </div>
      </Reveal>

      {/* Puntos de dolor */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {problemPoints.map((point, i) => (
          <Reveal key={point.title} delay={i * 60}>
            <article className="h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 text-ink-500">
                <Icon name={point.icon} size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{point.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
