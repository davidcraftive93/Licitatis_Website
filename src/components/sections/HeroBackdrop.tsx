"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useFinePointer, useRafCallback } from "@/components/motion/hooks";
import { ConstellationCanvas } from "@/components/motion/ConstellationCanvas";

/** Página de pliego flotando en el campo de profundidad del hero. */
interface Page {
  depth: number; // 0 (fondo) .. 1 (frente): cuánto sigue al puntero
  tilt: number; // rotación en grados
  className: string; // posición y tamaño (en el wrapper que ondula)
}

const PAGES: Page[] = [
  { depth: 0.25, tilt: -7, className: "left-[4%] top-[12%] h-40 w-32 opacity-40 blur-[1.5px]" },
  { depth: 0.45, tilt: 5, className: "left-[16%] top-[52%] h-32 w-24 opacity-50 blur-[1px]" },
  {
    depth: 0.35,
    tilt: 9,
    className: "right-[30%] top-[64%] h-28 w-[5.5rem] opacity-40 blur-[1px]",
  },
  { depth: 0.6, tilt: 6, className: "right-[8%] top-[10%] h-36 w-28 opacity-60" },
  { depth: 1, tilt: -9, className: "right-[20%] top-[40%] h-20 w-16 opacity-80" },
];

/**
 * Fondo vivo del hero: rejilla + auroras + foco que sigue al puntero + haz de
 * "radar" descendente + pliegos suspendidos en 3D que ondulan y hacen parallax.
 * Sin JS o en táctil queda como composición estática elegante; el listener
 * global solo vive mientras el hero está en pantalla.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const [visible, setVisible] = useState(true);
  const active = fine && !reduced && visible;

  // El listener global de pointermove solo vive mientras el hero está en pantalla.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;
    const { innerWidth, innerHeight } = window;
    // Parallax de los pliegos (-1..1) + posición del foco en px locales.
    node.style.setProperty("--mx", ((clientX / innerWidth) * 2 - 1).toFixed(3));
    node.style.setProperty("--my", ((clientY / innerHeight) * 2 - 1).toFixed(3));
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--sx", `${(clientX - rect.left).toFixed(0)}px`);
    node.style.setProperty("--sy", `${(clientY - rect.top).toFixed(0)}px`);
  });

  useEffect(() => {
    if (!active) return;
    const handler = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [active, onMove]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="depth-field pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Fondo de "cabina": rejilla clara + auroras intensas de marca. */}
      <div className="absolute inset-0 bg-grid-light bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] animate-aurora rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 animate-aurora rounded-full bg-brand-500/20 blur-3xl [animation-delay:-4s]" />

      {/* Foco que sigue al puntero (estático arriba a la derecha sin ratón). */}
      <div className="hero-spotlight absolute left-0 top-0" />

      {/* Haz de "radar" que barre el hero de arriba abajo (sutil: pasa tras el texto). */}
      <div className="absolute inset-x-0 top-0 hidden md:block">
        <div className="h-24 animate-beam bg-gradient-to-b from-transparent via-brand-400/15 to-transparent" />
      </div>

      {/* Constelación de expedientes que responde al puntero. */}
      <ConstellationCanvas className="absolute inset-0 h-full w-full" />

      {/* Pliegos suspendidos: ondulan (wrapper) y hacen parallax (página). */}
      <div className="absolute inset-0 hidden md:block">
        {PAGES.map((p, i) => (
          <div
            key={i}
            className={`absolute animate-float-slow ${p.className}`}
            style={{ animationDelay: `${-i * 1.4}s`, animationDuration: `${6 + (i % 3)}s` }}
          >
            <div
              className="pliego-page inset-0"
              style={
                {
                  "--depth": p.depth,
                  "--tilt": `${p.tilt}deg`,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>

      {/* Viñeta inferior: funde el hero oscuro hacia la siguiente sección. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
