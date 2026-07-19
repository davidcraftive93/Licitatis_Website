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
 * Marca de LICITATIS (brand kit §12): cuadrado violeta con la letra "L" en blanco.
 * Sobrio y minimal. Construido en SVG propio.
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
        <rect width="32" height="32" rx="8" className="fill-brand-500" />
        <path
          d="M11.5 8 V20.5 H21.5"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
