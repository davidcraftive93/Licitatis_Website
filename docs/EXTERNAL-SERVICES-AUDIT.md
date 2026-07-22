# LICITATIS — Inventario de servicios externos y recursos de terceros

Auditoría del comportamiento **real** del código (no solo de la documentación). Búsqueda en todo el repo de scripts, iframes, formularios, píxeles, cookies, almacenamiento y llamadas de red.

## Servicios y recursos por estado

| Proveedor / recurso | Estado | Dónde | Carga / condición | Notas |
|---|---|---|---|---|
| **HubSpot Forms API** (`api.hsforms.com`) | **Activo (de primera parte)** | `src/lib/hubspot.ts` | `fetch` al enviar el formulario, tras aceptar privacidad | No inyecta scripts ni cookies de terceros; requiere `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`/`_FORM_ID`. Si faltan, el formulario NO simula éxito: ofrece correo alternativo |
| **HubSpot Tracking** (`js.hs-scripts.com`) | Configurado pero desactivado por defecto | `src/components/analytics/Analytics.tsx` | Solo si `consent.marketing === true` **y** existe `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | No carga sin consentimiento de marketing |
| **Google Analytics 4** (`googletagmanager.com`) | Configurado pero desactivado por defecto | `src/components/analytics/Analytics.tsx` | Solo si `NEXT_PUBLIC_ENABLE_ANALYTICS==="true"` **y** `consent.analytics` **y** `NEXT_PUBLIC_GA_ID` | `anonymize_ip:true`. Nada carga sin consentimiento |
| **Cookie `hubspotutk`** (lectura) | Condicional | `src/lib/utm.ts` | Se lee si existe (la crea el tracking de HubSpot) para atribución | No se crea desde la web; solo se adjunta al envío si existe |
| **Cookie propia `licitatis_consent`** | Activo (necesaria) | `src/lib/consent.ts` | Guarda la elección de cookies (1ª parte, `SameSite=Lax`, 180 días) | No es de seguimiento |
| Fuentes (next/font — Poppins, Inter, Geist Mono) | Activo (auto-hospedadas) | `src/app/fonts.ts` | Servidas desde el propio dominio en el build | Sin llamadas a Google Fonts en runtime |
| Imagen Open Graph | Activo (estática) | `src/app/opengraph-image.tsx` | Generada en build, servida local | — |

## Proveedores mencionados solo en textos/documentación (no activos como tracking)

- **HubSpot** como encargado del tratamiento (política de privacidad) — coherente con el uso real de la Forms API.

## Proveedores NO presentes (verificado por búsqueda)

Google Tag Manager (como contenedor), Meta Pixel, LinkedIn Insight, Calendly, YouTube/Vimeo, Supabase, OpenAI/Anthropic/Gemini, Sentry, Stripe, Resend, PostHog, Hotjar, Clarity, WebSocket, chat de terceros. **Ninguno** aparece en el código de este repositorio.

## Confirmaciones pendientes del propietario (BLOCKED_PROVIDER_CONFIRMATION)

1. **HubSpot**: región de datos (UE/EEUU) y base de la transferencia internacional (SCC / Data Privacy Framework) para documentarlo en la política de privacidad y, en su caso, en la lista de subencargados.
2. **Google Analytics 4** (si se activa): declararlo en la política de cookies con tabla nombre/finalidad/duración antes de habilitar `NEXT_PUBLIC_ENABLE_ANALYTICS=true`.

## Contenido de seguridad servido (CSP)

`public/.htaccess` permite en `connect-src`/`script-src`/`frame-src` los dominios de HubSpot y Google Analytics. Coherente con el inventario. Si se retira GA de forma definitiva, conviene endurecer el CSP quitando `googletagmanager.com` y `google-analytics.com`.
