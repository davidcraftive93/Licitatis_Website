import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "amber" | "neutral" | "ink";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-800 ring-brand-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  neutral: "bg-ink-50 text-ink-600 ring-ink-200",
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
