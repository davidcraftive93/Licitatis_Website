import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { DemoForm } from "@/components/forms/DemoForm";
import { betaPartner, disclaimers, BETA_MAILTO } from "@/lib/content";

const included = [
  "Activación Documental IA: cargamos tu documentación",
  "Configuramos tu perfil de solvencia (Pasaporte)",
  "Analizamos contigo tu primera licitación real",
  "Soporte directo del equipo",
];

export function BetaPartner() {
  return (
    <Section id="beta" tone="white">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            {betaPartner.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-fg-strong sm:text-4xl">
            {betaPartner.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-fg">{betaPartner.sub}</p>

          <ul className="mt-7 space-y-3.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-fg">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Icon name="check" size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-sm text-fg">
            ¿Prefieres escribirnos directamente?{" "}
            <a
              href={BETA_MAILTO}
              className="font-semibold text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
            >
              Solicitar plaza por email
            </a>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-3xl border border-hairline bg-surface p-6 shadow-card sm:p-8">
            <DemoForm />
            <p className="mt-4 text-center text-xs text-fg-muted">{disclaimers.beta}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
