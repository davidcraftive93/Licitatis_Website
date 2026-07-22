# LICITATIS — Reglas de consentimiento de marketing

Reglas que cumple la web y que el release gate ayuda a proteger.

## Principios
1. **Separado de la privacidad.** Aceptar la política de privacidad (obligatorio) y aceptar comunicaciones comerciales (opcional) son **dos casillas distintas**.
2. **No premarcado.** La casilla de marketing arranca desmarcada (`initialValues.marketing = false`). El release gate bloquea si detecta `marketing: true` o una casilla premarcada.
3. **No obligatorio.** No hace falta aceptar marketing para solicitar la demostración/beta ni para contactar. Solo `privacy` es requisito (`z.literal(true)`); `marketing` es `z.boolean().optional()`.
4. **Registro separado.** La decisión de marketing se envía a HubSpot como línea propia («Consentimiento de marketing: Sí/No»), diferenciada del consentimiento de tratamiento (`legalConsentOptions.consent.consentToProcess`).
5. **Reversible.** El usuario puede retirar el consentimiento de comunicaciones en cualquier momento (indicado en la política de privacidad).

## Dónde vive en el código
- `src/lib/validation.ts` — `marketing: z.boolean().optional().default(false)`.
- `src/components/forms/DemoForm.tsx` — casilla opcional, desmarcada, separada de `privacy`.
- `src/lib/hubspot.ts` — registro separado en el mensaje + texto de consentimiento.
- `scripts/verify-legal-launch.mjs` — regla `MARKETING_PREMARCADO`.

## Cookies de marketing
Las cookies de marketing (p. ej. `hubspotutk` vía HubSpot Tracking) **no** se cargan sin el consentimiento de la categoría «marketing» del banner (`src/components/analytics/Analytics.tsx`). Aceptar y rechazar tienen la misma jerarquía visual.

## Pendiente
- Si se desea un doble opt-in o tipos de suscripción de HubSpot (subscriptionTypeId), configurarlos en el portal y enlazarlos. Estado: `Propuesto`.
