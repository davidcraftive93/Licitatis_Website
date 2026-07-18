import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { audiences } from "@/lib/content";

export function Audiences() {
  return (
    <Section id="para-quien" tone="paper">
      <SectionHeader
        eyebrow="Para quién es"
        title="Pensado para cada rol del equipo de licitaciones"
        description="Desde quien se presenta de forma ocasional hasta equipos que gestionan decenas de candidaturas al año. Cada perfil obtiene lo que necesita."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience, i) => (
          <Reveal key={audience.title} delay={(i % 3) * 60}>
            <article className="group h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                <Icon name={audience.icon} size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{audience.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
