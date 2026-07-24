"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icons";
import { howItWorksSteps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useRafCallback } from "@/components/motion/hooks";

/**
 * Scrollytelling de "Cómo funciona": el MISMO expediente de demostración
 * (EXP-2024-0142) atraviesa los 6 pasos. Al hacer scroll, cada paso activa su
 * pantalla en el panel sticky (escritorio); en móvil la pantalla va bajo cada paso.
 * Datos ficticios y coherentes con el resto de mocks (p. ej. el AEAT caducado
 * del Pasaporte reaparece aquí como bloqueante y riesgo).
 */

/* ------------------------------------------------------------- Mini-pantallas */

function PanelFrame({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-lift ring-1 ring-ink-900/5">
      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50/70 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-2xs text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          EXP-2024-0142
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-2xs font-semibold text-ink-500 ring-1 ring-ink-100">
          Paso {step} de 6 · Demo
        </span>
      </div>
      <div className="bg-paper p-4">{children}</div>
    </div>
  );
}

function Chip({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "bad" | "neutral";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset",
        tone === "ok" && "bg-emerald-50 text-emerald-700 ring-emerald-200",
        tone === "warn" && "bg-amber-50 text-amber-700 ring-amber-200",
        tone === "bad" && "bg-red-50 text-red-600 ring-red-200",
        tone === "neutral" && "bg-ink-50 text-ink-500 ring-ink-200",
      )}
    >
      {children}
    </span>
  );
}

function Row({ children, dim }: { children: ReactNode; dim?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2",
        dim && "opacity-60",
      )}
    >
      {children}
    </div>
  );
}

/** 01 — Detecta: el feed encuentra la licitación que encaja con el Pasaporte. */
function VisualDetecta() {
  return (
    <div className="space-y-2">
      <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
        Feed PLACSP · matching con tu Pasaporte
      </p>
      <div className="rounded-lg border border-brand-200 bg-brand-50/60 px-3 py-2.5 ring-1 ring-brand-100">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-ink-900">
            Servicios de mantenimiento de instalaciones
          </span>
          <Chip tone="ok">Encaje 87%</Chip>
        </div>
        <p className="mt-1 flex items-center gap-2 text-2xs text-ink-500">
          <span className="font-mono">EXP-2024-0142</span> · CPV 50700000 · 214.000 €
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          <Chip tone="neutral">CPV favorito</Chip>
          <Chip tone="neutral">Zona: tu provincia</Chip>
          <Chip tone="neutral">Importe en rango</Chip>
        </div>
      </div>
      <Row dim>
        <span className="truncate text-xs text-ink-600">Suministro de mobiliario urbano</span>
        <Chip tone="neutral">Encaje 64%</Chip>
      </Row>
      <Row dim>
        <span className="truncate text-xs text-ink-600">Obras de reforma — fuera de zona</span>
        <Chip tone="neutral">Encaje 41%</Chip>
      </Row>
    </div>
  );
}

/** 02 — Analiza: go/no-go argumentado con confianza y huecos. */
function VisualAnaliza() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
          Análisis IA del expediente
        </p>
        <Chip tone="warn">Requiere revisión humana</Chip>
      </div>
      <div className="rounded-xl border border-ink-100 bg-white p-3.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-emerald-700">
            GO con condiciones
          </span>
          <span className="text-2xs text-ink-400">
            Confianza <strong className="text-ink-700">78%</strong>
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full w-[78%] rounded-full bg-gradient-brand" />
        </div>
        <ul className="mt-3 space-y-1.5 text-2xs text-ink-600">
          <li className="flex items-start gap-1.5">
            <Icon name="check" size={12} className="mt-0.5 shrink-0 text-emerald-600" />
            Criterios de adjudicación: 60% precio · 40% memoria técnica
          </li>
          <li className="flex items-start gap-1.5">
            <Icon name="check" size={12} className="mt-0.5 shrink-0 text-emerald-600" />
            Garantía definitiva 5% · plazo 24 meses
          </li>
          <li className="flex items-start gap-1.5">
            <Icon name="alert-triangle" size={12} className="mt-0.5 shrink-0 text-amber-600" />2
            huecos marcados <span className="font-mono text-ink-400">[[FALTA: …]]</span> para
            completar
          </li>
        </ul>
      </div>
    </div>
  );
}

