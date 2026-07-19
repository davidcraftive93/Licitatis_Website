import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Distintivo de "IA" con el degradado de marca. */
export function AiBadge({ children = "IA", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-brand px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-white shadow-sm",
        className,
      )}
    >
      <Icon name="sparkles" size={11} />
      {children}
    </span>
  );
}
