# LICITATIS — Web comercial

Landing comercial pública de **LICITATIS**, el copiloto para preparar y controlar
licitaciones. Este repositorio contiene **únicamente** la web pública y comercial.

> **Descriptor:** El copiloto para preparar y controlar licitaciones.
> **Propuesta de valor:** convierte pliegos, requisitos, documentos, tareas y plazos en
> un proceso claro, coordinado y bajo control.

---

## Índice

- [Objetivo](#objetivo)
- [Stack](#stack)
- [Estructura](#estructura)
- [Requisitos e instalación](#requisitos-e-instalación)
- [Desarrollo local](#desarrollo-local)
- [Build de producción](#build-de-producción)
- [Variables de entorno](#variables-de-entorno)
- [HubSpot](#hubspot)
- [Analítica y cookies](#analítica-y-cookies)
- [Vercel y despliegues](#vercel-y-despliegues)
- [Ramas](#ramas)
- [Dominios](#dominios)
- [Seguridad](#seguridad)
- [Separación de sistemas](#separación-de-sistemas)
- [Contenido pendiente](#contenido-pendiente)
- [Mantenimiento](#mantenimiento)

---

## Objetivo

Captar potenciales clientes y solicitudes de demostración, explicar el valor del producto,
transmitir confianza y diferenciar LICITATIS de un simple buscador de licitaciones. Los leads
se registran en HubSpot mediante un endpoint de servidor.

Esta web **no** es la aplicación SaaS. La aplicación privada vive en otro repositorio y otro
proyecto de despliegue (ver [Separación de sistemas](#separación-de-sistemas)).

## Stack

| Capa            | Tecnología                                             |
| --------------- | ------------------------------------------------------ |
| Framework       | [Next.js 15](https://nextjs.org) (App Router)          |
| Lenguaje        | TypeScript (modo estricto)                             |
| Estilos         | Tailwind CSS 3.4 (sistema de diseño propio)            |
| Tipografías     | Inter + Space Grotesk (autoalojadas vía `next/font`)   |
| Validación      | [Zod](https://zod.dev)                                 |
| Formularios/CRM | HubSpot Forms API (envío desde el cliente; ver docs)   |
| Iconos          | Set SVG propio                                          |
| Salida          | Export estático (`output: "export"` → `out/`)          |
| Despliegue      | Hostinger vía GitHub Actions (manual)                  |

Sin base de datos ni backend. Sin dependencias de animación pesadas. Sin conexión con sistemas
privados. **No se usa Vercel.**

## Estructura

```text
src/
├─ app/
│  ├─ layout.tsx            # Metadatos, fuentes, JSON-LD, header/footer, consentimiento
│  ├─ page.tsx              # Landing (composición de secciones)
│  ├─ globals.css           # Estilos base + tokens de diseño
│  ├─ sitemap.ts            # Sitemap dinámico
│  ├─ robots.ts             # robots.txt dinámico
│  ├─ manifest.ts           # Web app manifest
│  ├─ icon.svg              # Favicon
│  ├─ opengraph-image.tsx   # Imagen OG generada (next/og)
│  ├─ not-found.tsx         # 404
│  ├─ error.tsx             # Límite de error
│  ├─ gracias/              # Página de agradecimiento
│  └─ aviso-legal/ privacidad/ cookies/ terminos/   # Páginas legales (placeholders)
├─ components/
│  ├─ layout/               # Header, Footer, Logo, LegalShell
│  ├─ sections/             # Hero, Problem, Solution, Features, ... , FinalCta
│  ├─ mockups/              # Mockups de producto (CSS/SVG, datos de ejemplo)
│  ├─ forms/                # DemoForm
│  ├─ ui/                   # Button, Section, Reveal, iconos, campos de formulario
│  └─ analytics/            # Consentimiento de cookies + carga condicional de analítica
└─ lib/                     # site, content, validation, hubspot, seo, consent, utm

public/.htaccess            # Cabeceras de seguridad, caché y compresión para Hostinger
.github/workflows/          # ci.yml (validación) y deploy-hostinger.yml (despliegue manual)
```

El build (`npm run build`) genera la carpeta **`out/`** (sitio estático), único artefacto que se
despliega a Hostinger.

## Requisitos e instalación

- Node.js **>= 20** (probado con 22)
- npm

```bash
npm install
```

## Desarrollo local

```bash
cp .env.example .env.local   # (en Windows PowerShell: copy .env.example .env.local)
npm run dev                  # http://localhost:3000
```

Scripts disponibles:

| Script                | Descripción                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Servidor de desarrollo               |
| `npm run build`       | Build → export estático en `out/`    |
| `npm run lint`        | ESLint (next lint)                   |
| `npm run typecheck`   | Comprobación de tipos (`tsc --noEmit`) |
| `npm run test`        | Tests unitarios (Vitest)             |
| `npm run format`      | Formatea con Prettier                |

## Build de producción (export estático)

```bash
npm run build          # genera el sitio estático en out/
npx serve out          # (opcional) previsualizar el export en local
```

> Nota: `npm run start` no aplica con `output: "export"`; el artefacto es `out/`.

## Variables de entorno

Ver [`.env.example`](./.env.example) para la lista completa y comentada. Resumen:

| Variable                          | Ámbito   | Obligatoria | Descripción                                  |
| --------------------------------- | -------- | ----------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Cliente  | Recomendada | URL pública canónica del sitio               |
| `NEXT_PUBLIC_APP_URL`             | Cliente  | No          | URL de la aplicación privada                 |
| `NEXT_PUBLIC_CONTACT_EMAIL`       | Cliente  | No          | Correo de contacto mostrado                  |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`   | Cliente  | Para leads  | Portal ID de HubSpot (público)               |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID`     | Cliente  | Para leads  | Form ID de HubSpot (público)                 |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`    | Cliente  | No          | `true` para permitir analítica tras consentir |
| `NEXT_PUBLIC_GA_ID`               | Cliente  | No          | ID de Google Analytics 4                      |

Se incrustan en el build (son públicas). Defínelas en local (`.env.local`) y en el entorno de build
de CI/despliegue. Este sitio estático **no usa** `HUBSPOT_PRIVATE_APP_TOKEN`. Los **secretos de
Hostinger** van exclusivamente en el GitHub Environment `production` (ver
[`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)).

## HubSpot

El formulario se envía a HubSpot **desde el cliente** a su Forms API pública (solo IDs públicos, sin
token), compatible con el sitio estático. Ver [`docs/HUBSPOT.md`](./docs/HUBSPOT.md). Si HubSpot no
está configurado, el formulario sigue siendo usable (muestra confirmación sin entregar el lead).

## Analítica y cookies

- Sistema de consentimiento con tres categorías: **necesarias**, **analítica** y **marketing**.
- Ninguna herramienta no esencial (HubSpot Tracking, Google Analytics) se carga hasta el
  consentimiento correspondiente.
- Preparado para GA4 y para el script de tracking de HubSpot; ambos desactivados por defecto.

## Integración continua y despliegue

- **CI** (`.github/workflows/ci.yml`): en cada `push` y `pull_request` ejecuta `lint`, `typecheck`,
  `test` y `build`. **Nunca despliega.**
- **Despliegue** (`.github/workflows/deploy-hostinger.yml`): **manual** (`workflow_dispatch`), con
  confirmación `DEPLOY LICITATIS`, environment `production` y sincronización de `out/` a Hostinger.
  Subir código o fusionar una PR **no** despliega. Ver [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Ramas

```text
main                          # producción (no desarrollar aquí; sin merge/deploy automático)
├─ feature/landing-comercial  # landing (secciones, SEO, legal, cookies, analítica)
└─ feature/deploy-hostinger   # export estático, HubSpot cliente, CI y despliegue a Hostinger
```

Trabaja en ramas `feature/*`, revisa con `git status`/`git diff`, agrupa en commits claros, sube a
GitHub y abre PR. No hacer `git add .` sin revisar. No forzar el historial. No fusionar a `main` ni
crear etiquetas/releases/despliegues sin autorización del propietario.

## Dominios

Previsto: `licitatis.es` (principal) y `www.licitatis.es` (redirección), con SSL gestionado por
Hostinger. El subdominio `app.licitatis.es` pertenece a la aplicación privada y **no** se configura
aquí.

## Seguridad

Cabeceras de seguridad y CSP vía `public/.htaccess` (Hostinger), validación en cliente (Zod),
honeypot y consentimiento. Sin secretos en el sitio. Ver [`docs/SECURITY.md`](./docs/SECURITY.md).

## Separación de sistemas

- Este repositorio contiene **solo la landing** comercial.
- La **aplicación SaaS** está en otro repositorio.
- Los **proyectos de Vercel son independientes**.
- **No se comparten credenciales** entre la web y la aplicación.
- `app.licitatis.es` **no** pertenece a este despliegue.

## Contenido pendiente

Datos legales, HubSpot, correo de contacto y verificación del estado de funcionalidades. Ver
[`docs/CONTENT-PENDING.md`](./docs/CONTENT-PENDING.md).

## Mantenimiento

- Ejecuta `npm run lint`, `npm run typecheck` y `npm run build` antes de cada PR.
- Mantén las dependencias actualizadas (`npm outdated`).
- Revisa periódicamente los textos marcados como pendientes.
