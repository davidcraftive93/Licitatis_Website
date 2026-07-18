"use client";

import { useConsent } from "@/components/analytics/ConsentContext";

/** Botón para reabrir el panel de preferencias de cookies (p. ej. desde el footer). */
export function CookiePreferencesButton({ className }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className={className}>
      Preferencias de cookies
    </button>
  );
}
