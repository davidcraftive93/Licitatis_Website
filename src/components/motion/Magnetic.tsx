"use client";

import { useRef, type ReactNode } from "react";
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
 *
 * El transform se aplica directamente al nodo y se limita a un cambio por frame.
 * Un CTA no necesita volver a renderizar su árbol completo durante el movimiento.
 */
export function Magnetic({ children, className, strength = 5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dx = Math.min(0.5, Math.max(-0.5, (clientX - rect.left) / rect.width - 0.5));
    const dy = Math.min(0.5, Math.max(-0.5, (clientY - rect.top) / rect.height - 0.5));
    node.style.transition = "none";
    node.style.transform = `translate3d(${(dx * strength * 2).toFixed(1)}px, ${(dy * strength * 2).toFixed(1)}px, 0)`;
  });

  function onEnter() {
    if (ref.current) ref.current.style.willChange = "transform";
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    node.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      onPointerMove={active ? (e) => onMove(e.clientX, e.clientY) : undefined}
      onPointerEnter={active ? onEnter : undefined}
      onPointerLeave={active ? onLeave : undefined}
      onTransitionEnd={() => {
        if (ref.current) ref.current.style.willChange = "";
      }}
    >
      {children}
    </div>
  );
}
