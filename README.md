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
| Formularios/CRM | HubSpot Forms API (endpoint de servidor `/api/lead`)   |
| Iconos          | Set SVG propio                                          |
| Despliegue      | Vercel                                                 |

Sin base de datos. Sin dependencias de animación pesadas. Sin conexión con sistemas privados.

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
│  ├─ aviso-legal/ privacidad/ cookies/ terminos/   # Páginas legales (placeholders)
│  └─ api/lead/route.ts     # Endpoint de envío del formulario a HubSpot
├─ components/
│  ├─ layout/               # Header, Footer, Logo, LegalShell
│  ├─ sections/             # Hero, Problem, Solution, Features, ... , FinalCta
│  ├─ mockups/              # Mockups de producto (CSS/SVG, datos de ejemplo)
│  ├─ forms/                # DemoForm
│  ├─ ui/                   # Button, Section, Reveal, iconos, campos de formulario
│  └─ analytics/            # Consentimiento de cookies + carga condicional de analítica
└─ lib/                     # site, content, validation, hubspot, rate-limit, seo, consent, utm
```

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
| `npm run build`       | Build de producción                  |
| `npm run start`       | Sirve el build de producción         |
| `npm run lint`        | ESLint (next lint)                   |
| `npm run typecheck`   | Comprobación de tipos (`tsc --noEmit`) |
| `npm run format`      | Formatea con Prettier                |

## Build de producción

```bash
npm run build
npm run start
```

## Variables de entorno

Ver [`.env.example`](./.env.example) para la lista completa y comentada. Resumen:

| Variable                          | Ámbito   | Obligatoria | Descripción                                  |
| --------------------------------- | -------- | ----------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Cliente  | Recomendada | URL pública canónica del sitio               |
| `NEXT_PUBLIC_APP_URL`             | Cliente  | No          | URL de la aplicación privada                 |
| `NEXT_PUBLIC_CONTACT_EMAIL`       | Cliente  | No          | Correo de contacto mostrado                  |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`   | Cliente  | Para leads  | Portal ID de HubSpot (público)               |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID`     | Cliente  | Para leads  | Form ID de HubSpot (público)                 |
| `HUBSPOT_PORTAL_ID`               | Servidor | No          | Alternativa server-only al portal público    |
| `HUBSPOT_FORM_ID`                 | Servidor | No          | Alternativa server-only al form público      |
| `HUBSPOT_PRIVATE_APP_TOKEN`       | Servidor | No          | **Secreto.** Solo servidor. Nunca en cliente |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`    | Cliente  | No          | `true` para permitir analítica tras consentir |
| `NEXT_PUBLIC_GA_ID`               | Cliente  | No          | ID de Google Analytics 4                      |

Configúralas por entorno en Vercel (**Development**, **Preview**, **Production**).

## HubSpot

El formulario se envía a HubSpot desde el servidor (`/api/lead`), de modo que ningún token
sensible llega al navegador. Ver [`docs/HUBSPOT.md`](./docs/HUBSPOT.md) para la configuración
paso a paso. Si HubSpot no está configurado, el formulario sigue funcionando y responde
`delivered: false` (los envíos no se entregan a ningún CRM hasta configurarlo).

## Analítica y cookies

- Sistema de consentimiento con tres categorías: **necesarias**, **analítica** y **marketing**.
- Ninguna herramienta no esencial (HubSpot Tracking, Google Analytics) se carga hasta el
  consentimiento correspondiente.
- Preparado para GA4 y para el script de tracking de HubSpot; ambos desactivados por defecto.

## Vercel y despliegues

Proyecto de Vercel **independiente** conectado a este repositorio. Ver
[`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md). Cada pull request genera una **preview deployment**;
la rama de producción es `main`.

## Ramas

```text
main                         # producción (protegida; no desarrollar aquí)
└─ feature/landing-comercial # desarrollo de la landing
```

Commits pequeños y descriptivos. No hacer `git add .` sin revisar. No forzar el historial.

## Dominios

Previsto: `licitatis.es` (principal) y `www.licitatis.es` (redirección). El subdominio
`app.licitatis.es` pertenece a la aplicación privada y **no** se configura aquí. Mientras no
exista dominio, se usa la URL temporal de Vercel.

## Seguridad

Cabeceras de seguridad, CSP, validación en servidor, honeypot y rate limiting. Ver
[`docs/SECURITY.md`](./docs/SECURITY.md).

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
