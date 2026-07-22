import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { aiTransparency } from "@/lib/content";

/** Sección pública de transparencia de IA (§14 del mandato legal). */
export function AiTransparency() {
  return (
    <Section id="ia" tone="paper">
      <SectionHeader
        eyebrow={aiTransparency.eyebrow}
        title={aiTransparency.title}
        description={aiTransparency.lead}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aiTransparency.points.map((point, i) => (
          <Reveal key={point.title} delay={(i % 3) * 60}>
            <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name={point.icon} size={22} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{point.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-400">
          {aiTransparency.note}
        </p>
      </Reveal>
    </Section>
  );
}
