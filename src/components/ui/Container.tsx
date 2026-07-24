import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Contenedor centrado con ancho máximo y padding lateral responsive.
 * En pantallas muy grandes crece por dos vías: el `rem` escala (ver globals.css) y
 * además se ensancha el máximo, para no dejar una isla de contenido perdida en el centro
 * de un 4K o una TV. Se sube con cabeza: pasarse arruinaría la longitud de línea.
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8",
        "3xl:max-w-[82rem] 3xl:px-10",
        "4xl:max-w-[92rem] 4xl:px-12",
        "5xl:max-w-[108rem]",
        "6xl:max-w-[124rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
