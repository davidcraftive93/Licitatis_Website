"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  applyTheme,
  readThemePreference,
  writeThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const ORDER: ThemePreference[] = ["system", "light", "dark"];
const LABEL: Record<ThemePreference, string> = {
  system: "Tema: el del sistema",
  light: "Tema: claro",
  dark: "Tema: oscuro",
};
const ICON = { system: "monitor", light: "sun", dark: "moon" } as const;

/**
 * Conmuta entre tema del sistema, claro y oscuro. La preferencia se guarda en
 * localStorage y se aplica antes del primer paint (ver THEME_INIT_SCRIPT), de modo
 * que no hay parpadeo. Sin JS el sitio se queda con el tema del sistema.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPreference(readThemePreference());
    setMounted(true);
  }, []);

  // Si sigue al sistema, reacciona a los cambios del SO en caliente.
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length];
    setPreference(next);
    writeThemePreference(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      // Hasta montar no sabemos la preferencia real: etiqueta genérica para no mentir.
      aria-label={mounted ? `${LABEL[preference]}. Pulsa para cambiar` : "Cambiar tema"}
      title={mounted ? LABEL[preference] : "Cambiar tema"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-200 transition-colors hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Icon name={ICON[preference]} size={17} />
    </button>
  );
}
