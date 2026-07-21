"use client";

import { useEffect, useRef, useState } from "react";
import {
  usePrefersReducedMotion,
  useFinePointer,
  useRafCallback,
} from "@/components/motion/hooks";

/** Página de pliego flotando en el campo de profundidad del hero. */
interface Page {
  depth: number; // 0 (fondo) .. 1 (frente): cuánto sigue al puntero
  tilt: number; // rotación en grados
  className: string; // posición y tamaño
}

const PAGES: Page[] = [
  { depth: 0.25, tilt: -7, className: "left-[4%] top-[12%] h-40 w-32 opacity-40 blur-[1.5px]" },
  { depth: 0.45, tilt: 5, className: "left-[16%] top-[52%] h-32 w-24 opacity-50 blur-[1px]" },
  { depth: 0.8, tilt: -4, className: "left-[38%] top-[20%] h-24 w-20 opacity-70" },
  { depth: 0.35, tilt: 9, className: "right-[30%] top-[64%] h-28 w-[5.5rem] opacity-40 blur-[1px]" },
  { depth: 0.6, tilt: 6, className: "right-[8%] top-[10%] h-36 w-28 opacity-60" },
  { depth: 1, tilt: -9, className: "right-[20%] top-[40%] h-20 w-16 opacity-80" },
];

/**
 * Fondo del hero: rejilla + glow + "pliegos" suspendidos en 3D que hacen
 * parallax con el puntero (variables CSS --mx/--my, actualizadas con rAF).
 * Sin JS o en táctil queda como composición estática elegante.
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
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;
    const { innerWidth, innerHeight } = window;
    node.style.setProperty("--mx", ((clientX / innerWidth) * 2 - 1).toFixed(3));
    node.style.setProperty("--my", ((clientY / innerHeight) * 2 - 1).toFixed(3));
  });

  useEffect(() => {
    if (!active) return;
    const handler = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [active, onMove]);

  return (
    <div ref={ref} aria-hidden="true" className="depth-field pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Rejilla técnica + glows de marca. */}
      <div className="absolute inset-0 bg-grid-ink bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_60%)]" />
      <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] animate-aurora rounded-full bg-brand-200/50 blur-3xl" />
      <div className="absolute -left-32 top-1/2 h-72 w-72 animate-aurora rounded-full bg-amber-100/60 blur-3xl [animation-delay:-4s]" />

      {/* Pliegos suspendidos en profundidad. */}
      <div className="absolute inset-0 hidden md:block">
        {PAGES.map((p, i) => (
          <div
            key={i}
            className={`pliego-page ${p.className}`}
            style={
              {
                "--depth": p.depth,
                "--tilt": `${p.tilt}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
