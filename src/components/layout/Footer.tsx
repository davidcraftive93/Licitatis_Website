import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/icons";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { legalLinks, navLinks, siteConfig } from "@/lib/site";
import { currentYear } from "@/lib/utils";

const productLinks = [
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Para quién es", href: "/#para-quien" },
  { label: "Seguridad", href: "/#seguridad" },
  { label: "Preguntas frecuentes", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-ink-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              {siteConfig.descriptor}. {siteConfig.shortValue}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <Icon name="mail" size={16} />
              {siteConfig.contactEmail}
            </a>
            <p className="mt-1 text-2xs text-ink-300">
              Correo de contacto pendiente de confirmación.
            </p>
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

          <nav aria-label="Navegación" className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Navegación</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.appUrl}
                  className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white"
                >
                  Iniciar sesión
                  <Icon name="external-link" size={13} />
                </a>
              </li>
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

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xs text-ink-300">
            © {currentYear()} LICITATIS. Todos los derechos reservados.
          </p>
          <p className="text-2xs text-ink-300">
            Razón social, NIF y domicilio pendientes de datos legales definitivos.
          </p>
        </div>
      </Container>
    </footer>
  );
}
