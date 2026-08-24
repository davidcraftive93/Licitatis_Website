# LICITATIS — Matriz de auditoría postimplementación (legal, privacidad, IA, seguridad)

Rama de auditoría: `audit/legal-privacy-launch` (base: `main`).
Método: lectura del código real + auditoría multiagente (8 dimensiones) con verificación de evidencia.
Alcance: **web pública/comercial** (este repositorio). La aplicación privada (`app.licitatis.es`) es un proyecto separado.

Estados: `PASS` · `FAIL` · `PARTIAL` · `NOT_APPLICABLE` · `BLOCKED_LEGAL_REVIEW` · `BLOCKED_PRODUCT_CONFIRMATION` · `BLOCKED_PROVIDER_CONFIRMATION`.

> Contexto importante: **el mandato de implementación legal/privacidad/transparencia previo nunca se llevó a cabo como tal.** No existía ninguna rama `legal/*`. Lo que había en `main` es una landing comercial con páginas legales de plantilla (con placeholders), sistema de consentimiento y formulario a HubSpot desde cliente. Esta auditoría corrige todos los defectos **técnicos** verificables y deja claramente marcados los bloqueantes que dependen de **datos legales/comerciales del propietario**.

> **Actualización — Fase A (implementación de la base) completada.** Se ejecutó primero la implementación técnica que faltaba y después la auditoría:
> - **Config legal central** `src/lib/legal.ts` (fuente única tipada con `[LEGAL_REVIEW_REQUIRED: …]`); las 7 páginas legales leen de ella.
> - **Páginas nuevas** (noindex): `/seguridad-y-privacidad`, `/acuerdo-tratamiento-datos`, `/subencargados`; añadidas al footer. Versión/fecha e impresión (PDF) en todas.
> - **Sección pública de transparencia de IA** (`/#ia`).
> - **Marketing opcional** en el formulario: casilla separada, no premarcada, no obligatoria, registrada aparte.
> - **Tabla de cookies real** en `/cookies`; cláusulas de aceptación automática reformuladas.
> - **Release gate ampliado**: rutas nuevas, enlaces legales rotos, marketing premarcado, certificaciones sin acreditar. `format:check` añadido a CI.
> - **Docs nuevos**: `DATA-PROTECTION-INVENTORY.md`, `MARKETING-CONSENT-RULES.md`.
> Persisten como bloqueantes de apertura pública los datos legales/comerciales del propietario (identidad registral, transferencias, plazos, claims de seguridad/planes).

## Resumen por dimensión

| Dimensión | Estado tras auditoría | Bloqueante apertura pública |
|---|---|---|
| Páginas legales (contenido) | BLOCKED_LEGAL_REVIEW | Sí (placeholders) |
| Indexación de páginas legales | PASS (corregido: noindex + fuera de sitemap) | No |
| Formulario / pérdida de leads | PASS (corregido: sin falso éxito + canal alternativo) | No |
| Información por capas en formulario | PARTIAL (añadida 1ª capa; base jurídica pendiente) | No |
| Cookies y consentimiento | PASS (paridad rechazar/aceptar corregida) | No |
| Transparencia de IA (landing) | PARTIAL | Sí (sección propia pendiente) |
| Handoff de IA para el SaaS | Documentado (BLOCKED en la app) | N/A landing |
| Claims comerciales | PARTIAL / BLOCKED_PRODUCT/PROVIDER | Sí (seguridad, planes) |
| Seguridad (cabeceras) | PARTIAL (HSTS reducido; pendiente verificación en prod) | No |
| GitHub Actions / despliegue | PASS (endurecido) | No |
| Dominio canónico / Vercel | PASS (corregido a licitatis.es; Vercel eliminado) | No |
| Release gate legal | PASS (creado + pruebas) | No |

## Requisitos y estado (detalle)

