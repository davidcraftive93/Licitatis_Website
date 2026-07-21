import { Section, SectionHeader } from "@/components/ui/Section";
import { StepJourney } from "@/components/sections/StepJourney";

/**
 * "Cómo funciona" como descenso guiado: el mismo expediente de demostración
 * recorre los 6 pasos y la pantalla del panel cambia con el scroll.
 */
export function HowItWorks() {
  return (
    <Section id="como-funciona" tone="paper">
      <SectionHeader
        eyebrow="Cómo funciona"
        title="Viaja por dentro de una licitación"
        description="Del pliego al informe para dirección: sigue el expediente de demostración EXP-2024-0142 paso a paso y mira lo que LICITATIS hace en cada tramo."
      />
      <StepJourney />
    </Section>
  );
}
