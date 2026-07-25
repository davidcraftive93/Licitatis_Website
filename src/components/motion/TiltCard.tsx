"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useFinePointer, useRafCallback } from "@/components/motion/hooks";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados. */
  maxTilt?: number;
  /** Postura 3D en reposo (se endereza al interactuar), p. ej. "rotateX(2deg) rotateY(-6deg)". */
  idlePose?: string;
}

/**
 * Tarjeta con inclinación 3D que sigue al puntero + brillo especular.
 * Solo con puntero fino y sin prefers-reduced-motion; en táctil queda estática.
 *
 * El movimiento se escribe directamente en el DOM, limitado a un frame mediante
 * requestAnimationFrame. Así no se vuelve a renderizar todo el mock en cada píxel
 * recorrido por el puntero.
 */
export function TiltCard({ children, className, maxTilt = 5, idlePose }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;
  const idleTransform = !reduced && idlePose ? `perspective(950px) ${idlePose}` : "";

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;

    node.style.transform = `perspective(950px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    node.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    node.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  });

  function onEnter() {
    const node = ref.current;
    if (node) node.style.willChange = "transform";
    if (glareRef.current) glareRef.current.style.opacity = "1";
  }

  function onLeave() {
    const node = ref.current;
    if (node) {
      node.style.transform = idleTransform;
      node.style.willChange = "";
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      className={cn("relative transition-transform duration-300 ease-out-expo", className)}
      style={idleTransform ? { transform: idleTransform } : undefined}
      onPointerMove={active ? (e) => onMove(e.clientX, e.clientY) : undefined}
      onPointerEnter={active ? onEnter : undefined}
      onPointerLeave={active ? onLeave : undefined}
    >
      {children}
      {/* Brillo especular que sigue al puntero. */}
      {active ? (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28), transparent 45%)",
          }}
        />
      ) : null}
    </div>
  );
}
