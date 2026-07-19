import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clientLogosPlaceholder } from "@/lib/content";

/**
 * Banda de logos de clientes. PLACEHOLDER: las tarjetas son huecos a rellenar con
 * logotipos reales. No se afirma un número de clientes ni se usan marcas inventadas.
 */
export function LogosBand() {
  return (
    <div className="border-y border-ink-100 bg-white/60 py-9">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium text-ink-500">
            Pensado para el trabajo real de quienes preparan licitaciones
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {clientLogosPlaceholder.map((label, i) => (
              <li
                key={`${label}-${i}`}
                className="flex h-10 items-center gap-2 rounded-lg border border-dashed border-ink-200 bg-white px-4 text-sm font-semibold text-ink-300"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <p className="text-2xs text-ink-400">Espacio para logotipos de clientes (pendiente).</p>
        </Reveal>
      </Container>
    </div>
  );
}
