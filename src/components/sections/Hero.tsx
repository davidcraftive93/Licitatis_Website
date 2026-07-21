import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingWord } from "@/components/motion/RotatingWord";

/** Términos del sector para la marquesina inferior del hero. */
const MARQUEE_TERMS = [
  "PLACSP",
  "BDNS",
  "CPV",
  "DEUC",
  "UTE",
  "ROLECE",
  "Solvencia técnica",
  "Baja temeraria",
  "Memoria técnica",
  "Garantía definitiva",
  "Criterios de adjudicación",
  "Perfil del contratante",
];

const ROTATING = [
  "la elegibilidad",
  "el checklist documental",
  "la memoria técnica",
  "los riesgos de exclusión",
  "los escenarios económicos",
  "el informe para dirección",
];

/**
 * Hero "cabina de control": sección oscura cinematográfica con constelación
 * interactiva, foco al puntero, radar, pliegos brillantes y entrada en cascada.
 * El H1 y el mock usan la variante -rise (solo transform): candidatos a LCP.
 */
export function Hero() {
  return (
    <section
      id="producto"
      className="relative overflow-hidden bg-ink-950 pb-0 pt-12 text-white sm:pt-16"
    >
      <HeroBackdrop />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-10">
          {/* Texto */}
          <div className="max-w-xl">
            <span className="enter inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-200 ring-1 ring-white/15 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute h-1.5 w-1.5 animate-pulse-ring rounded-full bg-brand-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              </span>
              Beta con plazas limitadas para empresas y consultoras
            </span>

            <h1
              className="enter-rise mt-5 text-balance font-display text-[2.5rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.3rem]"
              style={{ "--enter-delay": "80ms" } as React.CSSProperties}
            >
              Prepara licitaciones públicas con IA, control documental y{" "}
              <span className="text-gradient-live">menos riesgo de exclusión</span>.
            </h1>

            {/* Kicker rotatorio: lo que el producto resuelve, sin competir con el H1.
                (Sin degradado: bg-clip-text en el contenedor + hijos con transform
                dejaría el texto invisible en Chromium.) */}
            <p
              className="enter mt-4 text-lg font-semibold text-ink-200 sm:text-xl"
              style={{ "--enter-delay": "140ms" } as React.CSSProperties}
            >
              Te resuelve <RotatingWord words={ROTATING} className="text-brand-300" />
            </p>

            <p
              className="enter mt-4 text-pretty text-lg leading-relaxed text-ink-200"
              style={{ "--enter-delay": "200ms" } as React.CSSProperties}
            >
              Sube un pliego y LICITATIS te lo convierte en un expediente completo: si puedes
              presentarte, qué documentos faltan, los números y un informe para llevar a dirección.
            </p>

            <div
              className="enter mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ "--enter-delay": "280ms" } as React.CSSProperties}
            >
              <Magnetic>
                <Button href="#beta" size="lg" variant="gradient" withArrow>
                  Analizar una licitación real
                </Button>
              </Magnetic>
              <Button href="#beta" size="lg" variant="inverse">
                Ser Beta Partner
              </Button>
            </div>

            <p
              className="enter mt-6 flex items-start gap-2 text-sm text-ink-300"
              style={{ "--enter-delay": "380ms" } as React.CSSProperties}
            >
              <Icon name="shield" size={17} className="mt-0.5 shrink-0 text-brand-400" />
              La IA te ayuda, pero no decide por ti: cada análisis separa lo que es un hecho de lo
              que es una recomendación, y la última palabra siempre es tuya.
            </p>
          </div>

          {/* Visual del producto en perspectiva 3D (pop de luz sobre el fondo oscuro). */}
          <div
            className="enter-rise relative"
            style={{ "--enter-delay": "200ms" } as React.CSSProperties}
          >
            <div aria-hidden="true" className="absolute inset-6 -z-10">
              <div className="absolute inset-0 animate-aurora rounded-[2.5rem] bg-brand-500/30 blur-3xl" />
              <div className="absolute inset-x-10 bottom-0 top-1/2 animate-aurora rounded-[2.5rem] bg-amber-400/20 blur-3xl [animation-delay:-5s]" />
            </div>
            <TiltCard maxTilt={6} idlePose="rotateX(3deg) rotateY(-7deg)">
              <div className="animate-float-slow">
                <BrowserFrame
                  className="shadow-float ring-1 ring-white/10"
                  aria-label="Vista de demostración del expediente de una candidatura en LICITATIS"
                >
                  <DashboardMock />
                </BrowserFrame>
              </div>
            </TiltCard>

            <div
              aria-hidden="true"
              className="enter absolute -left-4 bottom-12 hidden rounded-xl border border-white/10 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:block"
              style={{ "--enter-delay": "550ms" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
                  <Icon name="sparkles" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Ir / no ir argumentado</div>
                  <div className="text-2xs text-ink-400">con revisión humana</div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="enter absolute -right-3 -top-4 hidden rounded-xl border border-white/10 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur md:block"
              style={{ "--enter-delay": "680ms" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Icon name="shield" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Escáner anti-exclusión</div>
                  <div className="text-2xs text-ink-400">antes de presentar</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>

      {/* Marquesina de términos del sector: la web "respira" oficio.
          Se pausa al señalarla/enfocarla (mecanismo de pausa de SC 2.2.2). */}
      <div
        className="marquee-pause enter relative mt-12 border-y border-white/5 py-4"
        style={{ "--enter-delay": "700ms" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="fade-edges overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {MARQUEE_TERMS.map((term) => (
                  <span
                    key={`${copy}-${term}`}
                    className="mx-6 flex items-center gap-6 whitespace-nowrap font-mono text-2xs uppercase tracking-[0.2em] text-ink-300"
                  >
                    {term}
                    <span className="h-1 w-1 rounded-full bg-brand-500/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* El último gesto del hero es la invitación a bajar. */}
      <Container>
        <div
          className="enter mt-8 hidden justify-center lg:flex"
          style={{ "--enter-delay": "800ms" } as React.CSSProperties}
        >
          <a
            href="#como-funciona"
            className="group flex flex-col items-center gap-2 text-xs font-medium text-ink-300 transition-colors hover:text-brand-300"
          >
            <span>Entra en el proceso</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors group-hover:border-brand-400/60"
            >
              <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-brand-400" />
            </span>
          </a>
        </div>
      </Container>

      {/* Puente hacia la sección clara: la "hoja" del siguiente tramo asoma. */}
      <div aria-hidden="true" className="mt-10">
        <div className="h-8 rounded-t-[2.5rem] bg-paper sm:h-10" />
      </div>
    </section>
  );
}
