import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { valueStats } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Banda de valor con cifras cualitativas honestas; las numéricas cuentan al entrar. */
export function ValueStats() {
  return (
    <section className="bg-surface py-14 sm:py-16">
      <Container>
        <div className="grid gap-6 rounded-4xl border border-hairline bg-surface-raised p-8 shadow-soft sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {valueStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 70}
              className={cn(
                "text-center lg:text-left",
                // Bordes por índice: en 2 col (sm) solo los impares; en 4 col (lg) todos menos el último.
                i % 2 === 0 && "sm:border-r sm:border-hairline",
                i === 1 && "lg:border-r lg:border-hairline",
              )}
            >
              <div className="text-gradient-brand font-display text-4xl font-bold leading-none">
                <CountUp value={stat.value} />
              </div>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-fg lg:mx-0">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
