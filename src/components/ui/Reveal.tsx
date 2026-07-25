"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Retardo de la animación en ms (para escalonar elementos). */
  delay?: number;
}

type RevealHandler = () => void;

const handlers = new WeakMap<Element, RevealHandler>();
let sharedObserver: IntersectionObserver | null = null;

/** Un único observador para todos los Reveal de la página. */
function getSharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          handlers.get(entry.target)?.();
          handlers.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
  }

  return sharedObserver;
}

/**
 * Revela su contenido con una transición sutil al entrar en el viewport.
 * Todos los elementos comparten el mismo IntersectionObserver y respetan
 * prefers-reduced-motion mediante CSS.
 */
export function Reveal({ as: Tag = "div", className, children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      setVisible(true);
      return;
    }

    handlers.set(node, () => setVisible(true));
    observer.observe(node);

    return () => {
      handlers.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
