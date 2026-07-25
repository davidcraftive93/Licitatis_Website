# LICITATIS — Auditoría previa a «El Expediente Vivo»

Rama base: `agent/auditoria-rendimiento-licitatis` (PR #19) · Rama de trabajo: `feature/expediente-vivo`
Método: 4 auditores en paralelo leyendo el código real, con cita `archivo:línea`. Sin rediseñar: la dirección visual está aprobada.

## 0. Estado de la base (Fase 0)

| Comprobación | Resultado |
|---|---|
| Repositorio | `davidcraftive93/Licitatis_Website` ✅ |
| PR #18 (identidad legal) | fusionada en `main` |
| PR #19 (rendimiento) | **abierta, en borrador**, base `main`, 0 commits por detrás |
| ¿incluye los commits legales? | sí (`c3b53e0`, `c08f7c3`, `0239650`) |
| `format:check` | ❌ fallaba en 10 ficheros → **corregido** (`1c96925`, solo formato) |
| `lint` · `typecheck` · `test` (21) · `build` | ✅ |
| `verify:legal-launch` (dev) | ✅ exit 0 |
| `verify:legal-launch:prod` | exit 1 = `BLOCKED_LEGAL_REVIEW` (esperado) |

**Caso A** del encargo: PR #19 sin fusionar → esta rama se apila sobre ella y **no se revierte ninguna de sus optimizaciones**.

### Línea base de rendimiento (medida)
- `out/_next/static`: **1,5 MB** · **13 chunks** · First Load JS compartido **103 kB**
- 22 componentes cliente · 6 ficheros con `IntersectionObserver` · 6 con `requestAnimationFrame` · 1 canvas · 12 clases `animate-*`

## 1. Hallazgo estructural: el hilo narrativo no está roto, está **ausente**

`EXP-2024-0142` aparece en **2 de 14 secciones**:
- `DashboardMock.tsx:32` (mock del hero) — y ahí es **una fila más de cuatro**, sin distinción visual ni mención en el copy.
- `StepJourney.tsx:25,86,583` (el viaje).

De `Passport` (sección 5) a `FinalCta` (sección 14) **no aparece ni una vez**. Es decir: el expediente falta en el **64 %** de la página.

Lo único que **sí** viaja hoy es el **certificado AEAT caducado**: sale de `PassportMock.tsx:20` y reaparece como bloqueante y como riesgo en `StepJourney.tsx:168,244`. Esa es la prueba de que el modelo funciona cuando se aplica — y el patrón a extender.

### 1.1 Incoherencia factual del expediente (prioridad alta)
El mismo caso muestra **tres avances distintos**:

| Cifra | Dónde | Qué dice ser |
|---|---|---|
| 64 % | `DashboardMock.tsx:37,198` | «progreso del checklist documental» |
| 2/4 = 50 % | `StepJourney.tsx:188-195` | checklist documental |
| 74 % | `StepJourney.tsx:262` | índice de preparación |

Es barato de arreglar y **letal si un evaluador lo nota**, porque toda la propuesta se apoya en «0 datos de tu empresa inventados por la IA» (`content.ts:30`). **Causa raíz**: el expediente está copiado a mano en 6 ficheros sin fuente única.

## 2. Inventario narrativo (14 secciones)

| Sección | Papel | Problema | Recomendación |
|---|---|---|---|
| **Hero** | Apertura: cabina de control; promete el recorrido | El expediente protagonista entra como fila anónima; 64 % incoherente | MEJORAR (destacarlo, unificar cifra) |
| **ValueStats** | Banda de credibilidad | Las 4 cifras son punteros a secciones posteriores: resume la historia antes de contarla. `CountUp` sobre «PLACSP» (no numérico) la hace parecer métrica de vanidad | MEJORAR → hoja de ruta del 0142 |
| **ProblemSolution** | Encuadre del dolor | Se repite **dentro de sí misma** (`:11` cita = `:25` título) y hace el MISMO movimiento que WhyNotSearch | UNIFICAR con WhyNotSearch |
| **HowItWorks + StepJourney** | Columna vertebral: único caso vivo | `drawn` en estado de React por frame (coste) | CONSERVAR + MEJORAR |
| **Passport** | Memoria permanente de la empresa | No cita el expediente; usa otra identidad («Constructora Ejemplo») | MEJORAR (conectar exigencia↔evidencia) |
| **Features** | 9 tarjetas | **8 de 9 reformulan lo que StepJourney demostró 30 s antes**; solo «Chat con citas al pliego» es nuevo | INTEGRAR (transformar, no borrar) |
| **AiTransparency** | Transparencia de IA | Puede leerse como anexo legal desconectado | INTEGRAR (procedencia) |
| **WhyNotSearch** | Contraste comercial | Duplica ProblemSolution, pero **su versión es superior** (5 filas concretas) | CONSERVAR como sede de la tesis |
| **DualAudience** | Dos públicos | Correcta | CONSERVAR |
| **Privacy** | Confianza | Ver §4 (claim contradictorio) | MEJORAR |
| **Plans** | Conversión | — | MANTENER_CONVENCIONAL |
| **BetaPartner** | Conversión | — | MANTENER_CONVENCIONAL |
| **Faq** | Conversión + JSON-LD (`page.tsx:54`) | — | MANTENER_CONVENCIONAL |
| **FinalCta** | Cierre | No cierra el arco: el expediente no llega | MEJORAR |

### 2.1 Repetición medida
- «el problema no es encontrar / lo de después»: **5 veces** (`ProblemSolution.tsx:11` y `:25`, `Features.tsx:13`, `WhyNotSearch.tsx:11-12`, `content.ts:252`).
- «revisión humana»: **7 veces** (`Hero.tsx:106`, `Features.tsx:13`, `content.ts:165,196,339`, `Privacy.tsx:18`, AiTransparency).

### 2.2 Cadena de cuadrículas
**8 secciones claras consecutivas** entre Hero y Privacy, con **6 cuadrículas/tablas seguidas**: Features (9) → AiTransparency (6) → WhyNotSearch (tabla 5) → DualAudience (2 + chips) → Privacy (6) → Plans (4 + tabla de 8 filas ≈ 33 celdas).

### 2.3 Restricciones duras (no se puede simplemente borrar)
- `#funcionalidades` está en `navLinks` (`site.ts:40`), en el footer (`Footer.tsx:15`) y en `STATIONS` (`page.tsx:24`) → **Features se transforma, no se borra**.
- `Faq` alimenta el JSON-LD → se queda.
- `JourneyRail` promete 8 estaciones para 14 secciones: entre «Funcionalidades» y «Confianza» el lector cruza **3 secciones sin estación** y el rail salta.

### 2.4 Material ya disponible sin usar
`RequirementsMock.tsx:28` y `TimelineMock.tsx:24` **ya contienen `EXP-2024-0142`** y no se renderizan en ningún sitio. Y `/gracias` es una **ruta huérfana** (nada la enlaza) con copy de otra campaña («sesión de demostración») frente al CTA vigente («Solicitar plaza en la beta»).

## 3. Inventario de motion

Lo que la PR #19 **ya optimizó y no se toca**: `ScrollProgress` (escribe `transform` al DOM, sin render), `TiltCard`/`Magnetic` (fuera del estado de React), `Reveal` (**un único `IntersectionObserver` compartido**), constelación aligerada en móvil/equipos modestos, pausas en táctil y reduced-motion, timeout de HubSpot.

**Deuda principal detectada**: `StepJourney.tsx:403-409` mantiene el progreso de la ruta (`drawn`) en **estado de React** actualizado en `scroll` → re-render de toda la sección por frame. Es el único `setState` continuo por scroll que queda y el objetivo natural del orquestador (→ variable CSS).

## 4. Claims: contradicción interna detectada

`content.ts:347-350` afirma **«Datos alojados en la UE — Infraestructura en la Unión Europea»**, mientras `seguridad-y-privacidad/page.tsx:54-60` dice que **«la localización de los datos… debe confirmarse antes de la apertura pública»**. La web se contradice a sí misma. Ver `docs/LEGAL-CLAIMS-AUDIT.md`.

Claims que **no deben ganar peso visual** en esta evolución mientras sigan sin verificar: aislamiento por organización, modo multicliente, 2FA/TOTP, sin entrenar con tus documentos, límites «reales» de plan, webhooks, subvenciones, ilimitados.

## 5. Documentación contra código (contradicciones reales)

| Doc | Dice | Realidad | Riesgo |
|---|---|---|---|
| `README.md:151`, `DEPLOYMENT.md:62` | sin HubSpot «muestra confirmación sin entregar el lead» | `DemoForm.tsx:141-156` hace lo contrario a propósito | **Alto**: invita a reintroducir pérdida silenciosa de leads |
| `README.md:37` | leads vía «endpoint de servidor» | envío desde cliente (`hubspot.ts:65`); no hay servidor (`next.config.mjs`) | Medio |
| `README.md:49` | «Inter + Space Grotesk» | Poppins + Inter + **Geist Mono** (`fonts.ts`) | Medio (la mono es el aire de «expediente») |
| `README.md:23,195` | referencias a Vercel (una es ancla muerta) | «No se usa Vercel» en el mismo doc | Bajo |
| `DEPLOYMENT.md:58`, `CONTENT-PENDING.md:26` | `contacto@licitatis.es` | `info@licitatis.es` | Medio |
| `content.ts:10` | literal fijo | Footer/legales leen `siteConfig.contactEmail` → **doble fuente**: definir la env mostraría dos correos, uno en el aviso RGPD | Medio |
| `CONTENT-PENDING.md:11-15` | pide razón social, CIF, domicilio, registro, DPD | **ya entregados** (`legal.ts:26-40`) | Medio (oculta lo que falta de verdad) |
| `DEPLOYMENT.md:43-45` | docroot «probable» `~/domains/...` | el servido es `~/public_html`; el workflow autodetecta | Medio |
| `SECURITY.md:14` | HSTS con más alcance | `.htaccess` aplica 1 año solo a este host | Bajo |
| `DEPLOYMENT.md:68` | `ssh-keygen -f ./id_licitatis_deploy` | **genera la clave privada dentro del repo** (y hoy está ahí) | **Alto (higiene)** |
| `package.json:13` | `start: next start` | incompatible con `output: "export"` | Bajo |
| README / DEPLOYMENT | no mencionan el release gate ni `format:check` | ambos pueden romper CI/despliegue | Medio |

**Frontera cliente/servidor**: auditada y **correcta**. Los 22-23 `"use client"` están justificados; las secciones son componentes de servidor. Nada que mover.

## 6. Conclusión operativa

El trabajo no consiste en añadir animaciones, sino en **hacer que el expediente exista en toda la página**. Tres palancas, por orden de valor/riesgo:

1. **Fuente única del expediente** (`src/lib/demo-expediente.ts`): elimina la incoherencia 64/50/74, no cambia un píxel y **habilita** el hilo hero→CTA.
2. **Progreso de la ruta por variable CSS**: quita el último `setState` por frame.
3. **Reanclar las secciones huérfanas** (ValueStats como hoja de ruta, Features como anatomía, FinalCta como cierre del arco) usando material que ya existe.
