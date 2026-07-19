import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { AiBadge } from "@/components/ui/AiBadge";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";

/** Hero above-the-fold — sin <Reveal> (el H1 es candidato a LCP y debe verse al instante). */
export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-12">
      {/* Fondo: malla de gradientes + rejilla sutil */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-ink bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_65%)]" />
        <div className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute left-1/3 top-40 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10">
          {/* Texto */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 py-1 pl-1 pr-3 text-xs font-semibold text-ink-600 shadow-sm backdrop-blur">
              <AiBadge>IA</AiBadge>
              El copiloto de licitaciones con inteligencia artificial
            </span>

            <h1 className="mt-5 text-balance text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.6rem]">
              La <span className="text-gradient">IA</span> que prepara y controla tus licitaciones
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
              LICITATIS analiza pliegos con IA, organiza requisitos y documentos, y coordina tareas
              y plazos. Menos trabajo manual, menos riesgo de errores y todo tu proceso bajo control.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#demo" size="lg" variant="gradient" withArrow>
                Solicitar demostración
              </Button>
              <Button href="#como-funciona" size="lg" variant="secondary">
                Ver cómo funciona
              </Button>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <li className="flex items-center gap-1.5">
                <Icon name="check" size={16} className="text-brand-600" /> Adaptada a tu caso
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="check" size={16} className="text-brand-600" /> Sin compromiso
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="check" size={16} className="text-brand-600" /> Para equipos que licitan
              </li>
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-ai opacity-25 blur-2xl"
            />
            <div className="animate-float-slow">
              <BrowserFrame
                className="shadow-float"
                aria-label="Vista de demostración del panel de licitaciones de LICITATIS"
              >
                <DashboardMock />
              </BrowserFrame>
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-4 bottom-12 hidden rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ai text-white">
                  <Icon name="sparkles" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Pliego resumido</div>
                  <div className="text-2xs text-ink-400">14 requisitos detectados</div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -right-3 -top-4 hidden rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur md:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Icon name="clock" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Plazo en 3 días</div>
                  <div className="text-2xs text-ink-400">EXP-2024-0138</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
