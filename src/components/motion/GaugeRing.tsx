"use client";

import { useRef, type ReactNode } from "react";
import { useInViewOnce } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

interface GaugeRingProps {
  /** Valor 0–100. */
  value: number;
  /** Diámetro en px. */
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Contenido centrado dentro del anillo (p. ej. la cifra). */
  children?: ReactNode;
}

/**
 * Anillo de progreso SVG que se dibuja al entrar en viewport
 * (transición CSS de stroke-dashoffset; con reduced-motion salta al final).
 */
export function GaugeRing({
  value,
  size = 84,
  strokeWidth = 8,
  className,
  children,
}: GaugeRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);

  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = inView ? circumference * (1 - clamped / 100) : circumference;

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-ink-100"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="gauge-arc"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
