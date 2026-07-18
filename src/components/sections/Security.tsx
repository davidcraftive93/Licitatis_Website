import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { securityPoints } from "@/lib/content";

export function Security() {
  return (
    <Section id="seguridad" tone="ink" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
      </div>

      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Seguridad y confianza"
          title="Tus datos y tu trabajo, tratados con responsabilidad"
          description="La web pública y la aplicación privada son proyectos separados. La plataforma se diseña con el control de acceso y el cumplimiento normativo como objetivo permanente."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityPoints.map((point, i) => (
            <Reveal key={point.title} delay={(i % 3) * 60}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon name={point.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{point.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-ink-300">
            No exhibimos sellos ni certificaciones de las que no dispongamos. La información sobre
            certificaciones concretas (por ejemplo ISO, ENS o SOC 2) se comunicará únicamente cuando
            esté confirmada.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
