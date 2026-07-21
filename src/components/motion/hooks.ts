"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True si el usuario pide menos movimiento (se actualiza en caliente). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True si hay puntero fino (ratón/trackpad): los efectos de puntero solo ahí. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/**
 * True (una sola vez) cuando el nodo entra en el viewport.
 * Sin IntersectionObserver (SSR/tests) devuelve true de inmediato.
 */
export function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "0px 0px -15% 0px",
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, inView, rootMargin]);

  return inView;
}

/** rAF-throttle: devuelve una función que agenda `fn` como máximo una vez por frame. */
export function useRafCallback<A extends unknown[]>(fn: (...args: A) => void) {
  const frame = useRef(0);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return useRef((...args: A) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => fnRef.current(...args));
  }).current;
}
