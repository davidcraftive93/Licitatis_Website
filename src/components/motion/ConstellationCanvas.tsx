"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/components/motion/hooks";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  warm: boolean; // algunas partículas en ámbar
}

interface NetworkInformationLike {
  saveData?: boolean;
}

const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const MOUSE_DIST = 170;
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;

/**
 * Constelación de "expedientes" sobre el hero oscuro: nodos que derivan y se
 * conectan entre sí y con el puntero. Canvas 2D con rAF; se pausa fuera de
 * viewport, con la pestaña oculta o con prefers-reduced-motion.
 *
 * En pantallas táctiles, ahorro de datos y equipos modestos se reduce el número
 * de nodos o se dibuja un único fotograma: se conserva la composición sin pagar
 * un bucle de animación que aporta poco en esos dispositivos.
 */
export function ConstellationCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
    const saveData = connection?.saveData === true;
    const cores = navigator.hardwareConcurrency || 4;
    const maxParticles = saveData ? 18 : cores <= 4 ? 32 : 55;
    const moving = finePointer && !reduced && !saveData;

    let raf = 0;
    let running = false;
    let visible = true;
    let pointerListening = false;
    let particles: Particle[] = [];
    let seededW = 0;
    let seededH = 0;
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;

      seededW = w;
      seededH = h;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(maxParticles, Math.max(12, Math.round((w * h) / 28000)));
      particles = Array.from({ length: count }, (_, i) => ({
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

      // Distancias al cuadrado: evita calcular raíces para pares que no se dibujan.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < LINK_DIST_SQ) {
            const strength = 1 - Math.sqrt(distanceSq) / LINK_DIST;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(52,211,153,${(0.16 * strength).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mouseDx = a.x - mouse.x;
        const mouseDy = a.y - mouse.y;
        const mouseDistanceSq = mouseDx * mouseDx + mouseDy * mouseDy;
        if (mouseDistanceSq < MOUSE_DIST_SQ) {
          const strength = 1 - Math.sqrt(mouseDistanceSq) / MOUSE_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(110,231,183,${(0.35 * strength).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const addPointerListeners = () => {
      if (pointerListening || !moving) return;
      canvas.addEventListener("pointermove", onPointer, { passive: true });
      canvas.addEventListener("pointerleave", onLeave, { passive: true });
      pointerListening = true;
    };
    const removePointerListeners = () => {
      if (!pointerListening) return;
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      pointerListening = false;
      onLeave();
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running && visible && moving && !document.hidden) {
        running = true;
        addPointerListeners();
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      removePointerListeners();
    };

    seed();
    if (moving) start();
    else draw(false);

    const onResize = () => {
      // La barra del navegador móvil puede disparar resize sin cambiar el hero.
      if (canvas.clientWidth === seededW && canvas.clientHeight === seededH) return;
      seed();
      if (!moving || !running) draw(false);
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

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [finePointer, reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
