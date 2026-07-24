import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Fondo de la sección: papel, blanco o tinta (oscuro). */
  tone?: "paper" | "white" | "ink";
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-surface text-fg-strong",
  white: "bg-surface-raised text-fg-strong",
  ink: "bg-ink-950 text-ink-100",
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  tone = "paper",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", toneClasses[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/** Cabecera reutilizable de sección: antetítulo + título + descripción. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]",
            tone === "dark" ? "text-brand-300" : "text-brand-700 dark:text-brand-300",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              tone === "dark" ? "bg-brand-400" : "bg-brand-600",
            )}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]",
          tone === "dark" ? "text-white" : "text-fg-strong",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-200" : "text-fg",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
