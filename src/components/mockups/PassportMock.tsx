"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/icons";
import { CountUp } from "@/components/motion/CountUp";
import { GaugeRing } from "@/components/motion/GaugeRing";
import { useInViewOnce } from "@/components/motion/hooks";
import { demoCompany, demoExpediente } from "@/lib/demo-expediente";
import { cn } from "@/lib/utils";

/**
 * Mock del Pasaporte del Licitador, "en vivo": al entrar en viewport el anillo
 * se dibuja, el índice cuenta y las credenciales aparecen en cascada.
 *
 * Datos ficticios de la FUENTE ÚNICA (`demo-expediente`): la empresa y su
 * bloqueante son los mismos que frenan el expediente del resto de la página,
 * así que el visitante reconoce el caso en vez de leer un mock desconectado.
 */
type CredStatus = "vigente" | "pronto" | "caducado";

const statusStyles: Record<CredStatus, { chip: string; label: string }> = {
  vigente: { chip: "bg-emerald-50 text-emerald-700 ring-emerald-200", label: "Vigente" },
  pronto: { chip: "bg-amber-50 text-amber-700 ring-amber-200", label: "Caduca pronto" },
  caducado: { chip: "bg-red-50 text-red-600 ring-red-200", label: "Caducado" },
};

export function PassportMock() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInViewOnce(ref, "0px 0px -12% 0px");

  return (
    <div ref={ref} className={cn("p-4 text-left sm:p-5", live && "is-live")}>
      {/* Cabecera: identidad */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
          <Icon name="id-card" size={20} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">{demoCompany.name}</p>
          <p className="flex items-center gap-1.5 text-2xs text-ink-400">
            <span className="font-mono">{demoCompany.taxId}</span>
            <span className="inline-flex items-center gap-0.5 text-emerald-600">
              <Icon name="check" size={11} /> validado
            </span>
          </p>
        </div>
      </div>

      {/* Índice de Aptitud con anillo animado */}
      <div className="mt-4 rounded-xl border border-ink-100 bg-paper p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-2xs font-medium uppercase tracking-wide text-ink-400">
              Índice de Aptitud para Licitar
            </p>
            <p className="mt-1 font-display text-3xl font-bold leading-none text-ink-900">
              <CountUp value={demoCompany.aptitude} duration={1400} />
              <span className="text-lg text-ink-400"> / 100</span>
            </p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-2xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
              <Icon name="alert-triangle" size={11} />1 bloqueante
            </span>
          </div>
          <GaugeRing value={demoCompany.aptitude} size={86} strokeWidth={9} className="shrink-0">
            <Icon name="gauge" size={22} className="text-brand-700" />
          </GaugeRing>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
          <div
            className="live-bar h-full rounded-full bg-gradient-brand"
            style={
              {
                "--live-width": `${demoCompany.aptitude}%`,
                "--live-delay": "200ms",
              } as React.CSSProperties
            }
          />
        </div>
        {/* El bloqueante nombra el expediente: es el hilo que une Pasaporte y caso. */}
        <p className="mt-2 flex items-start gap-1.5 text-2xs text-ink-500">
          <Icon name="alert-triangle" size={12} className="mt-0.5 shrink-0 text-amber-600" />
          <span>
            Bloqueante: {demoExpediente.blocker.label.toLowerCase()}. Frena{" "}
            <span className="font-mono text-ink-600">{demoExpediente.code}</span>.
          </span>
        </p>
      </div>

      {/* Credenciales con caducidad (aparecen en cascada) */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-2xs font-semibold uppercase tracking-wide text-ink-400">
            Credenciales
          </p>
          <span className="text-2xs text-ink-400">Completitud {demoCompany.completeness}%</span>
        </div>
        <ul className="space-y-1.5">
          {demoCompany.credentials.map((c, i) => (
            <li
              key={c.label}
              className="live-item flex items-center justify-between gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2"
              style={{ "--live-delay": `${350 + i * 120}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  name={c.status === "caducado" ? "alert-triangle" : "shield"}
                  size={15}
                  className={cn(
                    c.status === "vigente" && "text-emerald-600",
                    c.status === "pronto" && "text-amber-600",
                    c.status === "caducado" && "text-red-500",
                  )}
                />
                <span className="text-xs font-medium text-ink-800">{c.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-2xs text-ink-400 sm:inline">{c.date}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset",
                    statusStyles[c.status].chip,
                  )}
                >
                  {statusStyles[c.status].label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
