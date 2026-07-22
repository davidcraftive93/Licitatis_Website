# LICITATIS — Inventario de tratamientos (web pública)

Registro de las actividades de tratamiento de datos personales de **esta web comercial** (no de la aplicación). Basado en el código real. Estados: `Verificado` (comprobable en el repo) · `Propuesto` · `Pendiente de revisión profesional`.

## T1 — Solicitud de plaza en la beta / demostración (formulario)

| Campo | Valor | Estado |
|---|---|---|
| Finalidad | Gestionar la solicitud y contactar; en su caso, informar del producto | Verificado (`DemoForm.tsx`, `hubspot.ts`) |
| Categorías de datos | Nombre, apellidos, correo, empresa, cargo (opc.), teléfono (opc.), mensaje (opc.), decisión de marketing | Verificado |
| Datos especiales | No se recogen | Verificado |
| Base jurídica | Consentimiento y/o medidas precontractuales | Pendiente de revisión profesional |
| Consentimiento de marketing | Opcional, separado, no premarcado; se registra por separado | Verificado (`validation.ts`, `DemoForm.tsx`, `hubspot.ts`) |
| Encargado | HubSpot (Forms API) | Verificado (`hubspot.ts`) |
| Transferencia internacional | Según región de HubSpot | Pendiente de confirmar (SCC/DPF) |
| Conservación | Mientras haya interés mutuo / hasta supresión + plazos legales | Pendiente de definir |
| Minimización | Solo se piden datos necesarios; validación con Zod | Verificado (`validation.ts`) |
| Seguridad en tránsito | HTTPS forzado; sin token privado en el cliente | Verificado (`.htaccess`, `hubspot.ts`) |
| Pérdida de leads | Si HubSpot no entrega, no se simula éxito; canal de correo alternativo | Verificado (`DemoForm.tsx`) |
| Derechos | Acceso, rectificación, supresión, etc. vía correo de privacidad | Verificado (página privacidad) |

## T2 — Preferencia de cookies

| Campo | Valor | Estado |
|---|---|---|
| Finalidad | Recordar la elección de cookies del usuario | Verificado (`consent.ts`) |
| Datos | Cookie `licitatis_consent` (1ª parte), sin identificador personal | Verificado |
| Base jurídica | Interés en el funcionamiento (cookie necesaria) | Propuesto |
| Conservación | 180 días | Verificado |

## T3 — Analítica (Google Analytics 4) — SOLO si se activa

| Campo | Valor | Estado |
|---|---|---|
| Estado | Desactivada por defecto (`NEXT_PUBLIC_ENABLE_ANALYTICS` + consentimiento) | Verificado (`Analytics.tsx`) |
| Base jurídica | Consentimiento | Verificado (no carga sin consentimiento) |
| Datos | Identificadores de uso agregados; `anonymize_ip` activo | Verificado |
| Conservación / transferencias | Según configuración de Google | Pendiente de confirmar antes de activar |

## Pendientes (bloqueantes de apertura pública)
- Base jurídica definitiva de T1; plazos de conservación; garantías de transferencia de HubSpot; confirmación de GA antes de activarlo. Ver `LEGAL-REVIEW-PACK.md`.
