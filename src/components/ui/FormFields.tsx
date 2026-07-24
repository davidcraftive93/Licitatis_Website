import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons";

const controlBase =
  "w-full rounded-xl border border-hairline bg-surface-raised px-3.5 py-2.5 text-[0.95rem] text-fg-strong shadow-sm transition-colors placeholder:text-fg focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/15";

interface FieldWrapProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Envoltura accesible: etiqueta, ayuda, mensaje de error asociado por aria-describedby. */
export function Field({ id, label, hint, error, required, className, children }: FieldWrapProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-fg-strong">
        {label}
        {required ? (
          <span className="text-brand-700 dark:text-brand-300" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-fg-muted">(opcional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-fg-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs font-medium text-red-600">
          <Icon name="alert-triangle" size={13} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type TextInputProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: TextInputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, className)}
        {...rest}
      />
    </Field>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ id, label, hint, error, required, className, ...rest }: TextAreaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "min-h-[110px] resize-y", className)}
        {...rest}
      />
    </Field>
  );
}

type SelectProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({
  id,
  label,
  hint,
  error,
  required,
  options,
  className,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(controlBase, "appearance-none pr-10", className)}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted"
        />
      </div>
    </Field>
  );
}

type CheckboxProps = {
  id: string;
  error?: string;
  children: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ id, error, required, children, className, ...rest }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-fg">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-ink-300 accent-brand-700 focus:ring-2 focus:ring-brand-500/30",
            className,
          )}
          {...rest}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1 pl-7 text-xs font-medium text-red-600"
        >
          <Icon name="alert-triangle" size={13} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
