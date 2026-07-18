# Seguridad

Resumen de las medidas de seguridad de la landing (sitio **estático** en Hostinger) y sus límites.

## Cabeceras HTTP (vía `.htaccess`)

Como el sitio es estático (`output: "export"`), **no** hay servidor Next: las cabeceras de
`next.config.mjs` no aplican. Las cabeceras se configuran en **`public/.htaccess`** (se copia a
`out/.htaccess` en el build) y las aplica Apache/LiteSpeed en Hostinger:

| Cabecera | Propósito |
| --- | --- |
| `Content-Security-Policy` | Restringe orígenes de scripts, estilos, imágenes y conexiones |
| `Strict-Transport-Security` | Fuerza HTTPS (HSTS, 2 años, subdominios, preload) |
| `X-Content-Type-Options: nosniff` | Evita el MIME sniffing |
| `X-Frame-Options: DENY` | Anti-clickjacking |
| `Referrer-Policy: strict-origin-when-cross-origin` | Limita el referrer |
| `Permissions-Policy` | Desactiva cámara, micrófono, geolocalización, topics |

Además: redirección a HTTPS, `Options -Indexes` (sin listado de directorios), bloqueo de archivos
ocultos sensibles, compresión y caché. Verifica las cabeceras tras el despliegue con `curl -I https://licitatis.es/`.

### CSP — nota

La CSP incluye `script-src 'unsafe-inline'` (necesario para los `<script type="application/ld+json">`
y el bootstrap de `js`). En un sitio estático sin entrada de usuario reflejada, la superficie de XSS
es muy baja. La CSP contempla además los orígenes de HubSpot y Google Analytics para cuando se
activen tras consentimiento. Endurecer a CSP con hashes/nonce requeriría un paso de post-proceso
sobre el HTML exportado (mejora futura opcional).

## Formulario

- **Validación con Zod** en el cliente (`src/lib/validation.ts`).
- **Honeypot** (`company_url`): si llega relleno, no se envía.
- **Consentimiento** de privacidad obligatorio antes de enviar.
- Envío directo a la **Forms API pública** de HubSpot (solo IDs públicos; ver `docs/HUBSPOT.md`).
- **Sin rate limiting propio** (no hay backend): la defensa antispam recae en el honeypot y en las
  protecciones de la propia Forms API de HubSpot. Un control más estricto requeriría un backend
  independiente.

## Gestión de secretos

- **No hay secretos en el sitio.** Solo se usan identificadores **públicos** de HubSpot
  (`NEXT_PUBLIC_*`), que por diseño se incrustan en el build.
- **`HUBSPOT_PRIVATE_APP_TOKEN` NO se usa** en esta web. Si hiciera falta, iría en un backend aparte.
- Los **secretos de despliegue** (SSH/Hostinger) viven **solo** en el GitHub Environment
  `production`, nunca en el código, README, YAML con valores reales, logs ni variables del frontend.
- `.gitignore` excluye `.env`/`.env.*` (salvo `.env.example`), `out/`, `node_modules`, `.next` y temporales.

## Terceros y privacidad

- Tipografías **autoalojadas** (`next/font`): sin peticiones a Google Fonts en runtime.
- HubSpot Tracking y Google Analytics **no** se cargan hasta el consentimiento correspondiente.
- El envío del formulario (acción de primera parte) no depende de aceptar cookies de marketing.

## Comprobaciones recomendadas antes de desplegar

- [ ] `npm audit` sin vulnerabilidades altas/críticas (actualmente **0**).
- [ ] `git status` sin `.env*` reales versionados.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` en verde (los ejecuta la CI).
- [ ] Tras el despliegue: cabeceras correctas (`curl -I`), sin scripts/cookies de terceros antes del
      consentimiento, y formulario operativo.
