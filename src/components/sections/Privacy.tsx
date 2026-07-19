import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { privacyPoints, CONTACT_EMAIL } from "@/lib/content";

export function Privacy() {
  return (
    <Section id="seguridad" tone="ink" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grid-light bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
        <div className="absolute -top-20 right-1/4 h-64 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      </div>
      <div className="relative">
        <SectionHeader
          tone="dark"
          eyebrow="Confianza y seguridad"
          title="Tu documentación es información confidencial"
          description="Documentos y expedientes aislados por organización · acceso por roles · sin usar tus documentos para entrenar modelos · toda salida de IA con revisión humana."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {privacyPoints.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 60}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-10 text-center text-sm text-ink-300">
            Para políticas avanzadas de retención y cumplimiento,{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand-300 underline-offset-4 hover:underline"
            >
              escríbenos
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
