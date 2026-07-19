import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/icons";
import { features } from "@/lib/content";

/** Rejilla compacta con todas las funcionalidades (resumen). */
export function Features() {
  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="Todo incluido"
        title="Una plataforma, todo el proceso"
        description="Todas las piezas para preparar, coordinar y controlar tus candidaturas en un solo lugar."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 60}>
            <article className="flex h-full items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-shadow hover:shadow-soft">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={feature.icon} size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[0.95rem] font-semibold text-ink-900">{feature.title}</h3>
                  {feature.status === "soon" ? <Badge tone="amber">Pronto</Badge> : null}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{feature.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="mt-8 text-center text-xs text-ink-400">
          Las funcionalidades marcadas como «Pronto» están planificadas y llegarán más adelante.
        </p>
      </Reveal>
    </Section>
  );
}