| ID | Requisito | Estado | Evidencia | Corrección aplicada | Bloqueante | Rev. legal |
|---|---|---|---|---|---|---|
| §6 | Fuente única tipada de datos legales | PARTIAL | `src/lib/site.ts` centraliza dominio/contacto; identidad registral no existe como dato | Documentada en `LEGAL-SOURCE-REGISTER.md`; los datos registrales son bloqueantes legales | No | Sí |
| §8 | Release gate legal que falla el build inseguro | PASS | `scripts/verify-legal-launch.mjs`, `scripts/legal-launch-rules.mjs`, `src/lib/legal-launch.test.ts` | Creado gate (dev/production/--deploy) + pruebas unitarias + integrado en CI y deploy | No | No |
| §9 | El formulario nunca muestra falso éxito | **PASS** | Antes `DemoForm.tsx` mostraba «Solicitud recibida» con `reason==="not_configured"` | Solo se muestra éxito si `result.delivered`; si no, mensaje veraz + `mailto` con los datos | No | No |
| §9 | Bloqueo de botón / doble envío | PASS | `DemoForm.tsx` `disabled={status==="submitting"}` | Ya cumplía | No | No |
| §9 | Honeypot y validación | PASS | `company_url` honeypot + `leadSchema` (Zod) | Ya cumplía | No | No |
| §10 | Información por capas en el formulario | PARTIAL | `DemoForm.tsx` (bloque Responsable/Finalidad/Destinatario/Derechos) | Añadida 1ª capa; base jurídica definitiva pendiente de revisión | No | Sí |
| §10 | Marketing separado y no premarcado | PASS | El formulario NO recoge consentimiento de marketing; consent banner con categorías a `false` | Ya cumplía (no hay premarcado) | No | No |
| §11 | Nada no esencial antes del consentimiento | PASS | `Analytics.tsx` devuelve `null` sin consentimiento; GA/HubSpot condicionados | Ya cumplía | No | No |
| §11 | Paridad rechazar/aceptar | **PASS** | `ConsentBanner.tsx` (mismo estilo en ambos botones) | «Rechazar» ahora con la misma jerarquía visual que «Aceptar» | No | No |
| §11 | Versionado y persistencia del consentimiento | PASS | `consent.ts` `CONSENT_VERSION`, cookie 180 días, re-pregunta si cambia versión | Ya cumplía | No | No |
| §11 | Reabrir preferencias desde el footer | PASS | `CookiePreferencesButton` + `reopen()` | Ya cumplía | No | No |
| §12 | Páginas legales noindex mientras haya placeholders | **PASS** | 4 páginas con `robots:{index:false,follow:false}` | Corregido en las 4 páginas | No | No |
| §12 | Páginas con placeholders fuera del sitemap | **PASS** | `sitemap.ts` solo incluye `/` | Retiradas las 4 páginas legales del sitemap | No | No |
| §12/13 | Contenido legal real (aviso, privacidad, cookies, términos) | BLOCKED_LEGAL_REVIEW | Placeholders `[Razón social]`, `[NIF]`, `[Dirección]`, transferencias HubSpot, plazos | No inventado; ver `LEGAL-REVIEW-PACK.md` | **Sí** | Sí |
| §12 | Rutas legales /seguridad-y-privacidad, /acuerdo-tratamiento-datos, /subencargados | FAIL | No existen | Documentadas como pendientes (requieren contenido legal) | Sí (apertura pública) | Sí |
| §13 | Sin cláusulas absolutas/abusivas | PARTIAL | Aviso/Términos: «El acceso implica la aceptación…» | Señalado; reformulación requiere revisión legal | No | Sí |
| §14 | Transparencia de IA en la landing | PARTIAL | Copy honesto («la IA no decide»), sin sección dedicada «Cómo usamos IA» | Pendiente sección propia + `SAAS-AI-TRANSPARENCY-HANDOFF.md` creado | Sí (apertura) | Sí |
| §15 | Claims comerciales sin absolutismos | PARTIAL | Sin «100%/completamente seguro/garantiza adjudicación» (verificado por gate) | Gate bloquea claims prohibidos; ver `LEGAL-CLAIMS-AUDIT.md` | No | Sí |
| §15/16 | Claims de seguridad (2FA, cifrado, roles, UE) | BLOCKED_PROVIDER_CONFIRMATION | `content.ts` `privacyPoints` afirma 2FA, roles, UE, sin-entrenamiento | No verificable desde este repo; ver claims audit | Sí | Sí |
| §16 | Límites de planes reales | BLOCKED_PRODUCT_CONFIRMATION | `content.ts` `planLimitRows` | No verificable desde este repo (app separada) | Sí | No |
| §17 | Cabeceras de seguridad | PARTIAL | `public/.htaccess` (CSP, XFO, Referrer, Permissions) | HSTS reducido (sin `includeSubDomains`/`preload`); pendiente verificación en producción | No | No |
| §18 | CI valida y no despliega | PASS | `ci.yml` (lint/typecheck/test/build + gate dev) | Añadido paso `verify:legal-launch` | No | No |
| §18 | Deploy solo manual + confirmación + environment | PASS | `deploy-hostinger.yml` `workflow_dispatch` + `DEPLOY LICITATIS` + `production` | Ya cumplía | No | No |
| §18 | Sin filtrar secretos en logs | **PASS** | Antes imprimía longitud/tipo/prefijo de la clave SSH | Eliminado el diagnóstico que revelaba longitud/prefijo | No | No |
| §18 | rsync --delete con exclusiones seguras | **PASS** | Añadidos `--exclude` (.well-known, cgi-bin, .htpasswd, .user.ini, error_log) | Corregido | No | No |
| §18 | Backups con retención y aborto si fallan | **PASS** | Retención 5 + `exit 1` si falla el backup (había `|| warning`) | Corregido | No | No |
| §19 | Dominio canónico único (licitatis.es sin www) | **PASS** | `site.ts` por defecto `https://licitatis.es`; gate lo verifica | Corregido | No | No |
| §20 | Sin referencias a Vercel obsoletas | **PASS** | `vercel.json` eliminado; `.env.example` corregido | Corregido | No | No |
| §21 | Accesibilidad (menú, banner, foco, reduced-motion) | PASS | Auditado en PR previos + banner operable por teclado | Menú móvil cierra en `lg`; banner con foco | No | No |
| §22 | Pruebas del gate legal | PASS | `src/lib/legal-launch.test.ts` (placeholders, claims, dominio) | Añadidas | No | No |

