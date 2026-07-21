import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
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
        <Reveal>
          <Accordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-ink-600">
            <span className="font-semibold text-ink-900">¿Tienes otra pregunta?</span> Cuéntanoslo y
            te respondemos.
          </p>
          <Button href="#beta" size="sm" withArrow>
            Solicitar demostración
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
