import { cn } from "@/lib/utils";

interface LogoProps {
  /** Muestra el logotipo textual junto a la marca. */
  wordmark?: boolean;
  /** "light" para fondos oscuros (texto blanco). */
  tone?: "dark" | "light";
  className?: string;
  size?: number;
}

/**
 * Marca de LICITATIS: un glifo que evoca un "recorrido con nodos" (el pipeline de la
 * candidatura) en forma de L sobre un cuadrado tinta. Construido en SVG propio.
 */
export function Logo({ wordmark = true, tone = "dark", className, size = 32 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="LICITATIS"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" className="fill-ink-900" />
        <path
          d="M11 8 V19 a3 3 0 0 0 3 3 H23"
          className="stroke-brand-400"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="8" r="2.3" className="fill-brand-400" />
        <circle cx="23" cy="22" r="2.3" className="fill-amber-400" />
      </svg>
      {wordmark ? (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            tone === "light" ? "text-white" : "text-ink-900",
          )}
        >
          LICITATIS
        </span>
      ) : null}
    </span>
  );
}
