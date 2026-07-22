# LICITATIS — Paquete para revisión profesional (legal)

Decisiones concretas que requieren criterio **jurídico** y/o **datos del propietario**. No son un genérico «revisad la web»: cada punto tiene ubicación, decisión pendiente, alternativa, riesgo y recomendación técnica. Mientras no se resuelvan, las páginas afectadas van **noindex** y el release gate de producción (`npm run verify:legal-launch:prod`) devuelve **BLOCKED_LEGAL_REVIEW**.

## 1. Identidad registral del responsable
- **Ubicación:** `src/app/aviso-legal/page.tsx`, `src/app/privacidad/page.tsx`.
- **Pendiente:** razón social, NIF, domicilio, datos registrales, DPO (o «no procede»).
- **Riesgo:** incumplimiento del deber de información (LSSI-CE art. 10 / RGPD arts. 13-14) si se publica con placeholders.
- **Recomendación:** aportar los datos; se cargarán en `LEGAL-SOURCE-REGISTER.md` y se retirará el `noindex`.

## 2. Base jurídica del tratamiento del formulario
- **Ubicación:** `src/app/privacidad/page.tsx` §3; primera capa en `DemoForm.tsx`.
- **Pendiente:** confirmar base jurídica (consentimiento vs. medidas precontractuales) y su redacción.
- **Riesgo:** base jurídica incorrecta.
- **Recomendación:** decisión jurídica; la web ya lo trata como consentimiento con retirada.

## 3. Transferencia internacional a HubSpot (y otros encargados)
- **Ubicación:** `src/app/privacidad/page.tsx` §4; `EXTERNAL-SERVICES-AUDIT.md`.
- **Pendiente:** región de datos de HubSpot y base de la transferencia (SCC / Data Privacy Framework); lista de subencargados; enlace al DPA.
- **Riesgo:** transferencias sin garantías documentadas (RGPD arts. 44-49).
- **Recomendación:** confirmar con HubSpot y documentar; crear `/subencargados` y `/acuerdo-tratamiento-datos` cuando aplique (p. ej. para el SaaS).

## 4. Plazos de conservación
- **Ubicación:** `src/app/privacidad/page.tsx` §5.
- **Pendiente:** plazos concretos.
- **Recomendación:** definir política de conservación.

## 5. Cláusulas de aceptación automática y exención de responsabilidad
- **Ubicación:** `src/app/aviso-legal/page.tsx`, `src/app/terminos/page.tsx` («El acceso… implica la aceptación…»).
- **Riesgo:** cláusulas de adhesión/exención amplias cuestionables frente a normativa de consumidores.
- **Recomendación:** reformular de forma proporcionada.

## 6. Política de cookies — tabla de cookies
- **Ubicación:** `src/app/cookies/page.tsx`.
- **Pendiente:** tabla nombre/proveedor/finalidad/duración de cada cookie (incl. `licitatis_consent`, `hubspotutk`, GA si se activa).
- **Recomendación:** auditoría de cookies antes de indexar y antes de activar analítica.

## 7. Claims de seguridad y de IA
- **Ubicación:** `content.ts` `privacyPoints`, `Privacy.tsx`; ver `LEGAL-CLAIMS-AUDIT.md` y `SAAS-AI-TRANSPARENCY-HANDOFF.md`.
- **Pendiente:** confirmar que «sin entrenar con tus datos», «alojado en la UE», 2FA, roles y aislamiento son ciertos y respaldados por contrato.
- **Riesgo:** publicidad engañosa / responsabilidad.

## 8. Transparencia de IA (Reglamento UE de IA, art. 50)
- **Ubicación:** landing (mensaje) + app (obligación real).
- **Pendiente:** revisión jurídica del alcance del art. 50 en la app; sección «Cómo usamos la IA» en la landing.

## 9. HSTS y subdominios
- **Ubicación:** `public/.htaccess`.
- **Decisión aplicada:** HSTS reducido a `max-age=31536000` **sin** `includeSubDomains` ni `preload` (evita forzar HTTPS permanente en `app.licitatis.es` y otros).
- **Pendiente:** confirmar con el propietario si en el futuro se desea ampliar el alcance (requiere que todos los subdominios sirvan HTTPS válido de forma permanente).

## 10. Datos de planes y funcionalidades
- **Ubicación:** `content.ts` `plans`, `planLimitRows`.
- **Pendiente (producto):** confirmar límites reales con la app o marcar «durante la beta».
- **Estado:** `BLOCKED_PRODUCT_CONFIRMATION`.
