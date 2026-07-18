import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/icons";
import { RequirementsMock } from "@/components/mockups/RequirementsMock";
import { MetricsMock } from "@/components/mockups/MetricsMock";
import { features } from "@/lib/content";

export function Features() {
  return (
    <Section id="funcionalidades" tone="white">
      <SectionHeader
        eyebrow="Funcionalidades"
        title="Todo lo necesario para preparar una candidatura, en un solo sitio"
        description="Funcionalidades orientadas a resultados: menos trabajo manual, mejor organización y más control sobre cada candidatura."
      />

      {/* Spotlight: dos capacidades clave con vista previa del producto */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="flex h-full flex-col gap-6 rounded-3xl border border-ink-100 bg-paper p-6 sm:p-8">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name="checklist" size={22} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">
                Requisitos y checklist documental
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Convierte cada pliego en una lista clara de requisitos y documentos, con estado y
                responsable. Sabes en todo momento qué falta antes de presentar.
              </p>
            </div>
            <RequirementsMock className="mt-auto" />
          </article>
        </Reveal>

        <Reveal delay={80}>
          <article className="flex h-full flex-col gap-6 rounded-3xl border border-ink-100 bg-paper p-6 sm:p-8">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name="chart" size={22} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">
                Visión del estado de tus candidaturas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Sigue el avance, los plazos y la actividad del equipo. La dirección obtiene
                visibilidad sin pedir informes elaborados a mano.
              </p>
            </div>
            <MetricsMock className="mt-auto" />
          </article>
        </Reveal>
      </div>

      {/* Rejilla completa de funcionalidades */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 60}>
            <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-paper p-6 transition-shadow hover:shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-inset-hairline">
                  <Icon name={feature.icon} size={22} />
                </span>
                {feature.status === "soon" ? <Badge tone="amber">Próximamente</Badge> : null}
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 text-center text-xs text-ink-400">
          Las funcionalidades marcadas como «Próximamente» están planificadas y estarán disponibles
          más adelante. El producto evoluciona de forma continua.
        </p>
      </Reveal>
    </Section>
  );
}
