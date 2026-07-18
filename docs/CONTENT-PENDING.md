# Contenido pendiente

Lista de datos y textos que deben **confirmarse o revisarse** antes de publicar. Nada de esto se
ha inventado: se han usado placeholders visibles.

## Datos legales (requieren revisión profesional)

Ubicación: páginas `/aviso-legal`, `/privacidad`, `/cookies`, `/terminos`
(`src/app/aviso-legal/…`, etc.) y componente `src/components/layout/LegalShell.tsx`.

- [ ] Razón social
- [ ] NIF/CIF
- [ ] Domicilio social
- [ ] Datos registrales (Registro Mercantil)
- [ ] Delegado de Protección de Datos (si aplica)
- [ ] Plazos de conservación de datos
- [ ] Detalle de transferencias internacionales (HubSpot) y sus garantías
- [ ] Tabla de cookies (nombre, proveedor, finalidad, duración)
- [ ] Fuero/jurisdicción aplicable
- [ ] Fecha de "última actualización" de cada documento
- [ ] Revisión legal completa de todos los textos (actualmente son borradores)

## Contacto

- [ ] Correo de contacto definitivo (`NEXT_PUBLIC_CONTACT_EMAIL`; por defecto se muestra
      `contacto@licitatis.es` como placeholder).
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

## SEO / dominio

- [ ] `NEXT_PUBLIC_SITE_URL` con la URL final en Production.
- [ ] Conectar `licitatis.es` y `www.licitatis.es` en Vercel (ver [`DEPLOYMENT.md`](./DEPLOYMENT.md)).
- [ ] Verificar el sitio en Google Search Console cuando el dominio esté activo.
