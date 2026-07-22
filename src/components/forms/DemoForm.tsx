"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { TextInput, TextArea, SelectInput, Checkbox } from "@/components/ui/FormFields";
import { leadSchema, tendersPerYearOptions, challengeOptions } from "@/lib/validation";
import { readUtmParams, readHubspotUtk } from "@/lib/utm";
import { submitLeadToHubspot } from "@/lib/hubspot";
import { CONTACT_EMAIL } from "@/lib/content";

/** Enlace de correo alternativo con los datos ya escritos, para no perder el lead. */
function buildMailtoFallback(values: FormValues): string {
  const subject = "Solicitud de plaza — Beta Partner LICITATIS";
  const lines = [
    `Nombre: ${values.firstName} ${values.lastName}`.trim(),
    `Empresa: ${values.company}`,
    values.jobTitle ? `Cargo: ${values.jobTitle}` : "",
    `Correo: ${values.email}`,
    values.phone ? `Teléfono: ${values.phone}` : "",
    values.message ? `\nMensaje:\n${values.message}` : "",
  ].filter(Boolean);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

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
  marketing: boolean;
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
  marketing: false, // opcional, NUNCA premarcado
  company_url: "",
};

export function DemoForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [showFallback, setShowFallback] = useState(false);

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

    // Envío directo a HubSpot desde el cliente (sitio estático).
    // REGLA CRÍTICA: solo mostramos "éxito" si el lead se ENTREGÓ de verdad.
    // Si HubSpot no está configurado o falla, NO simulamos éxito (evita perder leads
    // silenciosamente): mostramos un mensaje veraz y un canal de correo alternativo.
    const result = await submitLeadToHubspot(parsed.data);
    if (result.delivered) {
      setStatus("success");
      return;
    }

    setStatus("error");
    setShowFallback(true);
    setServerMessage(
      result.reason === "not_configured"
        ? "El envío automático del formulario no está disponible ahora mismo. Escríbenos directamente por correo con estos datos y te damos plaza igualmente."
        : "No hemos podido enviar tu solicitud en este momento. Inténtalo de nuevo en unos minutos o escríbenos directamente por correo.",
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

      {/* Información básica de protección de datos (primera capa). El detalle y la
          base jurídica definitiva están en la política de privacidad (pendiente de
          revisión legal). El consentimiento de marketing es aparte y opcional. */}
      <div className="rounded-xl border border-ink-100 bg-paper/70 p-3.5 text-xs leading-relaxed text-ink-500">
        <p>
          <strong className="font-semibold text-ink-700">Responsable:</strong> LICITATIS.{" "}
          <strong className="font-semibold text-ink-700">Finalidad:</strong> gestionar tu solicitud
          de plaza en la beta y ponernos en contacto contigo.{" "}
          <strong className="font-semibold text-ink-700">Destinatario:</strong> HubSpot (proveedor
          que usamos para gestionar contactos comerciales).{" "}
          <strong className="font-semibold text-ink-700">Derechos:</strong> acceso, rectificación y
          supresión, entre otros, escribiendo a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-brand-700 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . Más información en la{" "}
          <Link
            href="/privacidad"
            className="font-medium text-brand-700 underline-offset-2 hover:underline"
          >
            política de privacidad
          </Link>
          .
        </p>
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
        . <span className="text-ink-400">(obligatorio)</span>
      </Checkbox>

      {/* Marketing OPCIONAL: no premarcado, no obligatorio, registrado por separado. */}
      <Checkbox
        id="marketing"
        name="marketing"
        checked={values.marketing}
        onChange={(e) => update("marketing", e.target.checked)}
      >
        Quiero recibir novedades y comunicaciones comerciales de LICITATIS.{" "}
        <span className="text-ink-400">(opcional)</span>
      </Checkbox>

      {status === "error" && serverMessage ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-red-100"
        >
          <p className="flex items-start gap-2">
            <Icon name="alert-triangle" size={16} className="mt-0.5 shrink-0" />
            <span>{serverMessage}</span>
          </p>
          {showFallback ? (
            <a
              href={buildMailtoFallback(values)}
              className="mt-2 inline-flex items-center gap-1.5 pl-6 font-semibold text-red-800 underline underline-offset-2"
            >
              <Icon name="mail" size={14} />
              Escribirnos por correo a {CONTACT_EMAIL}
            </a>
          ) : null}
        </div>
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
