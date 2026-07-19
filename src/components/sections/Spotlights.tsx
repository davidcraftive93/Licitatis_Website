import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AiBadge } from "@/components/ui/AiBadge";
import { Icon } from "@/components/ui/icons";
import { MockByName } from "@/components/mockups/MockByName";
import { spotlights } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Spotlights() {
  return (
    <Section id="funcionalidades" tone="white">
      <SectionHeader
        eyebrow="Funcionalidades"
        title="Todo el proceso de una candidatura, potenciado con IA"
        description="De la lectura del pliego a la presentación: la IA hace lo repetitivo y tú mantienes el control."
      />

      <div className="mt-16 space-y-20 sm:space-y-24">
        {spotlights.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={s.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Texto */}
              <Reveal className={cn(reversed && "lg:order-2")}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {s.eyebrow}
                  </span>
                  {s.ai ? <AiBadge>IA</AiBadge> : null}
                  {s.status === "soon" ? <Badge tone="amber">Próximamente</Badge> : null}
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-pretty text-base leading-relaxed text-ink-500 sm:text-lg">
                  {s.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Icon name="check" size={13} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button href="#demo" variant="secondary" size="md" withArrow>
                    Verlo en una demo
                  </Button>
                </div>
              </Reveal>

              {/* Visual */}
              <Reveal delay={100} className={cn("relative", reversed && "lg:order-1")}>
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-6 -z-10 rounded-[2rem] opacity-20 blur-2xl",
                    s.ai ? "bg-gradient-ai" : "bg-gradient-brand",
                  )}
                />
                <MockByName visual={s.visual} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
