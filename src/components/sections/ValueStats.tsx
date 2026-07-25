import { Container } from "@/components/ui/Container";
import { ExpedienteChip } from "@/components/ui/ExpedienteChip";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { CountUp } from "@/components/motion/CountUp";
import { demoExpediente, daysLeftLabel } from "@/lib/demo-expediente";

/**
 * Hoja de ruta del expediente: la banda que sigue al hero deja de resumir la página
 * con cifras genéricas y presenta EL CASO que el visitante va a seguir.
 *
 * Antes eran cuatro punteros a secciones posteriores («6 pasos», «1 Pasaporte»…), que
 * contaban el final antes del principio y repetían contenido de más abajo. Ahora dan
 * continuidad hero → viaje: mismo expediente, datos concretos, una sola vez.
 */
const ROADMAP = [
  {
    icon: "id-card" as const,
    value: demoExpediente.code,
    label: "el expediente que seguimos en esta página",
    mono: true,
  },
  {
    icon: "euro" as const,
    value: demoExpediente.amountLabel,
    label: `valor estimado · CPV ${demoExpediente.cpv}`,
  },
  {
    icon: "clock" as const,
    value: daysLeftLabel(),
    label: "para presentar cuando lo encontramos",
  },
  {
    icon: "alert-triangle" as const,
    value: "1",
    label: "bloqueante que habría dejado la oferta fuera",
    countable: true,
  },
];

export function ValueStats() {
  return (
    <section id="el-caso" className="bg-surface py-14 sm:py-16">
      <Container>
        <div className="rounded-4xl border border-hairline bg-surface-raised p-8 shadow-soft sm:p-10">
          <Reveal className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              El caso que vas a seguir
            </p>
            <ExpedienteChip state="Oportunidad detectada" />
          </Reveal>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((item, i) => (
              <Reveal key={item.label} delay={i * 70} className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <Icon name={item.icon} size={18} />
                </span>
                <div className="min-w-0">
                  {/* Color plano, no degradado. `text-gradient-brand` pinta el texto
                      con `bg-clip-text`, y las paradas media y final del degradado
                      (#10B981 y #14B8A6) dan 2,54:1 y 2,49:1 contra el blanco de la
                      tarjeta: por debajo del 4,5:1 exigido. Aquí hay datos que hay
                      que poder leer (importe y plazo), no decoración. */}
                  <div
                    className={
                      item.mono
                        ? "font-mono text-lg font-semibold leading-tight text-fg-strong"
                        : "font-display text-2xl font-bold leading-none text-brand-800 dark:text-brand-300"
                    }
                  >
                    {item.countable ? <CountUp value={item.value} /> : item.value}
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-fg">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
