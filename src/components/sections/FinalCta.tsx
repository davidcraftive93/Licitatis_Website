import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="bg-paper pb-20 pt-4 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-light bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
              <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Deja de gestionar licitaciones entre correos, carpetas y hojas de cálculo
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-200">
                Reúne pliegos, requisitos, documentos, tareas y plazos en un proceso claro,
                coordinado y bajo control.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="#demo" size="lg" variant="inverse" withArrow>
                  Solicitar una demostración
                </Button>
                <Button
                  href="#como-funciona"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Ver cómo funciona
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
