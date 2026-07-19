import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

/** Barra superior de contacto (estilo comercial). Se oculta en móvil para ganar espacio. */
export function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-ink-950 text-ink-200 md:block">
      <Container>
        <div className="flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2 text-ink-300">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-ai text-white">
              <Icon name="sparkles" size={10} />
            </span>
            Software de licitaciones con inteligencia artificial
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-1.5 text-ink-300 transition-colors hover:text-white"
            >
              <Icon name="mail" size={13} />
              {siteConfig.contactEmail}
            </a>
            <Link
              href="/#demo"
              className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-300"
            >
              <Icon name="message" size={13} />
              Habla con el equipo
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
