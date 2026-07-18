# Integración con HubSpot (sitio estático)

Como la web es **estática** (no hay backend), el formulario de solicitud de demostración se envía
**desde el navegador** a la **Forms Submission API pública** de HubSpot, que solo requiere
**identificadores públicos** (Portal ID y Form ID) y **no** un token privado:

```
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}
```

Implementación: `src/lib/hubspot.ts` (`submitLeadToHubspot`) invocado desde `src/components/forms/DemoForm.tsx`.

## Por qué envío directo y no formulario embebido

Se mantiene el **formulario propio** (accesible y con nuestro diseño) y se envía por la API pública
en lugar de usar el formulario embebido de HubSpot porque:

- **No inyecta scripts ni cookies de terceros para poder enviar.** El envío es una acción explícita
  de primera parte; así el CTA funciona aunque el usuario **rechace** las cookies de marketing (con
  el formulario embebido, el script cargaría cookies y el consentimiento condicionaría el envío).
- Preserva la **accesibilidad** y la coherencia visual.

> La alternativa embebida (`hbspt.forms.create` con `js.hsforms.net`) sigue siendo válida si se
> prefiere; habría que cargarla tras el consentimiento y ajustar estilos. El envío directo es la
> opción recomendada para este caso.

## Qué necesitas del propietario

| Dato | Variable | ¿Secreto? |
| --- | --- | --- |
| Portal ID | `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | No (público) |
| Form ID | `NEXT_PUBLIC_HUBSPOT_FORM_ID` | No (público) |
| URL de política de privacidad | (ya enlazada en el formulario) | No |

`NEXT_PUBLIC_*` se incrusta en el build estático (es información pública, no secreta).

## Configuración

1. En HubSpot: Marketing → Formularios → crea un formulario y copia su **Form ID**.
2. Copia el **Portal ID** (Hub ID) de la cuenta.
3. Define las variables antes del build (en `.env.local` para pruebas y en el entorno de build de CI/despliegue):
   ```bash
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=xxxxxxx
   NEXT_PUBLIC_HUBSPOT_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
4. Vuelve a construir y desplegar. Haz una prueba y verifica el contacto en HubSpot.

> Como las variables se incrustan en el build, deben estar disponibles en el momento de compilar el
> artefacto que se despliega (paso `npm run build` del workflow de despliegue).

## Campos enviados

Se mapean a propiedades estándar de contacto: `firstname`, `lastname`, `email`, `company`,
`jobtitle`, `phone`, `message`. Los campos «licitaciones al año» y «principal dificultad» se
incluyen dentro de `message` (para no depender de propiedades personalizadas). Para guardarlos en
propiedades propias, créalas en HubSpot, añádelas al formulario y ajusta `buildMessage`/`fields` en
`src/lib/hubspot.ts`.

## Atribución, UTM y consentimiento

- Se capturan los parámetros **UTM** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
  `utm_content`) y, si existe, la cookie `hubspotutk` (`hutk`), que se adjuntan al envío.
- El envío incluye `legalConsentOptions.consent.consentToProcess = true` con un texto de
  consentimiento. **Revísalo con asesoría legal.**
- El **script de tracking** de HubSpot y GA4 solo se cargan tras el consentimiento correspondiente
  (`src/components/analytics/Analytics.tsx`); no son necesarios para enviar el formulario.

## Nunca

- No expongas `HUBSPOT_PRIVATE_APP_TOKEN` en el frontend. En un sitio estático no hay un lugar
  seguro para un token privado: si se necesitara una integración privada (CRM API, enriquecimiento),
  debe hacerse desde un **backend o servicio seguro independiente**, fuera de esta web.

## Antispam

Al no haber servidor, no hay rate limiting propio. La defensa es: **honeypot** (`company_url`),
validación con Zod en el cliente y las **protecciones antispam/rate limiting propias de la Forms API
de HubSpot**. Si se necesitara un control más estricto, requeriría un backend independiente.
