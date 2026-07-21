import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { valueStats } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Banda de valor con cifras cualitativas honestas; las numéricas cuentan al entrar. */
export function ValueStats() {
  return (
    <section className="bg-paper py-14 sm:py-16">
      <Container>
        <div className="grid gap-6 rounded-4xl border border-ink-100 bg-white p-8 shadow-soft sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {valueStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 70}
              className={cn(
                "text-center lg:text-left",
                // Bordes por índice: en 2 col (sm) solo los impares; en 4 col (lg) todos menos el último.
                i % 2 === 0 && "sm:border-r sm:border-ink-100",
                i === 1 && "lg:border-r lg:border-ink-100",
              )}
            >
              <div className="font-display text-4xl font-bold leading-none text-gradient-brand">
                <CountUp value={stat.value} />
              </div>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink-500 lg:mx-0">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
