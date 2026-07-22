import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { legalLinks, siteConfig } from "@/lib/site";
import { disclaimers } from "@/lib/content";
import { currentYear } from "@/lib/utils";

const productLinks = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "El Pasaporte", href: "/#pasaporte" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planes", href: "/#planes" },
  { label: "Programa Beta", href: "/#beta" },
  { label: "Preguntas frecuentes", href: "/#faq" },
];

const companyPending = ["Sobre nosotros", "Blog", "Recursos"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 text-ink-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-64 w-[36rem] rounded-full bg-brand-600/10 blur-3xl"
      />
      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Marca + CTA */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              De pliego a candidatura preparada, controlada y defendible. La cabina de control de
              tus licitaciones públicas, con IA.
            </p>
            <div className="mt-5">
              <Button href="/#beta" size="sm" variant="gradient">
                Analizar una licitación real
              </Button>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <Icon name="mail" size={16} />
              {siteConfig.contactEmail}
            </a>
          </div>

          <nav aria-label="Producto" className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Producto</h2>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa" className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Empresa</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={siteConfig.appUrl}
                  className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white"
                >
                  Iniciar sesión
                  <Icon name="external-link" size={13} />
                </a>
              </li>
              {companyPending.map((label) => (
                <li key={label} className="flex items-center gap-2 text-sm text-ink-400">
                  {label}
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-2xs text-ink-400">
                    pronto
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton className="text-sm text-ink-300 hover:text-white" />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-3 border-t border-white/10 pt-6">
          <p className="text-2xs leading-relaxed text-ink-300">
            <strong className="font-semibold text-ink-200">{disclaimers.noGuarantee}</strong>
          </p>
          <p className="text-2xs leading-relaxed text-ink-400">{disclaimers.dataSources}</p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-2xs text-ink-400">
              © {currentYear()} LICITATIS · Beta gratuita. Razón social, NIF y domicilio pendientes
              de datos legales definitivos.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
