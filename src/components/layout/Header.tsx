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
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-ink-100 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" aria-label="LICITATIS — Inicio" className="rounded-lg">
            <Logo />
          </Link>

          {/* Navegación de escritorio */}
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={siteConfig.appUrl}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900"
            >
              Iniciar sesión
              <Icon name="external-link" size={14} />
            </a>
            <Button href="/#demo" size="sm">
              Solicitar demostración
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
                <Button href="/#demo" size="md" onClick={() => setOpen(false)}>
                  Solicitar demostración
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
