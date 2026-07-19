import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/icons";
import { audiences, sectors } from "@/lib/content";

export function DualAudience() {
  return (
    <Section id="para-quien" tone="paper">
      <SectionHeader
        eyebrow="Dos públicos, un producto"
        title="Para quien se presenta y para quien prepara por otros"
        description="Empresas que licitan y consultoras que gestionan concursos de varios clientes."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {audiences.map((a, i) => (
          <Reveal key={a.eyebrow} delay={i * 90}>
            <article className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon name={a.icon} size={24} />
                </span>
                {a.badge ? <Badge tone="amber">{a.badge}</Badge> : null}
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                {a.eyebrow}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-ink-900">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{a.text}</p>
              <ul className="mt-5 space-y-2.5">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Icon name="check" size={13} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
        <span className="text-sm text-ink-400">Pensado para:</span>
        {sectors.map((s) => (
          <span
            key={s}
            className="rounded-full border border-ink-200 bg-white px-3 py-1 text-sm font-medium text-ink-600"
          >
            {s}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
