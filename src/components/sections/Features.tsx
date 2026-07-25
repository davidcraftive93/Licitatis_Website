import { Section, SectionHeader } from "@/components/ui/Section";
import { ExpedienteChip } from "@/components/ui/ExpedienteChip";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { features, featureLayers } from "@/lib/content";

/**
 * Anatomía del expediente (§8). Antes eran nueve tarjetas en una cuadrícula
 * plana: nueve promesas al mismo nivel, sin orden ni relación entre ellas, y el
 * visitante no sabía cuál importaba primero.
 *
 * Ahora son las CAPAS por las que pasa el mismo expediente que trae el
 * visitante desde el hero, en orden, y cada capa dice qué queda hecho al
 * terminarla.
 *
 * Deliberadamente sin pestañas ni acordeón: los nueve textos siguen visibles en
 * el HTML servido (indexables, legibles sin JavaScript y sin un gesto previo
 * para llegar al contenido). La "selección" del blueprint se resolvió con
 * jerarquía visual, que no esconde nada. Componente de servidor: 0 kB de JS.
 */
export function Features() {
  return (
    <Section id="funcionalidades" tone="white">
      <SectionHeader
        eyebrow="Anatomía del expediente"
        title="Todo lo que pasa después de encontrar la licitación"
        description="Las cuatro capas que LICITATIS monta sobre un mismo expediente. La IA extrae, clasifica, resume y redacta borradores; tú decides, apruebas y firmas."
      />

      <Reveal className="mt-6 flex justify-center">
        <ExpedienteChip state="Expediente organizado" />
      </Reveal>

      <ol className="mt-12 space-y-10">
        {featureLayers.map((layer, li) => {
          const items = features.filter((f) => f.layer === layer.id);
          return (
            <li key={layer.id}>
              <Reveal>
                {/* Cabecera de capa: número, qué es y qué deja hecho. */}
                <div className="flex flex-col gap-3 border-l-2 border-brand-300 pl-5 dark:border-brand-500/50 sm:flex-row sm:items-baseline sm:gap-5">
                  <span className="font-mono text-xs font-semibold text-brand-700 dark:text-brand-300">
                    Capa {layer.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-fg-strong sm:text-2xl">
                      {layer.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-pretty text-sm leading-relaxed text-fg">
                      {layer.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((feature, i) => (
                  <Reveal key={feature.title} delay={(i % 3) * 60}>
                    <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-surface-raised hover:shadow-card dark:border-brand-500/30">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-brand group-hover:text-white group-hover:shadow-brand-glow dark:bg-brand-500/15 dark:text-brand-300">
                        <Icon name={feature.icon} size={22} />
                      </span>
                      <h4 className="mt-4 text-base font-semibold text-fg-strong">
                        {feature.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-fg">{feature.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              {/* Costura entre capas: se ve que una se apoya en la anterior. */}
              {li < featureLayers.length - 1 ? (
                <div aria-hidden="true" className="mt-10 flex justify-center">
                  <span className="h-8 w-px bg-gradient-to-b from-brand-300 to-transparent dark:from-brand-500/50" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
