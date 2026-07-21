import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { PassportMock } from "@/components/mockups/PassportMock";
import { TiltCard } from "@/components/motion/TiltCard";
import { passport } from "@/lib/content";

/** El Pasaporte del Licitador — el diferencial. Sección propia (§6). */
export function Passport() {
  return (
    <Section id="pasaporte" tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* Texto + highlights */}
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            {passport.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            {passport.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-500">{passport.lead}</p>

          <ul className="mt-7 space-y-4">
            {passport.highlights.map((h) => (
              <li key={h.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon name={h.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">{h.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {passport.contains.map((c) => (
              <span
                key={c.title}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-paper px-3 py-1 text-xs font-medium text-ink-600"
              >
                <Icon name={c.icon} size={13} className="text-brand-600" />
                {c.title}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Mock del Pasaporte, con profundidad 3D y animación al entrar. */}
        <Reveal delay={100} className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-8 -z-10 animate-aurora rounded-[2.5rem] bg-brand-400/25 blur-2xl"
          />
          <TiltCard maxTilt={4} idlePose="rotateX(1.5deg) rotateY(5deg)">
            <BrowserFrame
              url="app.licitatis.es/pasaporte"
              aria-label="Vista de demostración del Pasaporte del Licitador en LICITATIS"
            >
              <PassportMock />
            </BrowserFrame>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  );
}
