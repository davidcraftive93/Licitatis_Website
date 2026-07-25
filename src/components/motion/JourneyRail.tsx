"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface RailStation {
  id: string;
  label: string;
  /**
   * Secciones que pertenecen a esta estación pero no merecen punto propio.
   * Sin esto el rail se quedaba clavado en una parada mientras el visitante
   * atravesaba tres secciones: parecía roto justo cuando más se mira.
   */
  covers?: string[];
}

interface JourneyRailProps {
  stations: RailStation[];
}

/**
 * Rail de viaje: navegación vertical fija (escritorio ancho) con scroll-spy.
 * Cada estación es un tramo del "descenso"; el punto activo se ilumina y
 * al pasar el ratón se muestra la etiqueta. Es un <nav> accesible.
 */
export function JourneyRail({ stations }: JourneyRailProps) {
  const [active, setActive] = useState<string>(stations[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Cada id observado (parada o sección cubierta) apunta a su estación.
    const owner = new Map<string, string>();
    stations.forEach((s) => {
      owner.set(s.id, s.id);
      s.covers?.forEach((id) => owner.set(id, s.id));
    });

    // Banda central del viewport: la sección que la cruza manda.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const station = owner.get(entry.target.id);
          if (entry.isIntersecting && station) setActive(station);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const nodes = [...owner.keys()]
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [stations]);

  return (
    <nav
      aria-label="Recorrido de la página"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col items-end gap-1">
        {stations.map((station, i) => {
          const isActive = active === station.id;
          return (
            <li key={station.id} className="group relative flex items-center justify-end">
              {/* Etiqueta solo en hover/focus (siempre visible taparía contenido en ~1280-1440 px). */}
              <a
                href={`#${station.id}`}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center gap-2 rounded-full py-1 pl-2 pr-1 outline-offset-4"
              >
                <span
                  className={cn(
                    "pointer-events-none whitespace-nowrap rounded-full border px-2.5 py-0.5 text-2xs font-semibold opacity-0 transition-all duration-300",
                    "translate-x-1.5 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100",
                    isActive
                      ? "border-brand-200 bg-surface-raised/95 text-brand-800 shadow-soft dark:border-brand-500/30 dark:text-brand-200"
                      : "border-hairline bg-surface-raised/95 text-fg shadow-soft",
                  )}
                >
                  {station.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "h-5 w-2 bg-gradient-brand shadow-brand-glow"
                      : "h-2 w-2 bg-ink-200 group-hover:bg-brand-400",
                  )}
                />
              </a>
              {i < stations.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 right-[3px] h-1 w-px bg-ink-200/70"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
