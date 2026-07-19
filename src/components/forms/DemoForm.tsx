"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { TextInput, TextArea, SelectInput, Checkbox } from "@/components/ui/FormFields";
import { leadSchema, tendersPerYearOptions, challengeOptions } from "@/lib/validation";
import { readUtmParams, readHubspotUtk } from "@/lib/utm";
import { submitLeadToHubspot } from "@/lib/hubspot";

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  tendersPerYear: string;
  challenge: string;
  message: string;
  privacy: boolean;
  company_url: string; // honeypot
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  phone: "",
  tendersPerYear: "no-lo-se",
  challenge: "otra",
  message: "",
  privacy: false,
  company_url: "",
};

export function DemoForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  // Contexto de atribución capturado en el cliente.
  const [attribution, setAttribution] = useState<{
    utm: ReturnType<typeof readUtmParams>;
    hutk?: string;
    pageUri?: string;
  }>({ utm: {} });

  useEffect(() => {
    setAttribution({
      utm: readUtmParams(),
      hutk: readHubspotUtk(),
      pageUri: window.location.href,
    });
  }, []);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const payload = {
      ...values,
      utm: attribution.utm,
      hutk: attribution.hutk,
      pageUri: attribution.pageUri,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const mapped: Record<string, string> = {};
      for (const [key, messages] of Object.entries(fieldErrors)) {
        if (messages && messages.length) mapped[key] = messages[0];
      }
      setErrors(mapped);
      setStatus("error");
      setServerMessage("Revisa los campos marcados e inténtalo de nuevo.");
      // Mueve el foco al primer campo inválido para lectores de pantalla y teclado.
      const fieldOrder = [
        "firstName",
        "lastName",
        "email",
        "company",
        "jobTitle",
        "phone",
        "tendersPerYear",
        "challenge",
        "message",
        "privacy",
      ];
      const firstInvalid = fieldOrder.find((key) => mapped[key]);
      if (firstInvalid) {
        window.requestAnimationFrame(() => {
          document.getElementById(firstInvalid)?.focus();
        });
      }
      return;
    }

    setStatus("submitting");
    setErrors({});

    // Envío directo a HubSpot desde el cliente (sitio estático). Si HubSpot aún no
    // está configurado, se muestra la confirmación igualmente para no bloquear la web.
    const result = await submitLeadToHubspot(parsed.data);
    if (result.delivered || result.reason === "not_configured") {
      setStatus("success");
      return;
    }

    setStatus("error");
    setServerMessage(
      "No hemos podido enviar tu solicitud ahora mismo. Vuelve a intentarlo en unos minutos o escríbenos por correo.",
    );
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-3xl border border-brand-200 bg-brand-50/50 p-8 text-center sm:p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <Icon name="check" size={28} />
        </span>
        <h3 className="text-xl font-semibold text-ink-900">Solicitud recibida</h3>
        <p className="max-w-sm text-sm text-ink-600">
          Gracias por tu interés en el programa Beta Partner de LICITATIS. Nuestro equipo se pondrá
          en contacto contigo para la activación y para analizar tu primera licitación real.
        </p>
        <Link
          href="/"
          className="mt-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id="firstName"
          name="firstName"
          label="Nombre"
          autoComplete="given-name"
          required
          value={values.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <TextInput
          id="lastName"
          name="lastName"
          label="Apellidos"
          autoComplete="family-name"
          required
          value={values.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id="email"
          name="email"
          type="email"
          inputMode="email"
          label="Correo corporativo"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <TextInput
          id="company"
          name="company"
          label="Empresa"
          autoComplete="organization"
          required
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id="jobTitle"
          name="jobTitle"
          label="Cargo"
          autoComplete="organization-title"
          value={values.jobTitle}
          onChange={(e) => update("jobTitle", e.target.value)}
          error={errors.jobTitle}
        />
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          label="Teléfono"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectInput
          id="tendersPerYear"
          name="tendersPerYear"
          label="Licitaciones al año (aprox.)"
          options={tendersPerYearOptions}
          value={values.tendersPerYear}
          onChange={(e) => update("tendersPerYear", e.target.value)}
          error={errors.tendersPerYear}
        />
        <SelectInput
          id="challenge"
          name="challenge"
          label="Principal dificultad"
          options={challengeOptions}
          value={values.challenge}
          onChange={(e) => update("challenge", e.target.value)}
          error={errors.challenge}
        />
      </div>

      <TextArea
        id="message"
        name="message"
        label="Mensaje"
        placeholder="Cuéntanos brevemente cómo gestionas hoy tus licitaciones."
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />

      {/* Campo trampa antispam: oculto para personas, accesibilidad preservada. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">No rellenar</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_url}
          onChange={(e) => update("company_url", e.target.value)}
        />
      </div>

      <Checkbox
        id="privacy"
        name="privacy"
        required
        checked={values.privacy}
        onChange={(e) => update("privacy", e.target.checked)}
        error={errors.privacy}
      >
        He leído y acepto la{" "}
        <Link
          href="/privacidad"
          className="font-medium text-brand-700 underline-offset-2 hover:underline"
        >
          política de privacidad
        </Link>
        .
      </Checkbox>

      {status === "error" && serverMessage ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-red-100"
        >
          <Icon name="alert-triangle" size={16} className="shrink-0" />
          {serverMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          variant="gradient"
          disabled={status === "submitting"}
          withArrow={status !== "submitting"}
        >
          {status === "submitting" ? "Enviando…" : "Solicitar plaza en la beta"}
        </Button>
        <p className="text-xs text-ink-400">Sin tarjeta · Beta gratuita.</p>
      </div>
    </form>
  );
}
