"use client";

import { useEffect, useState } from "react";
import { useRafCallback } from "@/components/motion/hooks";

/**
 * Barra fina de progreso de lectura pegada al borde superior (sobre el header).
 * Metáfora del "descenso": cuánto llevas recorrido del viaje.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useRafCallback(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-brand"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
