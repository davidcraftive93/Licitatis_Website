# LICITATIS — Registro de fuente única de datos legales

Objetivo (§6 del mandato): que todos los textos legales tomen los datos identificativos de una **única fuente**, sin duplicar razón social, correos, versiones o dominio en cada página.

## Estado actual

- **Dominio, contacto y URLs**: centralizados en `src/lib/site.ts` (`siteConfig`). Dominio canónico corregido a `https://licitatis.es` (sin www).
- **Identidad registral** (razón social, NIF, domicilio, datos registrales, DPO): **no existe como dato**. Está como placeholder en las páginas legales. No se ha inventado.

## Datos requeridos (a completar por el propietario / asesoría legal)

| Campo | Valor actual | Estado |
|---|---|---|
| Nombre comercial | `LICITATIS` (`siteConfig.name`) | OK |
| Razón social | `[Razón social]` | `[LEGAL_REVIEW_REQUIRED: razón social]` |
| NIF/CIF | `[NIF]` | `[LEGAL_REVIEW_REQUIRED: NIF/CIF]` |
| Domicilio social | `[Dirección completa]` | `[LEGAL_REVIEW_REQUIRED: domicilio]` |
| Datos registrales | `[Registro Mercantil, tomo, folio, hoja]` | `[LEGAL_REVIEW_REQUIRED: datos registrales]` |
| Dominio canónico | `https://licitatis.es` (`site.ts`) | OK |
| Correo de contacto | `siteConfig.contactEmail` (`david@craftive.es`) | Pendiente confirmar correo definitivo |
| Correo de privacidad | (usa el de contacto) | Pendiente definir dedicado (p. ej. `privacidad@…`) |
| Canal de seguridad | (usa el de contacto) | Pendiente definir (p. ej. `security@…`) |
| Versión política privacidad | borrador | `[LEGAL_REVIEW_REQUIRED: versión + fecha]` |
| Versión términos | borrador | `[LEGAL_REVIEW_REQUIRED: versión + fecha]` |
| Delegado de Protección de Datos | `[Si aplica]` | `[LEGAL_REVIEW_REQUIRED: DPO o "no procede"]` |

## Recomendación técnica (para cuando existan los datos)

Crear `src/lib/legal.ts` con un objeto tipado `legalEntity`/`legalDocs` y refactorizar las 4 páginas legales para leer de ahí (una sola fuente). Mientras los datos no existan, mantener los placeholders + `noindex` (ya aplicado) y el release gate en modo production bloqueando la apertura pública. **No** convertir un placeholder en un dato aparentemente real.