/** 03 — Elegibilidad: semáforo requisito a requisito. */
function VisualElegibilidad() {
  return (
    <div className="space-y-2">
      <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
        Matriz de elegibilidad
      </p>
      <Row>
        <span className="text-xs font-medium text-ink-800">Solvencia económica</span>
        <Chip tone="ok">Cumple</Chip>
      </Row>
      <Row>
        <span className="text-xs font-medium text-ink-800">Solvencia técnica (obra similar)</span>
        <Chip tone="ok">Cumple</Chip>
      </Row>
      <Row>
        <span className="text-xs font-medium text-ink-800">Habilitación profesional</span>
        <Chip tone="warn">Dudoso</Chip>
      </Row>
      <Row>
        <span className="text-xs font-medium text-ink-800">Certificado AEAT vigente</span>
        <Chip tone="bad">Bloqueante</Chip>
      </Row>
      <p className="flex items-center gap-1.5 pt-1 text-2xs text-ink-500">
        <Icon name="handshake" size={13} className="text-brand-600" />
        El «dudoso» sería <strong className="text-ink-700">viable en UTE</strong> con socio
        habilitado.
      </p>
    </div>
  );
}

/** 04 — Expediente: checklist documental + memoria en curso. */
function VisualExpediente() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
          Checklist documental
        </p>
        <span className="font-display text-sm font-bold text-brand-700">2/4</span>
      </div>
      {[
        { label: "Declaración responsable (DEUC)", done: true },
        { label: "Acreditación de solvencia", done: true },
        { label: "Certificado AEAT", done: false },
        { label: "Memoria técnica", done: false },
      ].map((item) => (
        <Row key={item.label}>
          <span
            className={cn(
              "flex items-center gap-2 text-xs",
              item.done
                ? "text-ink-500 line-through decoration-ink-300"
                : "font-medium text-ink-800",
            )}
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full",
                item.done ? "bg-emerald-100 text-emerald-700" : "border border-ink-200 bg-white",
              )}
            >
              {item.done ? <Icon name="check" size={10} /> : null}
            </span>
            {item.label}
          </span>
          {!item.done ? <Chip tone="warn">Pendiente</Chip> : null}
        </Row>
      ))}
      <div className="rounded-lg border border-ink-100 bg-white px-3 py-2">
        <div className="flex items-center justify-between text-2xs">
          <span className="font-medium text-ink-700">Memoria técnica (borrador IA)</span>
          <span className="text-ink-400">62%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full w-[62%] rounded-full bg-gradient-brand" />
        </div>
      </div>
    </div>
  );
}

/** 05 — Riesgo: escáner anti-exclusión (ata con el AEAT del Pasaporte). */
function VisualRiesgo() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
          Escáner anti-exclusión
        </p>
        <Chip tone="bad">2 avisos</Chip>
      </div>
      <div className="rounded-lg border border-red-100 bg-red-50/60 px-3 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
          <Icon name="alert-triangle" size={13} />
          Certificado AEAT no vigente
        </p>
        <p className="mt-0.5 text-2xs text-ink-500">
          Motivo de exclusión directa. Detectado en tu Pasaporte; renuévalo antes de presentar.
        </p>
      </div>
      <div className="rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
          <Icon name="key" size={13} />
          Firma electrónica del apoderado caduca en 4 días
        </p>
        <p className="mt-0.5 text-2xs text-ink-500">
          Antes del fin del plazo de presentación (quedan 6 días).
        </p>
      </div>
      <div className="rounded-lg border border-ink-100 bg-white px-3 py-2">
        <div className="flex items-center justify-between text-2xs">
          <span className="font-medium text-ink-700">Índice de preparación</span>
          <span className="font-display text-sm font-bold text-ink-900">74%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full w-[74%] rounded-full bg-gradient-brand" />
        </div>
      </div>
    </div>
  );
}

