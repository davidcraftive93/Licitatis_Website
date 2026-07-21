"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  usePrefersReducedMotion,
  useFinePointer,
  useRafCallback,
} from "@/components/motion/hooks";

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
 */
export function TiltCard({ children, className, maxTilt = 5, idlePose }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = fine && !reduced;

  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hovering, setHovering] = useState(false);

  const onMove = useRafCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width; // 0..1
    const py = (clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;
    setStyle({
      transform: `perspective(950px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`,
      "--gx": `${(px * 100).toFixed(1)}%`,
      "--gy": `${(py * 100).toFixed(1)}%`,
    } as React.CSSProperties);
  });

  const idle: React.CSSProperties =
    !reduced && idlePose ? { transform: `perspective(950px) ${idlePose}` } : {};

  return (
    <div
      ref={ref}
      className={cn("relative transition-transform duration-300 ease-out-expo", className)}
      style={active && hovering ? style : idle}
      onPointerMove={active ? (e) => onMove(e.clientX, e.clientY) : undefined}
      onPointerEnter={active ? () => setHovering(true) : undefined}
      onPointerLeave={active ? () => setHovering(false) : undefined}
    >
      {children}
      {/* Brillo especular que sigue al puntero. */}
      {active ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300",
            hovering ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28), transparent 45%)",
          }}
        />
      ) : null}
    </div>
  );
}
