import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * Hero above-the-fold — la "superficie" del viaje: pliegos suspendidos en 3D
 * al fondo y el panel de control en perspectiva. Sin <Reveal> en el H1 (LCP).
 */
export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pb-24 pt-10 sm:pt-14 lg:pb-28">
      <HeroBackdrop />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-10">
          {/* Texto */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute h-1.5 w-1.5 animate-pulse-ring rounded-full bg-brand-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              Beta privada abierta a empresas y consultoras
            </span>

            <h1 className="mt-5 text-balance font-display text-[2.5rem] font-bold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.3rem]">
              Prepara licitaciones públicas con IA, control documental y{" "}
              <span className="text-gradient-live">menos riesgo de exclusión</span>.
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
              LICITATIS convierte pliegos en expedientes de candidatura: elegibilidad, documentación,
              tareas, memoria técnica, oferta económica, riesgos e informe para dirección.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button href="#beta" size="lg" variant="gradient" withArrow>
                  Analizar una licitación real
                </Button>
              </Magnetic>
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

          {/* Visual del producto en perspectiva 3D. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-8 -z-10 rounded-[2.5rem] bg-brand-400/25 blur-2xl"
            />
            <TiltCard maxTilt={4} idlePose="rotateX(2deg) rotateY(-5deg)">
              <div className="animate-float-slow">
                <BrowserFrame
                  className="shadow-float"
                  aria-label="Vista de demostración del expediente de una candidatura en LICITATIS"
                >
                  <DashboardMock />
                </BrowserFrame>
              </div>
            </TiltCard>

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

        {/* Invitación al descenso. */}
        <div className="mt-14 hidden justify-center lg:flex">
          <a
            href="#como-funciona"
            className="group flex flex-col items-center gap-2 text-xs font-medium text-ink-400 transition-colors hover:text-brand-700"
          >
            <span>Entra en el proceso</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-6 items-start justify-center rounded-full border border-ink-200 p-1.5 transition-colors group-hover:border-brand-300"
            >
              <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-brand-500" />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
