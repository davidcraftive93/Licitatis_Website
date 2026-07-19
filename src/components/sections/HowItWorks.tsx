import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { TimelineMock } from "@/components/mockups/TimelineMock";
import { howItWorksSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="paper">
      <SectionHeader
        eyebrow="Cómo funciona"
        title="De pliego a candidatura, paso a paso"
        description="Un flujo claro que ordena el trabajo desde que detectas la licitación hasta que decides y exportas."
      />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ol className="relative space-y-2">
          {howItWorksSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 70} className="relative">
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-900 font-display text-sm font-bold text-brand-400">
                    {step.number}
                  </span>
                  {i < howItWorksSteps.length - 1 ? (
                    <span className="my-1 w-px flex-1 bg-ink-200" aria-hidden="true" />
                  ) : null}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2">
                    <Icon name={step.icon} size={18} className="text-brand-700" />
                    <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-soft sm:p-7">
            <TimelineMock />
            <p className="mt-5 text-center text-xs text-ink-400">
              Vista de demostración. Cada candidatura mantiene su propio cronograma y estado.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
