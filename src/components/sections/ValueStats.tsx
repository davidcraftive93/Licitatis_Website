import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { valueStats } from "@/lib/content";

/** Banda de valor con cifras cualitativas honestas (no métricas de clientes inventadas). */
export function ValueStats() {
  return (
    <section className="bg-paper py-14 sm:py-16">
      <Container>
        <div className="grid gap-6 rounded-4xl border border-ink-100 bg-white p-8 shadow-soft sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {valueStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 70}
              className="text-center sm:border-r sm:border-ink-100 sm:last:border-r-0 lg:text-left"
            >
              <div className="font-display text-4xl font-bold leading-none text-gradient-brand">
                {stat.value}
              </div>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink-500 lg:mx-0">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
