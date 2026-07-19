import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <Section id="planes" tone="paper">
      <SectionHeader
        eyebrow="Planes"
        title="Un plan para cada forma de licitar"
        description="Elige el punto de partida. El precio se adapta a tu caso y volumen de candidaturas; te lo contamos en la demostración."
      />

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 80} className="h-full">
            <article
              className={cn(
                "relative flex h-full flex-col rounded-3xl p-7 sm:p-8",
                plan.highlighted
                  ? "bg-ink-950 text-ink-100 shadow-lift ring-1 ring-white/10"
                  : "border border-ink-100 bg-white shadow-soft",
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-ai px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white shadow-sm">
                  Más elegido
                </span>
              ) : null}

              <h3
                className={cn(
                  "font-display text-xl font-bold",
                  plan.highlighted ? "text-white" : "text-ink-900",
                )}
              >
                {plan.name}
              </h3>
              <p className={cn("mt-1 text-sm", plan.highlighted ? "text-ink-300" : "text-ink-500")}>
                {plan.tagline}
              </p>

              <div
                className={cn(
                  "mt-5 border-t pt-5",
                  plan.highlighted ? "border-white/10" : "border-ink-100",
                )}
              >
                <div
                  className={cn(
                    "font-display text-2xl font-bold",
                    plan.highlighted ? "text-white" : "text-ink-900",
                  )}
                >
                  Precio a medida
                </div>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlighted ? "text-ink-400" : "text-ink-400",
                  )}
                >
                  {plan.audience}
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Icon
                      name="check"
                      size={16}
                      className={cn("mt-0.5 shrink-0", plan.highlighted ? "text-brand-400" : "text-brand-600")}
                    />
                    <span className={plan.highlighted ? "text-ink-200" : "text-ink-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button
                  href="#demo"
                  variant={plan.highlighted ? "gradient" : "secondary"}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 text-center text-xs text-ink-400">
          No mostramos importes inventados: el precio se comunica de forma personalizada durante la
          demostración.
        </p>
      </Reveal>
    </Section>
  );
}
