"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Acordeón accesible con animación de altura fluida (truco grid-template-rows).
 * Botones con aria-expanded/aria-controls; una sola pregunta abierta a la vez.
 */
export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface-raised",
        className,
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div
            key={item.question}
            className={cn("transition-colors", isOpen && "bg-brand-50/30 dark:bg-brand-500/10")}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-medium text-fg-strong transition-colors hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 sm:px-6"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-180 border-brand-200 bg-brand-100 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-300"
                      : "border-hairline bg-surface-raised text-fg-muted",
                  )}
                >
                  <Icon name="chevron-down" size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // `inert` saca el panel cerrado del árbol de accesibilidad y del foco
              // (el colapso por altura 0 + overflow-hidden por sí solo no lo hace).
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-expo",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-fg sm:px-6">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
