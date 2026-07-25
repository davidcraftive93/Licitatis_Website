# Contenido pendiente

Lista de datos y textos que deben **confirmarse o revisarse** antes de publicar. Nada de esto se
ha inventado: se han usado placeholders visibles.

## Datos legales (requieren revisión profesional)

Ubicación: páginas `/aviso-legal`, `/privacidad`, `/cookies`, `/terminos`
(`src/app/aviso-legal/…`, etc.) y componente `src/components/layout/LegalShell.tsx`.

Ya entregados por el propietario y en `src/lib/legal.ts` (fuente única):

- [x] Razón social — ZSE INNOVATION STUDIO SL (LICITATIS es una marca, no una sociedad)
- [x] NIF/CIF
- [x] Domicilio social
- [x] Datos registrales (Registro Mercantil de Valencia)
- [x] Delegado de Protección de Datos — **no procede** (confirmado)

Sigue pendiente:

- [ ] Plazos de conservación de datos
- [ ] Región de datos de HubSpot y base jurídica de una eventual transferencia internacional
- [ ] Localización de los datos de la aplicación (hasta confirmarla, la landing **no** afirma
      que estén alojados en la UE: la afirmación se retiró por contradecir
      `/seguridad-y-privacidad`)
- [ ] Tabla de cookies (nombre, proveedor, finalidad, duración)
- [ ] Fuero/jurisdicción aplicable
- [ ] Versión y fecha de «última actualización» de cada documento (hoy `[[VERSIÓN]]` / `[[FECHA]]`)
- [ ] Descriptor exacto del extracto bancario que use la pasarela de pago
- [ ] Revisión legal completa de todos los textos (actualmente son borradores)

## Contacto

- [ ] Correo de contacto definitivo (`NEXT_PUBLIC_CONTACT_EMAIL`; por defecto se muestra
      `info@licitatis.es`, ya en uso).
- [ ] Teléfono (opcional; no se muestra actualmente).

## HubSpot

Ver [`HUBSPOT.md`](./HUBSPOT.md).

- [ ] `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- [ ] `NEXT_PUBLIC_HUBSPOT_FORM_ID`
- [ ] (Opcional) `HUBSPOT_PRIVATE_APP_TOKEN` (solo servidor)
- [ ] Texto de consentimiento revisado
- [ ] Propiedades personalizadas si se quieren guardar "licitaciones/año" y "dificultad"

## Estado de las funcionalidades

Ubicación: `src/lib/content.ts` (array `features`, campo `status`).

- [ ] **Confirmar qué funcionalidades están operativas** y cuáles son "Próximamente".
      Actualmente se marcan como `soon`: *evaluación de oportunidades*, *generación asistida de
      contenidos* y *panel de métricas*. El resto se presentan como propuesta de producto sin
      afirmar un estado operativo concreto. Ajustar según la realidad del producto.

## Marca y visuales

- [ ] Validar el logotipo/mark provisional (`src/components/layout/Logo.tsx`, `src/app/icon.svg`).
- [ ] Los mockups usan **datos ficticios de ejemplo** (expedientes, entidades e importes
      neutrales). Revisar que se ajustan al tono deseado.

## Analítica (opcional)

- [ ] `NEXT_PUBLIC_ENABLE_ANALYTICS=true` si se desea activar analítica.
- [ ] `NEXT_PUBLIC_GA_ID` si se usa Google Analytics 4.

## Despliegue (Hostinger)

Ver [`DEPLOYMENT.md`](./DEPLOYMENT.md). Pendiente en el GitHub Environment `production`:

- [ ] `HOSTINGER_HOST`
- [ ] `HOSTINGER_PORT`
- [ ] `HOSTINGER_USERNAME`
- [ ] `HOSTINGER_SSH_PRIVATE_KEY` (par de claves SSH; la pública en hPanel)
- [ ] `HOSTINGER_DEPLOY_PATH` — **obtener la ruta real** por SSH/hPanel (no inventar; probable
      `/home/USUARIO/domains/licitatis.es/public_html`)

## SEO / dominio

- [ ] `NEXT_PUBLIC_SITE_URL` con la URL final antes de compilar el artefacto de producción.
- [ ] Conectar `licitatis.es` y `www.licitatis.es` en Hostinger (SSL gestionado por Hostinger).
- [ ] Verificar el sitio en Google Search Console cuando el dominio esté activo.
