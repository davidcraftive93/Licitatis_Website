import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AiBadge } from "@/components/ui/AiBadge";
import { Magnetic } from "@/components/motion/Magnetic";

/** Cierre del viaje: vuelta a la superficie con el CTA definitivo. */
export function FinalCta() {
  return (
    <section className="bg-surface pb-20 pt-4 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ink px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-light bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
              <div className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 animate-aurora rounded-full bg-brand-500/30 blur-3xl" />
              <div className="dark:bg-amber-500/150/15 absolute -bottom-24 left-1/4 h-56 w-72 animate-aurora rounded-full bg-amber-50 blur-3xl [animation-delay:-5s]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-ink-100 ring-1 ring-white/15">
                <AiBadge>IA</AiBadge>
                Plan gratuito
              </span>
              <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
                La próxima licitación se prepara mejor con LICITATIS
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-200">
                Sube el pliego. Te decimos si puedes presentarte, con qué riesgo y qué falta para
                estar listos.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <Button href="#beta" size="lg" variant="gradient" withArrow>
                    Analizar una licitación real
                  </Button>
                </Magnetic>
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
