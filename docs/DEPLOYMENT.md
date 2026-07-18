# Despliegue en Vercel

Este proyecto se despliega en un **proyecto de Vercel independiente**, conectado exclusivamente
al repositorio `davidcraftive93/Licitatis_Website`. No debe mezclarse con la aplicación privada
ni con otros proyectos.

## Configuración del proyecto

| Ajuste                 | Valor                                        |
| ---------------------- | -------------------------------------------- |
| Nombre (visible)       | `Licitatis Website`                          |
| Identificador técnico  | `licitatis-website`                          |
| Repositorio            | `davidcraftive93/Licitatis_Website`          |
| Rama de producción     | `main`                                       |
| Framework preset       | Next.js (autodetectado)                      |
| Root directory         | `./`                                         |
| Build command          | `next build` (por defecto)                   |
| Install command        | `npm install` (por defecto)                  |

## Opción A — Importar desde el panel de Vercel (recomendada)

1. Entra en <https://vercel.com/new>.
2. Importa el repositorio `davidcraftive93/Licitatis_Website`.
3. Deja el framework como **Next.js** y el root directory en `./`.
4. Añade las variables de entorno (ver [`.env.example`](../.env.example)) en cada entorno.
5. Pulsa **Deploy**.

## Opción B — Vercel CLI

Requiere una sesión autenticada con permisos para crear proyectos.

```bash
npm i -g vercel        # instalar la CLI si no está disponible
vercel login           # autenticación (acción humana)
vercel link            # vincular este directorio a un proyecto (crea uno nuevo si no existe)
vercel                 # despliegue de Preview
vercel --prod          # despliegue de Producción (solo cuando el build y las auditorías pasen)
```

> No ejecutes `vercel --prod` hasta que: el build sea correcto, no haya errores, la auditoría de
> seguridad haya pasado, la rama esté subida y el proyecto correcto esté vinculado.

## Entornos y variables

Configura las variables en **Development**, **Preview** y **Production**:

- `NEXT_PUBLIC_SITE_URL`: en Production, la URL final (p. ej. `https://www.licitatis.es`); en
  Preview puede usarse la URL de la preview.
- Variables de HubSpot y analítica según [`docs/HUBSPOT.md`](./HUBSPOT.md).
- `HUBSPOT_PRIVATE_APP_TOKEN` (si se usa) **solo** en el entorno de servidor de Vercel; nunca
  como `NEXT_PUBLIC_`.

## Previews por pull request

Cada PR hacia `main` genera automáticamente una **preview deployment** con su propia URL, útil
para revisión antes de fusionar.

## Dominios

Cuando el dominio esté disponible:

1. Añade `licitatis.es` y `www.licitatis.es` en **Project → Settings → Domains**.
2. Configura `licitatis.es` como dominio principal y `www.licitatis.es` como redirección.
3. Deja que Vercel gestione el certificado **SSL**.
4. Actualiza `NEXT_PUBLIC_SITE_URL` en Production a la URL final y vuelve a desplegar.

**No** configures `app.licitatis.es` en este proyecto: pertenece a la aplicación privada.

## Checklist previo a producción

- [ ] `npm run lint` sin errores
- [ ] `npm run typecheck` sin errores
- [ ] `npm run build` correcto
- [ ] Variables de entorno configuradas en Vercel
- [ ] HubSpot configurado y probado (o asumido pendiente conscientemente)
- [ ] Rama subida y PR creada
- [ ] Proyecto de Vercel correcto vinculado
