import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { benefits } from "@/lib/content";

export function Benefits() {
  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="Ventajas"
        title="Lo que ganas con LICITATIS"
        description="Resultados concretos en el día a día de quien prepara candidaturas."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={(i % 4) * 60}>
            <article className="group h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand-glow">
                <Icon name={b.icon} size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
