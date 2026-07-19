import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { features } from "@/lib/content";

/** "Un expediente inteligente por candidatura" — las 9 tarjetas del kit (§8). */
export function Features() {
  return (
    <Section id="funcionalidades" tone="white">
      <SectionHeader
        eyebrow="Un expediente inteligente por candidatura"
        title="Todo lo que pasa después de encontrar la licitación"
        description="La IA extrae, clasifica, resume y redacta borradores. Tú decides, apruebas y firmas."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 60}>
            <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-paper p-6 transition-all hover:-translate-y-0.5 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name={feature.icon} size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
