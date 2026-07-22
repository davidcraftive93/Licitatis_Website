"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useConsent } from "@/components/analytics/ConsentContext";
import { cn } from "@/lib/utils";

export function ConsentBanner() {
  const { ready, bannerOpen, acceptAll, rejectAll, save, consent } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (consent) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent]);

  // Al abrir el banner, lleva el foco a su título para que se anuncie y sea operable por teclado.
  useEffect(() => {
    if (ready && bannerOpen) headingRef.current?.focus();
  }, [ready, bannerOpen]);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-white p-5 shadow-lift sm:p-6">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-base font-semibold text-ink-900 outline-none"
        >
          Cookies y privacidad
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso, cookies de
          analítica y de marketing. Puedes aceptarlas, rechazarlas o configurarlas. Consulta la{" "}
          <Link
            href="/cookies"
            className="font-medium text-brand-700 underline-offset-2 hover:underline"
          >
            política de cookies
          </Link>
          . <span className="text-ink-400">(Textos legales pendientes de revisión.)</span>
        </p>

        {showPrefs ? (
          <div className="mt-4 space-y-2.5 rounded-xl bg-paper p-4">
            <PrefRow
              label="Necesarias"
              description="Imprescindibles para el sitio."
              checked
              disabled
            />
            <PrefRow
              label="Analítica"
              description="Nos ayudan a entender el uso del sitio."
              checked={analytics}
              onChange={setAnalytics}
            />
            <PrefRow
              label="Marketing"
              description="Permiten medir campañas y atribución."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          {showPrefs ? (
            <button
              type="button"
              onClick={() => save({ analytics, marketing })}
              className="order-1 inline-flex h-10 items-center justify-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800 sm:order-none"
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              Configurar
            </button>
          )}
          {/* "Rechazar" y "Aceptar" con la MISMA jerarquía visual (mismo estilo, tamaño y
              peso): rechazar debe ser tan fácil y visible como aceptar (guía AEPD/CNIL). */}
          <button
            type="button"
            onClick={rejectAll}
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink-900 px-5 text-sm font-semibold text-white hover:bg-ink-800"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink-900 px-5 text-sm font-semibold text-white hover:bg-ink-800"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}

function PrefRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4",
        disabled ? "cursor-default" : "cursor-pointer",
      )}
    >
      <span>
        <span className="block text-sm font-medium text-ink-800">{label}</span>
        <span className="block text-xs text-ink-400">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-brand-700"
      />
    </label>
  );
}
