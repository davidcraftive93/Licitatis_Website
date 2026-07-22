# LICITATIS — Auditoría de claims comerciales

Clasificación de afirmaciones de la web pública. Objetivo: que ninguna afirmación absoluta, no verificable o no operativa llegue a producción sin marca de estado.

Tipos de estado: `Verificada` · `Parcial` · `Prevista` · `No verificable (app separada)` · `Riesgo jurídico`.

## Claims de producto (landing) — `src/lib/content.ts`

| Claim | Ubicación | Estado real | Riesgo | Recomendación |
|---|---|---|---|---|
| «La IA asiste, no decide… revisión humana» | Hero, disclaimers | Verificada (postura) | Bajo | Mantener |
| «LICITATIS no garantiza la adjudicación» | `disclaimers.noGuarantee`, Términos §4 | Verificada | Bajo | Mantener (protege) |
| «0 datos de tu empresa inventados por la IA» | `valueStats` | Prevista (comportamiento del SaaS) | Medio | No verificable desde este repo; matizar como diseño del producto |
| «esta merece que la pelees» (antes «la puedes ganar») | `searchVsLicitatis` | Verificada | Bajo | Corregido en rama previa (ya no promete ganar) |
| Límites de planes (análisis/mes, candidaturas, etc.) | `plans`, `planLimitRows` | **No verificable (app separada)** | Medio | `BLOCKED_PRODUCT_CONFIRMATION`: confirmar con la app o marcar «según plan durante la beta» |
| «IA simulada» en plan Free | `plans`, nota de `Plans.tsx` | Prevista | Bajo | Coherente y honesto; confirmar en la app |

## Claims de seguridad/privacidad — `content.ts` `privacyPoints` + sección `Privacy.tsx`

| Claim | Estado real | Riesgo | Recomendación |
|---|---|---|---|
| «Aislado por organización» | No verificable (app) | Medio | `BLOCKED_PROVIDER/PRODUCT_CONFIRMATION` |
| «Acceso por roles… comprobados en el servidor» | No verificable (app) | Medio | Confirmar implementación en la app |
| «Sin entrenar con tus datos» | No verificable (contrato con proveedores IA) | **Alto** | Debe respaldarse contractualmente (acuerdos con proveedores de IA) antes de afirmarlo |
| «RGPD y 2FA (TOTP)» | No verificable (app) | Medio | Confirmar que 2FA está operativo en la app |
| «Datos alojados en la UE» | No verificable | **Alto** | Depende de HubSpot y de la infraestructura del SaaS; confirmar región y transferencias |
| «Protección de sesión reforzada» | No verificable | Bajo | Redacción prudente; mantener |

> Ninguna de estas afirmaciones usa fórmulas absolutas prohibidas («100%», «completamente seguro», «cumplimiento asegurado»): el release gate (`PROHIBITED_CLAIM_PATTERNS`) lo verifica automáticamente y bloquea si se introdujeran.

## Certificaciones

No se afirman certificaciones **concretas y no acreditadas** como ISO 27001, ENS o SOC 2 en la landing (el mock del Pasaporte muestra «ISO 9001», «ENS» como **datos de demostración** etiquetados «Demo»). **Riesgo**: aunque estén dentro de un mock etiquetado, evitar que se lean como certificaciones propias. Recomendación: mantener el rótulo «Demo» y no afirmar certificaciones propias fuera del mock.

## Acciones

1. **Propietario / producto:** confirmar límites de planes y funcionalidades de seguridad (2FA, roles, aislamiento, no-entrenamiento, región UE) o marcarlas como «durante la beta / en desarrollo».
2. **Legal:** validar que «sin entrenar con tus datos» y «alojado en la UE» son ciertos y respaldados por contrato con proveedores (incl. HubSpot y cualquier proveedor de IA del SaaS).
3. **Técnico (hecho):** el gate impide reintroducir claims absolutos prohibidos.
