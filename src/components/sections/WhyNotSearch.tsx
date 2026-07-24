import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { searchVsLicitatis } from "@/lib/content";

export function WhyNotSearch() {
  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="No es un buscador"
        title="Un buscador te avisa. LICITATIS te lleva hasta la oferta lista."
        description="La diferencia no está en encontrar la oportunidad, sino en todo lo que viene después."
      />

      <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-hairline bg-surface-raised shadow-soft">
        <div className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="bg-surface-sunken/60 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-fg">Un buscador</p>
          </div>
          <div className="bg-brand-50/60 px-6 py-4 dark:bg-brand-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
              LICITATIS
            </p>
          </div>
        </div>
        <ul className="divide-y divide-hairline">
          {searchVsLicitatis.map((row, i) => (
            <Reveal
              as="li"
              key={row.licitatis}
              delay={i * 60}
              className="grid grid-cols-1 transition-colors hover:bg-brand-50/30 dark:bg-brand-500/10 sm:grid-cols-2"
            >
              <div className="flex items-start gap-3 px-6 py-4 text-sm text-fg">
                <Icon name="close" size={16} className="mt-0.5 shrink-0 text-ink-300" />
                {row.search}
              </div>
              <div className="flex items-start gap-3 border-t border-hairline px-6 py-4 text-sm font-medium text-fg sm:border-l sm:border-t-0">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-brand-glow">
                  <Icon name="check" size={11} />
                </span>
                {row.licitatis}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
