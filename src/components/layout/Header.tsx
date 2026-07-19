"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/icons";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/80 backdrop-blur-md transition-shadow duration-300",
        scrolled || open ? "border-ink-100 shadow-soft" : "border-ink-100/60",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="LICITATIS — Inicio" className="shrink-0 rounded-lg">
            <Logo />
          </Link>

          {/* Navegación de escritorio (centrada) */}
          <nav aria-label="Principal" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a
              href={siteConfig.appUrl}
              className="whitespace-nowrap text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
            >
              Iniciar sesión
            </a>
            <Button href="/#beta" size="sm" variant="gradient">
              Analizar licitación
            </Button>
          </div>

          {/* Botón de menú móvil */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-800 hover:bg-ink-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </Container>

      {/* Menú móvil */}
      {open ? (
        <div id="mobile-menu" className="lg:hidden">
          <Container>
            <nav aria-label="Principal (móvil)" className="border-t border-ink-100 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-700 hover:bg-ink-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button href="/#beta" size="md" variant="gradient" onClick={() => setOpen(false)}>
                  Analizar una licitación real
                </Button>
                <a
                  href={siteConfig.appUrl}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-800 hover:bg-ink-50"
                >
                  Iniciar sesión
                  <Icon name="external-link" size={14} />
                </a>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
