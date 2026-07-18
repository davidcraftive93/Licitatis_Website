import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { pipelineSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Solution() {
  return (
    <Section id="solucion" tone="ink" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
        <div className="absolute left-1/2 top-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-3xl" />
      </div>

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="La solución"
          title="De un expediente disperso a un proceso bajo control"
          description="LICITATIS convierte cada oportunidad en un flujo ordenado. El equipo sabe qué hay que hacer, quién lo hace y para cuándo, con trazabilidad de principio a fin."
        />

        <div className="relative mt-14">
          {/* Rail horizontal (solo xl, cuando los 9 pasos van en una sola fila) */}
          <div
            aria-hidden="true"
            className="bg-white/12 absolute inset-x-6 top-[1.15rem] hidden h-px xl:block"
          />
          <ol className="grid gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-9">
            {pipelineSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.label}
                delay={i * 55}
                className="relative flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-4 ring-ink-950",
                    i === pipelineSteps.length - 1
                      ? "bg-brand-500 text-ink-950"
                      : "bg-ink-800 text-brand-300",
                  )}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-300">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <p className="max-w-xl text-balance text-center text-sm text-ink-300">
            Un mismo camino para todas las candidaturas: sin pasos que se olvidan, sin versiones
            perdidas y sin depender de la memoria de una sola persona.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
