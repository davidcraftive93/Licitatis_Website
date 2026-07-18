import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { DemoForm } from "@/components/forms/DemoForm";

const benefits = [
  "Una sesión guiada y adaptada a cómo trabajas hoy.",
  "Resolvemos tus dudas sobre pliegos, documentación, tareas y plazos.",
  "Verás cómo se ordena el proceso de principio a fin.",
  "Sin compromiso.",
];

export function DemoSection() {
  return (
    <Section id="demo" tone="white">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            Demostración
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Solicita una demostración de LICITATIS
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-500">
            Cuéntanos cómo preparas tus candidaturas y te enseñamos cómo LICITATIS puede ayudarte a
            hacerlo con menos trabajo manual y más control.
          </p>
          <ul className="mt-7 space-y-3.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-ink-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name="check" size={13} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-3xl border border-ink-100 bg-paper p-6 shadow-card sm:p-8">
            <DemoForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
