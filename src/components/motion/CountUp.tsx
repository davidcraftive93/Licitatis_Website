"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useInViewOnce } from "@/components/motion/hooks";

interface CountUpProps {
  /** Valor final. Si no es numérico se muestra tal cual (p. ej. "PLACSP"). */
  value: string | number;
  /** Duración en ms. */
  duration?: number;
  className?: string;
  /** Sufijo pegado a la cifra (p. ej. "%"). */
  suffix?: string;
}

/**
 * Cuenta de 0 al valor cuando entra en viewport (rAF + ease-out).
 * Con prefers-reduced-motion muestra el valor final directamente.
 */
export function CountUp({ value, duration = 1200, className, suffix = "" }: CountUpProps) {
  const target = typeof value === "number" ? value : Number.parseFloat(value);
  const isNumeric = Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref);
  const reduced = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    if (reduced || target === 0) {
      setCurrent(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico
      setCurrent(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isNumeric, inView, reduced, target, duration]);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {/* Cifra final para lectores de pantalla; la animada queda oculta para AT. */}
      <span className="sr-only">
        {target}
        {suffix}
      </span>
      <span aria-hidden="true">
        {inView ? current : 0}
        {suffix}
      </span>
    </span>
  );
}
