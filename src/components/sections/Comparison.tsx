import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { comparisonRows } from "@/lib/content";

export function Comparison() {
  return (
    <Section id="comparativa" tone="white">
      <SectionHeader
        eyebrow="Comparativa"
        title="El mismo trabajo, con mucho más control"
        description="La diferencia no está en presentarse a más licitaciones, sino en hacerlo con orden, coordinación y trazabilidad."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Proceso tradicional */}
        <Reveal>
          <div className="h-full rounded-3xl border border-ink-100 bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Icon name="alert-triangle" size={20} />
              </span>
              <h3 className="text-lg font-semibold text-ink-800">Proceso tradicional</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {comparisonRows.map((row) => (
                <li key={row.dimension} className="flex gap-3 text-sm">
                  <Icon name="close" size={16} className="mt-0.5 shrink-0 text-ink-300" />
                  <span className="text-ink-500">
                    <span className="font-semibold text-ink-700">{row.dimension}:</span>{" "}
                    {row.traditional}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Con LICITATIS */}
        <Reveal delay={100}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/40 p-6 shadow-card ring-1 ring-brand-100 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="check" size={20} />
              </span>
              <h3 className="text-lg font-semibold text-ink-900">Con LICITATIS</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {comparisonRows.map((row) => (
                <li key={row.dimension} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" size={11} />
                  </span>
                  <span className="text-ink-600">
                    <span className="font-semibold text-ink-900">{row.dimension}:</span>{" "}
                    {row.licitatis}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
