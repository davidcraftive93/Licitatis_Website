import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { plans, planLimitRows, planNames } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <Section id="planes" tone="paper">
      <SectionHeader
        eyebrow="Planes"
        title="Cuatro planes, límites reales"
        description="Lo que ves es lo que hay: estos límites son los que aplica el servidor, sin letra pequeña. Y ahora mismo, todo en beta gratuita."
      />

      <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 60} className="h-full">
            <article
              className={cn(
                "relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300 sm:p-7",
                plan.highlighted
                  ? "bg-ink-950 text-ink-100 shadow-lift ring-1 ring-brand-500/40 hover:shadow-brand-glow-lg"
                  : "border border-ink-100 bg-white shadow-soft hover:-translate-y-1 hover:shadow-card",
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-2xs font-bold uppercase tracking-wide text-white shadow-sm">
                  Recomendado
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
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm">
                    <Icon
                      name="check"
                      size={16}
                      className={cn(
                        "mt-0.5 shrink-0",
                        plan.highlighted ? "text-brand-400" : "text-brand-600",
                      )}
                    />
                    <span className={plan.highlighted ? "text-ink-200" : "text-ink-600"}>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href="#beta"
                  variant={plan.highlighted ? "gradient" : "secondary"}
                  size="sm"
                  className="w-full"
                >
                  {plan.name === "Free" ? "Empezar gratis" : "Solicitar acceso"}
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Tabla de límites reales */}
      <Reveal delay={120} className="mt-12">
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white shadow-soft">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Límites reales por plan</caption>
            <thead>
              <tr className="border-b border-ink-100">
                <th scope="col" className="px-5 py-4 text-left font-semibold text-ink-500">
                  Límite
                </th>
                {planNames.map((name) => (
                  <th
                    key={name}
                    scope="col"
                    className="px-5 py-4 text-center font-semibold text-ink-900"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {planLimitRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-5 py-3 text-left font-medium text-ink-700">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-5 py-3 text-center text-ink-600">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <p className="mt-6 text-center text-xs text-ink-400">
          En el plan <strong className="font-semibold text-ink-600">Free</strong> la IA es simulada
          (etiquetada como tal en la app); en Starter, Pro y Agency es IA real. Los precios se
          anunciarán al salir de beta.
        </p>
      </Reveal>
    </Section>
  );
}
