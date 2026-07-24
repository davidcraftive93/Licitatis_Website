import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { problemSolution } from "@/lib/content";

export function ProblemSolution() {
  return (
    <Section tone="paper">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display text-2xl font-semibold text-fg-strong sm:text-3xl">
          «El problema no es encontrar licitaciones.{" "}
          <span className="text-brand-700 dark:text-brand-300">
            Lo que cuesta dinero es lo de después.
          </span>
          »
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-hairline bg-surface-raised p-8 transition-shadow duration-300 hover:shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-sunken text-fg">
              <Icon name="alert-triangle" size={22} />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-fg-strong">{problemSolution.a.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-fg">{problemSolution.a.body}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/50 p-8 shadow-card ring-1 ring-brand-100 transition-shadow duration-300 hover:shadow-brand-glow dark:border-brand-500/30 dark:bg-brand-500/10 dark:ring-brand-500/25">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-aurora rounded-full bg-brand-300/30 blur-2xl"
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand-glow">
              <Icon name="check" size={22} />
            </span>
            <h2 className="relative mt-4 text-xl font-semibold text-fg-strong">
              {problemSolution.b.title}
            </h2>
            <p className="relative mt-3 text-base leading-relaxed text-fg">
              {problemSolution.b.body}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
