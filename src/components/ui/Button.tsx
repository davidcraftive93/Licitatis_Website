import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-brand-glow hover:bg-brand-800 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
  ghost: "text-ink-700 hover:bg-ink-100",
  inverse: "bg-white text-ink-900 hover:-translate-y-0.5 hover:bg-ink-100 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
  "aria-label"?: string;
}

interface ButtonAsButton extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  name?: string;
  form?: string;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Content({ children, withArrow }: Pick<CommonProps, "children" | "withArrow">) {
  return (
    <>
      {children}
      {withArrow ? (
        <Icon
          name="arrow-right"
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, withArrow } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const label = props["aria-label"];

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    const isExternal = external || /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={label}
          onClick={onClick}
        >
          <Content withArrow={withArrow}>{children}</Content>
        </a>
      );
    }

    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} aria-label={label} onClick={onClick}>
          <Content withArrow={withArrow}>{children}</Content>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={label} onClick={onClick}>
        <Content withArrow={withArrow}>{children}</Content>
      </Link>
    );
  }

  const { type = "button", onClick, disabled, name, form } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      name={name}
      form={form}
      className={classes}
      aria-label={label}
    >
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}