## Veredicto (resumen; ver informe final)

- **GO staging (noindex):** SÍ — compila, rutas OK, sin secretos expuestos, bloqueantes señalados.
- **GO beta privada:** CONDICIONADO — requiere que los participantes conozcan el estado beta, verificar HubSpot y resolver el mínimo legal de la política de privacidad.
- **GO apertura pública:** **NO** — persisten `[LEGAL_REVIEW_REQUIRED]`, `BLOCKED_LEGAL_REVIEW`, `BLOCKED_PROVIDER_CONFIRMATION`, `BLOCKED_PRODUCT_CONFIRMATION`.
- **GO servicio cobrable:** **NO** — faltan términos comerciales, DPA, subencargados, política de conservación y revisión jurídica.

---

## Adenda — rama `feature/expediente-vivo` (PR #20, apilada sobre #19)

Esta matriz corresponde a la auditoría anterior. La rama de «El Expediente Vivo» **no cambia
ninguno de sus veredictos**: sigue `BLOCKED_LEGAL_REVIEW` y la apertura pública sigue en **NO**.

Lo que sí cambia, a favor:

| Punto de la matriz | Antes | Ahora |
|---|---|---|
Coherencia de datos mostrados | el mismo expediente de demostración exhibía tres avances distintos (64 % / 50 % / 74 %) | una sola fuente (`src/lib/demo-expediente.ts`); la fracción del checklist se deriva |
Claim «Datos alojados en la UE» | afirmado en la landing, **contradicho** por `/seguridad-y-privacidad` | retirado de la landing hasta que el propietario confirme proveedor y región |
Correo de contacto | literal fijo en `content.ts` **y** `siteConfig` en paralelo | fuente única (`siteConfig.contactEmail`) |
Documentación contra código | README/DEPLOYMENT afirmaban que sin HubSpot «el formulario muestra confirmación sin entregar el lead» | corregido: el código nunca finge éxito, y la documentación ya lo dice |
Higiene de credenciales | `ssh-keygen` documentado **dentro** del repositorio, claves presentes sin ignorar | instrucción a `~/.ssh` y claves ignoradas (borrarlas del disco es del propietario) |
Cobertura de pruebas | 21 | **59** (expediente, capas, procedencia, intención de CTA, geometría del viaje, niveles de calidad) |

Sin cambios en: secretos, entorno `production`, workflow de despliegue (sigue manual con
confirmación `DEPLOY LICITATIS`), DNS, Hostinger, ni en el estado `noindex`.

---

## Adenda 2 — cierre de los textos legales (25/08/2026)

Los marcadores han desaparecido y **los veredictos cambian**. Registro del cambio:

| Veredicto | Antes | Ahora |
|---|---|---|
GO staging (noindex) | SÍ | SÍ |
GO beta privada | CONDICIONADO | **SÍ**, con HubSpot configurado |
GO apertura pública | **NO** — `BLOCKED_LEGAL_REVIEW` | **CONDICIONADO** — el gate ya no bloquea por textos legales; falta configurar HubSpot (`BLOCKED_PROVIDER_CONFIRMATION`) |
GO servicio cobrable | **NO** | **CONDICIONADO** — términos, DPA y subencargados publicados; el DPA es un contrato y debe revisarlo un profesional antes de firmarlo |

Qué se resolvió: versiones y fechas (1.0 · 25/08/2026), plazos de conservación, base jurídica,
transferencias internacionales a HubSpot, tabla de cookies real, fuero, desistimiento, DPA completo
del art. 28 RGPD, códigos de conducta y canal de accesibilidad. Fuentes y decisiones en
`NORMATIVA-2026.md`.

Qué NO cambia: la web sigue **sin afirmar que cumple** ninguna norma; los claims no verificados
(aislamiento por organización, 2FA, no-entrenamiento) siguen sin reforzarse; y el release gate sigue
bloqueando en producción hasta que HubSpot esté configurado, que es lo que hace que el formulario
entregue leads de verdad.
