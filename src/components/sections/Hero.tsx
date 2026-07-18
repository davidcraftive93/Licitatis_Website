import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";

/**
 * Hero above-the-fold. No usa <Reveal> a propósito: el contenido de la primera
 * pantalla (incluido el H1, candidato a LCP) debe verse en el primer paint, sin
 * depender de la hidratación del cliente.
 */
export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
      {/* Fondo: rejilla sutil + resplandor de marca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-ink bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-300/25 blur-3xl" />
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* Columna de texto */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3 py-1 text-xs font-semibold text-ink-600 shadow-sm backdrop-blur">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white">
                <Icon name="check" size={11} />
              </span>
              Preparación · Coordinación · Control
            </span>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              El copiloto para preparar y controlar tus{" "}
              <span className="text-brand-700">licitaciones</span>
            </h1>

            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-500">
              LICITATIS reúne pliegos, requisitos, documentos, tareas y plazos en un proceso claro y
              coordinado. Menos trabajo manual, más control y menor riesgo de exclusión por errores
              formales.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#demo" size="lg" withArrow>
                Solicitar demostración
              </Button>
              <Button href="#como-funciona" size="lg" variant="secondary">
                Ver cómo funciona
              </Button>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-ink-400">
              <Icon name="users" size={16} className="text-brand-600" />
              Pensado para equipos que preparan candidaturas a licitaciones públicas y privadas.
            </p>
          </div>

          {/* Columna visual (mockup de demostración, expuesto como una sola imagen) */}
          <div className="relative">
            <div className="animate-float">
              <BrowserFrame aria-label="Vista de demostración del panel de licitaciones de LICITATIS">
                <DashboardMock />
              </BrowserFrame>
            </div>

            {/* Tarjetas flotantes de acento (decorativas) */}
            <div
              aria-hidden="true"
              className="absolute -left-4 bottom-10 hidden rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 shadow-lift sm:block"
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

            <div
              aria-hidden="true"
              className="absolute -right-3 -top-4 hidden rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 shadow-lift md:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon name="checklist" size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-900">Requisitos 12/14</div>
                  <div className="text-2xs text-ink-400">Checklist documental</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
