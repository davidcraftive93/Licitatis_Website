import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { testimonialsPlaceholder } from "@/lib/content";

/**
 * Testimonios. PLACEHOLDER: los textos y autores son huecos a rellenar con
 * testimonios reales. No se inventan valoraciones ni empresas.
 */
export function Testimonials() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Testimonios"
        title="Lo que dirán quienes ya no licitan a mano"
        description="Espacio reservado para valoraciones reales de clientes (pendiente de completar)."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonialsPlaceholder.map((t, i) => (
          <Reveal key={i} delay={i * 70}>
            <figure className="flex h-full flex-col rounded-2xl border border-dashed border-ink-200 bg-paper p-6">
              <Icon name="quote" size={26} className="text-brand-300" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-sm font-semibold text-ink-400">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-800">{t.author}</span>
                  <span className="block text-xs text-ink-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
