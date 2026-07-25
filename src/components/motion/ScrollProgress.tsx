"use client";

import { useEffect, useRef } from "react";
import { useRafCallback } from "@/components/motion/hooks";

/**
 * Barra fina de progreso de lectura pegada al borde superior (sobre el header).
 * Metáfora del "descenso": cuánto llevas recorrido del viaje.
 *
 * La actualización escribe el transform directamente en el nodo. El scroll puede
 * dispararse decenas de veces por segundo y no necesita provocar un render de React.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  const update = useRafCallback(() => {
    const node = ref.current;
    if (!node) return;

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    node.style.transform = `scaleX(${progress})`;
  });

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-brand"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
