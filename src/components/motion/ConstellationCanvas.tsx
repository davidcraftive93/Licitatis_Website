"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/hooks";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  warm: boolean; // algunas partículas en ámbar
}

const LINK_DIST = 120;
const MOUSE_DIST = 170;

/**
 * Constelación de "expedientes" sobre el hero oscuro: nodos que derivan y se
 * conectan entre sí y con el puntero. Canvas 2D con rAF; se pausa fuera de
 * viewport, con la pestaña oculta o con prefers-reduced-motion (queda un
 * fotograma estático de nodos, sin bucle).
 */
export function ConstellationCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let visible = true;
    let particles: Particle[] = [];
    let seededW = 0;
    let seededH = 0;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const seed = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      seededW = w;
      seededH = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(55, Math.round((w * h) / 28000));
      particles = Array.from({ length: count }, (_, i) => ({
        // Posiciones deterministas-ish repartidas; velocidad aleatoria suave.
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        warm: i % 7 === 0,
      }));
    };

    const draw = (step: boolean) => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (step) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? "rgba(251,191,36,0.75)" : "rgba(52,211,153,0.7)";
        ctx.fill();
      }

      // Enlaces entre nodos cercanos.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(52,211,153,${(0.16 * (1 - d / LINK_DIST)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Enlace al puntero (más brillante): la constelación "responde".
        const a = particles[i];
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(110,231,183,${(0.35 * (1 - dm / MOUSE_DIST)).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running && visible && !reduced && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    seed();
    if (reduced) {
      draw(false); // fotograma estático: composición sin movimiento
    } else {
      start();
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      // En móvil, ocultar/mostrar la barra de URL dispara resize sin cambiar el
      // tamaño real del hero: si las dimensiones no cambian, no re-sembramos
      // (evita que la constelación "teleporte" durante el scroll).
      if (canvas.clientWidth === seededW && canvas.clientHeight === seededH) return;
      seed();
      if (reduced) draw(false);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      observer.observe(canvas);
    }

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
