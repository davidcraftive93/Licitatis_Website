import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "amber" | "neutral" | "ink";

const tones: Record<Tone, string> = {
  brand:
    "bg-brand-50 dark:bg-brand-500/15 text-brand-800 dark:text-brand-200 ring-brand-200 dark:ring-brand-500/30",
  amber:
    "bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-200 dark:ring-amber-500/30",
  neutral: "bg-surface-sunken text-fg ring-hairline",
  ink: "bg-white/10 text-ink-100 ring-white/15",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wide ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
