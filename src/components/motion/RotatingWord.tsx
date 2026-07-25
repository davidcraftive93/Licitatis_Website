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
 * en la primera. La propia frase funciona como control accesible para pausar
 * o reanudar la rotación con ratón, foco, Enter o Espacio.
 */
export function RotatingWord({ words, interval = 2400, className }: RotatingWordProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const canRotate = !reduced && words.length > 1;
  const paused = !canRotate || manualPaused || interacting;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [paused, words.length, interval]);

  return (
    <button
      type="button"
      className={cn(
        "relative inline-grid appearance-none overflow-hidden border-0 bg-transparent p-0 text-left align-bottom",
        className,
      )}
      aria-disabled={!canRotate}
      aria-pressed={canRotate ? manualPaused : undefined}
      aria-label={
        canRotate
          ? `${manualPaused ? "Reanudar" : "Pausar"} rotación. Funciones: ${words.join(", ")}`
          : `Funciones: ${words.join(", ")}. La animación está desactivada.`
      }
      onClick={() => {
        if (canRotate) setManualPaused((value) => !value);
      }}
      onPointerEnter={() => {
        if (canRotate) setInteracting(true);
      }}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => {
        if (canRotate) setInteracting(true);
      }}
      onBlur={() => setInteracting(false)}
    >
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
    </button>
  );
}
