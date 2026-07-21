import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { problemSolution } from "@/lib/content";

export function ProblemSolution() {
  return (
    <Section tone="paper">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          «El problema no es encontrar licitaciones.{" "}
          <span className="text-brand-700">Lo que cuesta dinero es lo de después.</span>»
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-ink-100 bg-white p-8 transition-shadow duration-300 hover:shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-100 text-ink-500">
              <Icon name="alert-triangle" size={22} />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-ink-900">{problemSolution.a.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-500">{problemSolution.a.body}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/50 p-8 shadow-card ring-1 ring-brand-100 transition-shadow duration-300 hover:shadow-brand-glow">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-aurora rounded-full bg-brand-300/30 blur-2xl"
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand-glow">
              <Icon name="check" size={22} />
            </span>
            <h2 className="relative mt-4 text-xl font-semibold text-ink-900">
              {problemSolution.b.title}
            </h2>
            <p className="relative mt-3 text-base leading-relaxed text-ink-600">
              {problemSolution.b.body}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
