import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AiBadge } from "@/components/ui/AiBadge";

export function FinalCta() {
  return (
    <section className="bg-paper pb-20 pt-4 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ink px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-light bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
              <div className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-ink-100 ring-1 ring-white/15">
                <AiBadge>IA</AiBadge>
                Empieza hoy
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
                Deja de licitar entre correos, carpetas y hojas de cálculo
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-200">
                Convierte pliegos, requisitos, documentos, tareas y plazos en un proceso claro,
                coordinado y bajo control. Con la IA de tu lado.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="#demo" size="lg" variant="gradient" withArrow>
                  Solicitar una demostración
                </Button>
                <Button
                  href="#planes"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Ver planes
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
