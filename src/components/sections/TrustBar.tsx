import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/lib/content";

export function TrustBar() {
  return (
    <div className="border-y border-ink-100 bg-white/60 py-8">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <p className="text-sm font-medium text-ink-500">
            Diseñado para el trabajo real de quienes preparan licitaciones
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600"
              >
                {sector}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
