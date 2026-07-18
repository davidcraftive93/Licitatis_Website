# Despliegue en Hostinger (sitio estático vía GitHub Actions)

La landing se publica como **sitio estático** (Next.js `output: "export"` → carpeta `out/`) y se
aloja en **Hostinger**. **No se usa Vercel.** GitHub es la única fuente de verdad.

## Principios

- Todo cambio va en una rama `feature/*`, con commits claros, se sube a GitHub y se revisa por PR.
- El propietario controla merges, etiquetas, releases y despliegues.
- **Subir código a GitHub nunca despliega.** El despliegue es siempre **manual**.
- La **CI** (`.github/workflows/ci.yml`) solo valida (lint, typecheck, test, build). Nunca despliega.

> ⚠️ **No uses a la vez el auto-deploy Git de hPanel y este workflow.** La integración Git de
> Hostinger hace `pull` del **código fuente** de `main` (no compila), por lo que serviría el
> proyecto sin `index.html` → **error 403**; además chocaría con el `rsync` de Actions. Si la
> activaste, **desactívala** en hPanel y deja que **GitHub Actions** compile y suba solo `out/`.

## Workflows

| Workflow | Archivo | Disparador | Función |
| --- | --- | --- | --- |
| CI | `.github/workflows/ci.yml` | `push` y `pull_request` | Validar código (no despliega) |
| Deploy Hostinger | `.github/workflows/deploy-hostinger.yml` | `workflow_dispatch` (manual) | Desplegar `out/` a Hostinger |

## Requisitos previos (una sola vez)

### 1. GitHub Environment `production`

Crea un *Environment* llamado **`production`** (Settings → Environments) y, opcionalmente, añade
reglas de protección (revisores obligatorios). Los secretos de Hostinger se guardan **solo** en
este entorno, nunca en el código ni en variables públicas.

### 2. Secretos del entorno `production`

| Secreto | Descripción | Cómo obtenerlo |
| --- | --- | --- |
| `HOSTINGER_HOST` | Host/IP SSH | hPanel → Avanzado → SSH |
| `HOSTINGER_PORT` | Puerto SSH (habitualmente 22 o el que indique Hostinger) | hPanel → SSH |
| `HOSTINGER_USERNAME` | Usuario SSH | hPanel → SSH |
| `HOSTINGER_SSH_PRIVATE_KEY` | Clave privada SSH (contenido completo) | Genera un par de claves y añade la pública en hPanel |
| `HOSTINGER_DEPLOY_PATH` | Ruta absoluta del directorio público | Ver más abajo — **no la inventes** |

**`HOSTINGER_DEPLOY_PATH`**: obtén la ruta real por SSH o desde hPanel. Su valor probable es
equivalente a `/home/USUARIO/domains/licitatis.es/public_html`, pero debe confirmarse (por SSH:
`pwd` dentro de `public_html`, o `ls -d ~/domains/*/public_html`).

### 2b. Variables públicas del build (no secretas)

Las `NEXT_PUBLIC_*` se incrustan en el build y NO son secretas. Defínelas como **Variables** (no
secretos) del entorno `production` (o del repositorio): Settings → Environments → production →
Variables. El build las inyecta automáticamente (ver el `env:` del workflow):

| Variable | Ejemplo | Necesaria |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://licitatis.es` | Recomendada (canonical/OG correctos) |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | `1234567` | Para que el formulario entregue leads |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID` | `xxxxxxxx-…` | Para que el formulario entregue leads |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contacto@licitatis.es` | Opcional |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Opcional |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Opcional |

Sin estas variables el sitio funciona igual (el formulario muestra confirmación pero no entrega el
lead hasta configurar HubSpot).

### 3. Clave SSH

```bash
ssh-keygen -t ed25519 -C "deploy-licitatis" -f ./id_licitatis_deploy
# Sube la clave PÚBLICA (id_licitatis_deploy.pub) a hPanel → SSH → Claves SSH.
```

**Guarda la clave PRIVADA en `HOSTINGER_SSH_PRIVATE_KEY` en BASE64** (recomendado): una sola línea,
a prueba de saltos de línea/CRLF al pegar (evita el error `Load key ... error in libcrypto`). El
workflow la decodifica automáticamente (y también acepta el texto PEM si prefieres).

```powershell
# Windows PowerShell — copia la clave en base64 al portapapeles:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:USERPROFILE\.ssh\licitatis_deploy")) | Set-Clipboard
```
```bash
# macOS/Linux:
base64 -w0 ~/.ssh/licitatis_deploy   # (en macOS: base64 -i ~/.ssh/licitatis_deploy)
```

## Cómo desplegar (manual, con confirmación)

1. Ve a **Actions → Deploy a Hostinger (manual) → Run workflow**.
2. Rellena:
   - **confirmation**: escribe exactamente `DEPLOY LICITATIS` (si no coincide, el workflow se detiene).
   - **git_ref**: `main` por defecto (o una etiqueta/commit para rollback). No se permiten ramas `feature/*`.
3. El workflow: valida la confirmación y el ref → comprueba que pertenece a `main` o es una etiqueta →
   `npm ci` → `npm run build` → verifica `out/` → crea una **copia de seguridad remota** → sincroniza
   `out/` por `rsync`/SSH al `HOSTINGER_DEPLOY_PATH` → verifica que la web responde.

> ⚠️ El asistente (Claude) puede preparar y validar el workflow, **pero no lo ejecuta**. El despliegue
> solo lo lanza el propietario, de forma manual, escribiendo la confirmación.

## Qué se sube (y qué no)

- **Se sube:** únicamente el contenido de `out/` (HTML, CSS, JS, imágenes, `sitemap.xml`,
  `robots.txt`, `manifest.webmanifest`, `.htaccess`).
- **No se sube:** código fuente, `node_modules`, `.env`, documentación interna, configuración local,
  historial Git, secretos ni temporales.

## Rollback

El despliegue es reversible de dos formas:

1. **Re-desplegar una versión anterior:** ejecuta el workflow indicando en `git_ref` una **etiqueta**
   o **commit** previo (validado). Como el workflow reconstruye desde ese ref, la producción vuelve a
   ese estado. Es la vía recomendada y no depende de artefactos no versionados.
2. **Copia de seguridad remota:** antes de cada `rsync`, el workflow copia el directorio de despliegue
   a `…/public_html.backup-<timestamp>`. Para restaurar, por SSH:
   ```bash
   # Sustituye <DEPLOY_PATH> y <timestamp> por los valores reales.
   rsync -a --delete "<DEPLOY_PATH>.backup-<timestamp>/" "<DEPLOY_PATH>/"
   ```

Recomendación: crea una **etiqueta** por cada versión desplegada (p. ej. `git tag v1.0.0 && git push
origin v1.0.0`) para poder volver a ella con `git_ref`.

## Dominio

Conecta `licitatis.es` (principal) y `www.licitatis.es` en Hostinger (hPanel → Dominios), con SSL
gestionado por Hostinger. `NEXT_PUBLIC_SITE_URL` debe ser la URL final. `app.licitatis.es` pertenece
a la aplicación privada y **no** se gestiona aquí.

## Notas técnicas

- Las cabeceras de seguridad se aplican vía `public/.htaccess` (Apache/LiteSpeed), no vía Next.
- `trailingSlash: true` hace que cada ruta sea un directorio con `index.html` (compatible con Apache).
- No hay backend: el formulario se envía a HubSpot desde el cliente (ver `docs/HUBSPOT.md`).
