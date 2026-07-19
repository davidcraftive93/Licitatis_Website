import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";

/** Hero above-the-fold — sin <Reveal> (el H1 es candidato a LCP y debe verse al instante). */
export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-14">
      {/* Fondo sobrio: un único glow violeta + rejilla sutil (nada de blobs por todas partes). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-ink bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_60%)]" />
        <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-brand-200/50 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-10">
          {/* Texto */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
              Beta privada abierta a empresas y consultoras
            </span>

            <h1 className="mt-5 text-balance font-display text-[2.5rem] font-bold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.3rem]">
              Prepara licitaciones públicas con IA, control documental y{" "}
              <span className="text-gradient">menos riesgo de exclusión</span>.
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
              LICITATIS convierte pliegos en expedientes de candidatura: elegibilidad, documentación,
              tareas, memoria técnica, oferta económica, riesgos e informe para dirección.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#beta" size="lg" variant="gradient" withArrow>
                Analizar una licitación real
              </Button>
              <Button href="#beta" size="lg" variant="secondary">
                Ser Beta Partner
              </Button>
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm text-ink-500">
              <Icon name="shield" size={17} className="mt-0.5 shrink-0 text-brand-600" />
              La IA asiste, no decide: cada análisis separa hechos, inferencias y recomendaciones, y
              exige revisión humana.
            </p>
          </div>

          {/* Visual del producto */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-8 -z-10 rounded-[2.5rem] bg-brand-400/25 blur-2xl"
            />
            <div className="animate-float-slow">
              <BrowserFrame
                className="shadow-float"
                aria-label="Vista de demostración del expediente de una candidatura en LICITATIS"
              >
                <DashboardMock />
              </BrowserFrame>
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-4 bottom-12 hidden rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
                  <Icon name="sparkles" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Go / no-go argumentado</div>
                  <div className="text-2xs text-ink-400">con revisión humana</div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -right-3 -top-4 hidden rounded-xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur md:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Icon name="shield" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Anti-exclusión: 2 avisos</div>
                  <div className="text-2xs text-ink-400">antes de presentar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
