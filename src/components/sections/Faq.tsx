import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <Section id="faq" tone="paper">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Todo lo que sueles querer saber"
        description="Y si te queda alguna duda, la resolvemos en la demostración."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink-900 transition-colors hover:bg-ink-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 sm:px-6">
                <span>{faq.question}</span>
                <Icon
                  name="chevron-down"
                  size={20}
                  className="shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-500 sm:px-6">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-ink-600">
            <span className="font-semibold text-ink-900">¿Tienes otra pregunta?</span> Cuéntanoslo y
            te respondemos.
          </p>
          <Button href="#demo" size="sm" withArrow>
            Solicitar demostración
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
