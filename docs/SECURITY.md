# Seguridad

Resumen de las medidas de seguridad de la landing y de sus límites conocidos.

## Cabeceras HTTP

Definidas en `next.config.mjs` y aplicadas a todas las rutas:

| Cabecera                    | Valor / propósito                                            |
| --------------------------- | ------------------------------------------------------------ |
| `Content-Security-Policy`   | Restringe orígenes de scripts, estilos, imágenes, conexiones |
| `Strict-Transport-Security` | Fuerza HTTPS (HSTS, 2 años, subdominios, preload)            |
| `X-Content-Type-Options`    | `nosniff`                                                    |
| `X-Frame-Options`           | `DENY` (anti-clickjacking)                                  |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                            |
| `Permissions-Policy`        | Desactiva cámara, micrófono, geolocalización, topics         |

Además: `poweredByHeader: false` (sin `X-Powered-By`) y `productionBrowserSourceMaps: false`
(no se exponen source maps de producción).

## Content Security Policy — nota importante

La CSP actual incluye `script-src 'unsafe-inline'`. Es un **compromiso consciente** para mantener
las páginas **estáticas** (mejor rendimiento y caché) sin recurrir a un nonce por petición. Dado
que la landing no renderiza entrada de usuario (el formulario se envía a una API y no se refleja
en el DOM), la superficie de XSS es muy baja.

**Ruta de mejora (CSP con nonce):** para eliminar `'unsafe-inline'` de `script-src`:

1. Crear `middleware.ts` que genere un `nonce` por petición y lo escriba en la cabecera CSP y en
   `x-nonce` de la request.
2. Sustituir `'unsafe-inline'` por `'nonce-<nonce>' 'strict-dynamic'` en `script-src`.
3. Leer el nonce en el layout con `headers()` y pasarlo a los `<Script>` propios.

Esto convierte las páginas en dinámicas (renderizado por petición), un coste asumible para una
landing pero que conviene medir.

## Validación y antispam del formulario

- **Validación en servidor** con Zod (`src/lib/validation.ts`) como fuente de verdad; el cliente
  valida además para dar feedback inmediato.
- **Honeypot** (`company_url`): si llega relleno, se trata como spam sin procesar.
- **Rate limiting** best-effort por IP (`src/lib/rate-limit.ts`): 5 envíos/min.
  - *Limitación:* en serverless el estado no se comparte entre instancias. Para un límite robusto
    y distribuido, usar un almacén tipo KV (p. ej. Upstash Redis).
- **Consentimiento** de privacidad obligatorio antes de enviar.
- Los errores de servidor no exponen detalles internos al cliente; se registran en el servidor.

## Gestión de secretos

- `HUBSPOT_PRIVATE_APP_TOKEN` (si se usa) es **secreto** y solo debe existir en el entorno de
  servidor de Vercel. **Nunca** como variable `NEXT_PUBLIC_` ni en el cliente.
- Portal ID y Form ID de HubSpot son identificadores públicos, no secretos.
- `.gitignore` excluye `.env` y `.env.*` (salvo `.env.example`), `.vercel/`, builds y temporales.
- No se incluyen credenciales, tokens ni claves en el repositorio.

## Terceros y privacidad

- Tipografías **autoalojadas** (`next/font`): sin peticiones a Google Fonts en runtime.
- HubSpot Tracking y Google Analytics **no** se cargan hasta el consentimiento correspondiente.
- La CSP contempla los hosts de HubSpot y Google para cuando se activen.

## Comprobaciones recomendadas antes de desplegar

- [ ] `npm audit` sin vulnerabilidades altas/críticas en dependencias de producción.
- [ ] Revisar que no hay `.env*` reales en el control de versiones (`git status`).
- [ ] Probar el formulario (éxito, error de validación, honeypot, rate limit).
- [ ] Verificar cabeceras en la URL desplegada (p. ej. con las DevTools o `curl -I`).
- [ ] Confirmar que no se cargan cookies/scripts de terceros antes del consentimiento.
