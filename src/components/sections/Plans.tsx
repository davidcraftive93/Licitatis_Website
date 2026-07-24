import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { plans, planLimitRows, planNames } from "@/lib/content";
import { billingNotice, vatLabel } from "@/lib/legal";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <Section id="planes" tone="paper">
      <SectionHeader
        eyebrow="Planes"
        title="Cuatro planes, límites reales"
        description="Lo que ves es lo que hay: estos límites son los que aplica el servidor, sin letra pequeña. Precios finales con IVA incluido, y un plan gratuito para empezar sin tarjeta."
      />

      <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 60} className="h-full">
            <article
              className={cn(
                "relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300 sm:p-7",
                plan.highlighted
                  ? "bg-ink-950 text-ink-100 shadow-lift ring-1 ring-brand-500/40 hover:shadow-brand-glow-lg"
                  : "border border-hairline bg-surface-raised shadow-soft hover:-translate-y-1 hover:shadow-card",
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
                  plan.highlighted ? "text-white" : "text-fg-strong",
                )}
              >
                {plan.name}
              </h3>
              <p className={cn("mt-1 text-sm", plan.highlighted ? "text-ink-300" : "text-fg")}>
                {plan.tagline}
              </p>

              {/* Precio final: los planes de pago llevan siempre "IVA incluido" a la vista. */}
              <div className="mt-4">
                <p
                  className={cn(
                    "font-display text-3xl font-bold leading-none",
                    plan.highlighted ? "text-white" : "text-fg-strong",
                  )}
                >
                  {plan.price}
                  {plan.period ? (
                    <span
                      className={cn(
                        "text-base font-semibold",
                        plan.highlighted ? "text-ink-300" : "text-fg-muted",
                      )}
                    >
                      {plan.period}
                    </span>
                  ) : null}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlighted ? "text-ink-300" : "text-fg-muted",
                  )}
                >
                  {plan.paid ? vatLabel : "Gratis, sin tarjeta"}
                </p>
              </div>
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
                    <span className={plan.highlighted ? "text-ink-200" : "text-fg"}>{h}</span>
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
        <div className="overflow-x-auto rounded-3xl border border-hairline bg-surface-raised shadow-soft">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Límites reales por plan</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="px-5 py-4 text-left font-semibold text-fg">
                  Límite
                </th>
                {planNames.map((name) => (
                  <th
                    key={name}
                    scope="col"
                    className="px-5 py-4 text-center font-semibold text-fg-strong"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {planLimitRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-5 py-3 text-left font-medium text-fg">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-5 py-3 text-center text-fg">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Aviso de facturación: UNA sola vez, bajo la tabla completa. Va siempre en el HTML
          servido (nunca tras hover, tooltip ni acordeón: en móvil no hay hover y es justo
          donde más falta hace). Es la defensa principal frente a disputas bancarias: quien
          paga debe poder asociar el cargo de su extracto con la sociedad que factura. */}
      <Reveal delay={140}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-fg-muted">
          {billingNotice}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-fg-muted">
          En el plan <strong className="font-semibold text-fg">Free</strong> la IA es simulada
          (etiquetada como tal en la app); en Starter, Pro y Agency es IA real.
        </p>
      </Reveal>
    </Section>
  );
}
