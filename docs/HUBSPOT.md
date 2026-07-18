# Integración con HubSpot

El formulario de solicitud de demostración se envía a HubSpot **desde el servidor**
(`src/app/api/lead/route.ts` → `src/lib/hubspot.ts`) usando la **Forms Submission API**. Así, el
navegador nunca maneja tokens y el formulario mantiene el diseño propio del sitio (sin iframe ni
scripts de terceros antes del consentimiento).

## Qué necesitas del propietario

| Dato                     | Dónde se usa                          | ¿Secreto? |
| ------------------------ | ------------------------------------- | --------- |
| **Portal ID**            | Envío del formulario + tracking       | No        |
| **Form ID**              | Envío del formulario                  | No        |
| **Private App Token**    | (Opcional) enriquecer contactos vía CRM | **Sí**  |
| URL de política de privacidad | Consentimiento del formulario    | No        |
| Correo de contacto       | Web y respuestas                      | No        |

## Configuración paso a paso

1. En HubSpot, crea un **formulario** (Marketing → Formularios). Copia su **Form ID**.
2. Obtén el **Portal ID** (Hub ID) de tu cuenta (Configuración → Cuenta).
3. Define las variables de entorno (en Vercel y en `.env.local` para pruebas):

   ```bash
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=xxxxxxx
   NEXT_PUBLIC_HUBSPOT_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

   Alternativa **solo servidor** (si prefieres no exponer los IDs al cliente; tienen prioridad):

   ```bash
   HUBSPOT_PORTAL_ID=xxxxxxx
   HUBSPOT_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

4. Vuelve a desplegar. Envía una prueba y verifica que el contacto aparece en HubSpot.

## Campos que se envían

Se mapean a propiedades estándar de contacto de HubSpot:

`firstname`, `lastname`, `email`, `company`, `jobtitle`, `phone`, `message`.

Los campos adicionales del formulario (**licitaciones al año** y **principal dificultad**) se
incluyen dentro de `message` para no depender de propiedades personalizadas. Si quieres
guardarlos en propiedades propias:

1. Crea las propiedades de contacto en HubSpot (p. ej. `licitaciones_por_ano`, `principal_dificultad`).
2. Añádelas como campos del formulario de HubSpot.
3. Modifica `buildMessage`/`fields` en `src/lib/hubspot.ts` para enviarlas como `fields` propios.

## Atribución y tracking

- El endpoint incluye `pageUri`, `pageName`, `ipAddress` y, si existe, la cookie `hubspotutk`
  (`hutk`) para asociar el envío a la sesión de tracking.
- Los **parámetros UTM** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
  se capturan en el cliente y se añaden al mensaje.
- El **script de tracking** de HubSpot (`js.hs-scripts.com/<portalId>.js`) solo se carga tras el
  consentimiento de **marketing** (ver `src/components/analytics/Analytics.tsx`).

## Consentimiento (RGPD)

El envío incluye `legalConsentOptions.consent.consentToProcess = true` con un texto de
consentimiento. Revisa ese texto y la política de privacidad enlazada con asesoría legal.

## Alternativa: formulario embebido de HubSpot

Si en el futuro se prefiere el formulario embebido (`hbspt.forms.create`), habría que:

1. Cargar el script `js.hsforms.net` (solo tras consentimiento).
2. Insertar el formulario en la sección de demostración.
3. Ajustar la CSP (`script-src`, `frame-src`) — los hosts de HubSpot ya están contemplados en
   `next.config.mjs`.

El endpoint de servidor es la opción recomendada por diseño, rendimiento y privacidad.

## Comportamiento sin configurar

Si faltan Portal/Form ID, `/api/lead` responde `{ ok: true, delivered: false, reason: "not_configured" }`
y registra un aviso en el servidor. La landing sigue siendo usable, pero **los leads no se
entregan a ningún CRM** hasta completar la configuración.
