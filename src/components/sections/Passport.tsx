import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { passport } from "@/lib/content";

/** El Pasaporte del Licitador — el diferencial. Sección propia (§6). */
export function Passport() {
  return (
    <Section id="pasaporte" tone="white">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        {/* Texto + qué contiene */}
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            {passport.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            {passport.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-500">{passport.lead}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {passport.contains.map((c) => (
              <li key={c.title} className="rounded-2xl border border-ink-100 bg-paper p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon name={c.icon} size={18} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{c.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{c.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Highlights "wow" */}
        <Reveal delay={100} className="lg:sticky lg:top-24">
          <div className="space-y-4 rounded-3xl bg-gradient-ink p-6 shadow-lift sm:p-8">
            <p className="text-sm font-semibold text-ink-100">Lo que lo hace único</p>
            {passport.highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-brand-300">
                    <Icon name={h.icon} size={18} />
                  </span>
                  <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{h.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
