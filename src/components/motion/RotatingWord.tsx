"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
  words: string[];
  /** Milisegundos entre palabras. */
  interval?: number;
  className?: string;
}

/**
 * Rota una lista de frases con deslizamiento vertical. Reserva el ancho de la
 * frase más larga (sin saltos de layout). Con prefers-reduced-motion se queda
 * en la primera. Para AT anuncia la lista completa una sola vez (sr-only).
 */
export function RotatingWord({ words, interval = 2400, className }: RotatingWordProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduced, paused, words.length, interval]);

  return (
    <span
      className={cn("relative inline-grid overflow-hidden align-bottom", className)}
      // Mecanismo de pausa (SC 2.2.2): el movimiento se detiene al señalar/enfocar.
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span className="sr-only">{words.join(", ")}</span>
      {/* Fantasma que fija el ancho al de la frase más larga. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-all duration-500 ease-out-expo",
            i === index ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
