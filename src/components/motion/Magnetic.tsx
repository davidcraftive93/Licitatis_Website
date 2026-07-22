"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useFinePointer, useRafCallback } from "@/components/motion/hooks";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Desplazamiento máximo en px hacia el puntero. */
  strength?: number;
}

/**
 * Envoltorio "magnético": el contenido se desliza sutilmente hacia el puntero.
 * Solo puntero fino y sin prefers-reduced-motion.
 */
export function Magnetic({ children, className, strength = 5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = (clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const dy = (clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: dx * strength * 2, y: dy * strength * 2 });
  });

  return (
    <div
      ref={ref}
      className={cn("inline-flex will-change-transform", className)}
      style={{
        transform: `translate(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
            : undefined,
      }}
      onPointerMove={active ? (e) => onMove(e.clientX, e.clientY) : undefined}
      onPointerLeave={active ? () => setOffset({ x: 0, y: 0 }) : undefined}
    >
      {children}
    </div>
  );
}