/** 06 — Decide: escenarios económicos + informe ejecutivo. */
function VisualDecide() {
  const escenarios = [
    { label: "Conservador", baja: "3%", margen: "6,2%", width: "88%", star: false },
    { label: "Equilibrado", baja: "7%", margen: "4,1%", width: "66%", star: true },
    { label: "Agresivo", baja: "12%", margen: "1,9%", width: "38%", star: false },
  ];
  return (
    <div className="space-y-2.5">
      <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
        Escenarios económicos
      </p>
      {escenarios.map((e) => (
        <div
          key={e.label}
          className={cn(
            "rounded-lg border px-3 py-2",
            e.star
              ? "border-brand-200 bg-brand-50/60 ring-1 ring-brand-100"
              : "border-ink-100 bg-white",
          )}
        >
          <div className="flex items-center justify-between text-2xs">
            <span className="flex items-center gap-1.5 font-semibold text-ink-800">
              {e.label}
              {e.star ? <Chip tone="ok">Recomendado</Chip> : null}
            </span>
            <span className="text-ink-500">
              Baja {e.baja} · margen <strong className="text-ink-800">{e.margen}</strong>
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: e.width }} />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2.5">
        <span className="flex items-center gap-2 text-xs font-medium text-ink-800">
          <Icon name="book" size={14} className="text-brand-700" />
          Informe ejecutivo para dirección
        </span>
        <span className="rounded-lg bg-ink-900 px-2.5 py-1 text-2xs font-semibold text-white">
          Exportar PDF
        </span>
      </div>
    </div>
  );
}

const VISUALS = [
  VisualDetecta,
  VisualAnaliza,
  VisualElegibilidad,
  VisualExpediente,
  VisualRiesgo,
  VisualDecide,
];

const VISUAL_LABELS = [
  "Demostración: feed de licitaciones con porcentaje de encaje",
  "Demostración: análisis IA con go/no-go y confianza",
  "Demostración: matriz de elegibilidad con semáforo",
  "Demostración: checklist documental y memoria técnica",
  "Demostración: escáner anti-exclusión e índice de preparación",
  "Demostración: escenarios económicos e informe ejecutivo",
];

/* --------------------------------------------------------------- Scrollytelling */

export function StepJourney() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // --- Ruta del expediente: un trazado SVG que se dibuja conforme bajas -------------
  // Las estaciones se MIDEN del DOM (los pasos tienen alturas distintas y en móvil
  // llevan la pantalla del mock incrustada), así que la curva se genera a medida.
  const listRef = useRef<HTMLOListElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [route, setRoute] = useState<{
    d: string;
    height: number;
    stations: { x: number; y: number }[];
  } | null>(null);
  const [drawn, setDrawn] = useState(0); // 0..1 del trazado dibujado
  const [pathLength, setPathLength] = useState(0);

  // Mide las estaciones y compone una curva suave que serpentea entre ellas.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const listBox = list.getBoundingClientRect();
      const stations = stepRefs.current
        .filter((li): li is HTMLLIElement => li !== null)
        .map((li) => {
          const marker = li.querySelector<HTMLElement>("[data-station]") ?? li;
          const b = marker.getBoundingClientRect();
          return { x: 24, y: b.top - listBox.top + b.height / 2 };
        });
      if (stations.length < 2) return;

      let d = `M ${stations[0].x} ${stations[0].y}`;
      for (let i = 1; i < stations.length; i++) {
        const from = stations[i - 1];
        const to = stations[i];
        const dy = to.y - from.y;
        // Desvío lateral alternado: da sensación de ruta, no de raíl recto.
        const bend = i % 2 === 1 ? 13 : -13;
        d += ` C ${from.x + bend} ${from.y + dy * 0.42}, ${to.x - bend} ${to.y - dy * 0.42}, ${to.x} ${to.y}`;
      }
      setRoute({ d, height: listBox.height, stations });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Longitud real del trazado (para stroke-dasharray).
  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [route]);

  // Progreso de dibujo ligado al scroll (rAF). Con reduced-motion queda dibujada entera.
  const updateDrawn = useRafCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const box = list.getBoundingClientRect();
    const line = window.innerHeight * 0.62; // línea de "avance" del viaje
    setDrawn(Math.max(0, Math.min(1, (line - box.top) / box.height)));
  });

  useEffect(() => {
    if (reducedMotion) {
      setDrawn(1);
      return;
    }
    updateDrawn();
    window.addEventListener("scroll", updateDrawn, { passive: true });
    window.addEventListener("resize", updateDrawn, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateDrawn);
      window.removeEventListener("resize", updateDrawn);
    };
  }, [reducedMotion, updateDrawn]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // El paso que cruza la banda central del viewport pasa a ser el activo.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );

    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* Pasos (columna izquierda). */}
      <ol ref={listRef} className="relative">
        {/* Ruta del expediente: se dibuja conforme bajas (stroke-dashoffset). El trazado
            se genera midiendo las estaciones reales, así que encaja con cualquier alto. */}
        {route ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
            width="48"
            height={route.height}
            viewBox={`0 0 48 ${route.height}`}
            fill="none"
          >
            <defs>
              <linearGradient id="ruta-expediente" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Traza completa, muy tenue: el camino que queda por recorrer. */}
            <path
              ref={pathRef}
              d={route.d}
              stroke="currentColor"
              className="text-hairline"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Traza recorrida. */}
            {pathLength > 0 ? (
              <path
                d={route.d}
                stroke="url(#ruta-expediente)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - drawn)}
                style={{ transition: reducedMotion ? undefined : "stroke-dashoffset 120ms linear" }}
              />
            ) : null}

            {/* Estaciones: se encienden al pasar por ellas. */}
            {route.stations.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={i <= active ? 4 : 3}
                className={cn(
                  "transition-all duration-500",
                  i <= active ? "fill-brand-500" : "fill-hairline",
                )}
              />
            ))}
          </svg>
        ) : null}

        {howItWorksSteps.map((step, i) => {
          const isActive = i === active;
          const isPast = i < active;
          const Visual = VISUALS[i];
          return (
            <li
              key={step.number}
              ref={(node) => {
                stepRefs.current[i] = node;
              }}
              className="relative pb-9 pl-[4.25rem] last:pb-0"
            >
              <span
                aria-hidden="true"
                data-station
                className={cn(
                  "absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-sm font-bold transition-all duration-500",
                  isActive
                    ? "scale-110 bg-gradient-brand text-white shadow-brand-glow"
                    : isPast
                      ? "bg-brand-100 text-brand-800"
                      : "bg-ink-900 text-brand-400 dark:bg-surface-raised dark:text-brand-300",
                )}
              >
                {step.number}
              </span>
              {/* Atenuación suave (no menos de 0.8: el texto debe mantener contraste AA). */}
              <div
                className={cn(
                  "transition-all duration-500",
                  isActive ? "opacity-100" : "opacity-80",
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon name={step.icon} size={18} className="text-brand-700" />
                  <h3 className="text-lg font-semibold text-fg-strong">{step.title}</h3>
                </div>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-fg">{step.text}</p>

                {/* Pantalla del paso en móvil/tablet (en escritorio va en el panel sticky). */}
                <div className="mt-4 lg:hidden" role="img" aria-label={VISUAL_LABELS[i]}>
                  <PanelFrame step={i + 1}>
                    <Visual />
                  </PanelFrame>
                </div>
              </div>
            </li>
          );
        })}
        {/* Disclaimer visible también en móvil (el del panel sticky solo existe en escritorio). */}
        <li className="list-none pt-2 text-center text-xs text-fg-muted lg:hidden">
          Expediente de demostración: datos ficticios.
        </li>
      </ol>

      {/* Panel sticky (escritorio): las 6 pantallas superpuestas, crossfade a la activa. */}
      <div className="relative hidden lg:sticky lg:top-24 lg:block" aria-hidden="true">
        <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-brand-400/20 blur-2xl" />
        <div className="relative min-h-[420px]">
          {VISUALS.map((Visual, i) => (
            <div
              key={i}
              className={cn(
                "transition-all duration-500 ease-out-expo",
                i === active
                  ? "relative z-10 translate-y-0 opacity-100"
                  : "pointer-events-none absolute inset-x-0 top-0 z-0 translate-y-3 opacity-0",
              )}
            >
              <PanelFrame step={i + 1}>
                <Visual />
              </PanelFrame>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-fg-muted">
          Seguimos un expediente de demostración (EXP-2024-0142) por todo el proceso. Datos
          ficticios.
        </p>
      </div>
    </div>
  );
}
