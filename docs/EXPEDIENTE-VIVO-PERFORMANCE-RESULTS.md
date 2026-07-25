# LICITATIS — «El Expediente Vivo»: resultados

Contraste con `EXPEDIENTE-VIVO-PERFORMANCE-BUDGET.md`. Cada fila lleva su etiqueta de fiabilidad:
**Medido**, **Estimado**, **No medido** o **Pendiente de navegador real**. Nada se declara medido
si no se ejecutó.

- **Base**: `agent/auditoria-rendimiento-licitatis` @ `1c96925`, construida en un worktree aparte
  reutilizando el mismo `node_modules` (las dependencias no cambian en esta rama).
- **Rama**: `feature/expediente-vivo` @ `1ba9723` (medición final, con la lógica extraída a
  `src/lib/journey.ts` y `src/lib/quality-tier.ts`).

## 1. Peso del artefacto

| Métrica | Base | Rama | Δ | Fiabilidad |
|---|---|---|---|---|
`out/_next/static` (bytes) | 1 462 549 | 1 465 273 | **+2 724 (+0,19 %)** | **Medido** (`npm run build` en ambas; entre builds sucesivos varía ±20 B por el hash de los chunks)
Chunks JS | 13 | 13 | 0 | **Medido**
First Load JS compartido | 102 kB | 103 kB | +1 kB | **Medido**
`/` (tamaño de ruta) | 29,4 kB | 30,2 kB | +0,8 kB | **Medido**
`/` First Load JS | 138 kB | 139 kB | **+1 kB (+0,7 %)** | **Medido**
Páginas HTML exportadas | 10 | 10 | 0 | **Medido** (`find out -name index.html`)

**El presupuesto pedía ≤ 0 % y toleraba hasta +10 % con justificación escrita. Justificación**: la
rama añade contenido nuevo (chip del expediente en 4 puntos, cadena de procedencia, cabeceras de las
4 capas) que es **HTML renderizado en servidor**, no JavaScript. El único JS de cliente nuevo es
`src/lib/cta-origin.ts` (~40 líneas, un listener) más dos módulos de lógica pura
(`journey.ts`, `quality-tier.ts`) que **sustituyen** código que ya estaba dentro de los componentes,
no lo añaden. La refactorización de la ruta a variable CSS elimina renders, no bytes. Se compensó
parcialmente borrando 196 líneas de componentes muertos.

## 2. Movimiento

| Métrica | Base | Rama | Fiabilidad |
|---|---|---|---|
`setState` por frame de scroll | **1** (`StepJourney`) | **0** | **Medido** (no queda ninguna referencia a `setDrawn`)
Niveles de calidad implementados y probados | implícitos y repartidos | `low` / `standard` / `enhanced` en `src/lib/quality-tier.ts`, 11 pruebas | **Medido**
Geometría del viaje probada | 0 pruebas | 13 pruebas (`src/lib/journey.ts`) | **Medido**
Auroras animadas en bucle | **9** | **2** (atmósfera del hero + cierre) | **Medido** (`grep animate-aurora`)
Clases `animate-*` distintas | 6 | 6 | **Medido**
Canvas activos | 1 | 1 | **Medido**
Ficheros con `IntersectionObserver` | 6 | 6 | **Medido**
Ficheros con `requestAnimationFrame` | 6 | 6 | **Medido**
Componentes cliente | 23 | 23 | **Medido**
Dependencias nuevas | — | **0** | **Medido** (`package.json` solo pierde el script `start`)

## 3. Comportamiento verificado en navegador

| Comprobación | Resultado | Fiabilidad |
|---|---|---|
Ruta SVG dibujándose al bajar | 0 % → 48 % → 100 % conforme desciende la lista | **Medido** (`getComputedStyle(path).strokeDashoffset` en un navegador real)
La variable CSS gobierna el trazo | `--journey-offset` 0 → 0 px, 25 % → 543,73 px, completo → 2174,92 px | **Medido**
El scroll no re-renderiza React | el trazo se actualiza sin cambio de estado; el progreso solo se escribe en el `<svg>` | **Medido** (por construcción + comprobación del valor)
Hilo del expediente | 18 apariciones del código en la página; 4 chips con estado (Oportunidad detectada → Expediente organizado → Riesgos detectados → Candidatura preparada) | **Medido**
Las 9 funcionalidades siguen en el HTML | 4 capas, 9 tarjetas, ninguna oculta tras un control | **Medido**
Cadena de procedencia | 4 niveles, el último sin fuente | **Medido**
CTA etiquetados | 10 (`cabecera`, `hero-analizar`, `hero-beta-partner`, `plan-free/starter/pro/agency`, `faq`, `cierre-analizar`, `pie`) | **Medido**
Aviso de hidratación en consola | desaparece con `suppressHydrationWarning` | **Medido**
Release gate legal | **PASS** (0 bloqueantes, 9 avisos) — mismo estado que la base | **Medido**
Tests | 21 → **59**, todos en verde | **Medido**

## 4. Responsive

Barrido en navegador real. En cada ancho se comprobó que **ningún elemento sin recortar** sobresale
del viewport y que **no hay scroll horizontal**.

| Ancho | `font-size` raíz | Contenedor | Rail lateral | Scroll horizontal | Fiabilidad |
|---|---|---|---|---|---|
360 | 16 px | 360 | oculto | no | **Medido**
390 | 16 px | 390 | oculto | no | **Medido**
768 | 16 px | 753 | oculto | no | **Medido**
1024 | 16 px | 1009 | oculto | no | **Medido**
1440 | 16 px | 1200 | visible | no | **Medido**
1920 | 17 px | 1394 | visible | no | **Medido**
2560 | 19 px | 1748 | visible | no | **Medido**
3440 | 22 px | 2024 | visible | no | **Medido**
3840 | 22 px | 2376 | visible | no | **Medido**

**Defecto corregido durante el barrido**: por debajo de ~430 px la página entera se desplazaba en
horizontal (76 px). La columna de pasos es celda de grid y su mínimo por defecto es `auto`, así que
el ancho mínimo del panel del mock la ensanchaba a 446 px dentro de un viewport de 390. Resuelto con
`min-w-0`. Era **anterior** a esta evolución.

## 5. Contraste (AA 4.5:1) de los elementos nuevos

Calculado en navegador sobre los colores computados, contra el primer ancestro opaco.

| Elemento | Claro | Oscuro | Fiabilidad |
|---|---|---|---|
Código del expediente en el chip | 18,72 | 15,75 | **Medido**
Estado en el chip | 11,52 | 9,97 | **Medido**
Etiqueta «Demo» | **4,73** | 6,25 | **Medido**
Número y título de capa | 18,72 | 15,75 | **Medido**
Resultado de la capa | 11,52 | 9,97 | **Medido**
Nivel y fuente de la procedencia | 4,73 / 18,72 | 6,25 | **Medido**

Mínimo observado **4,73:1** — por encima del 4,5:1 exigido, pero con poco margen: conviene no
oscurecer más el token `--fg-muted`.

## 5.b Defectos latentes que la extracción a lógica pura destapó

Ninguno era visible en el navegador; los tres salieron al escribir las pruebas de los casos límite.

| Defecto | Escenario | Efecto |
|---|---|---|
`(línea - top) / height` con `height === 0` | La lista mide 0 antes del primer layout y con `display: none` | `NaN` en `stroke-dashoffset`: valor inválido, la ruta se queda sin dibujar **sin ningún error en consola**
`dashOffset` con `pathLength` sin medir | `getTotalLength()` aún no llamado | Mismo final: valor inválido en el trazo
Paso activo elegido por el último del lote del `IntersectionObserver` | Dos pasos cruzando la banda (viewport alto o pasos cortos) | El orden del lote no está garantizado, así que el paso activo podía **retroceder** mientras bajabas

## 6. Lo que NO se ha medido

| Métrica | Motivo | Cómo obtenerla |
|---|---|---|
LCP, CLS, INP, long tasks | Requiere Lighthouse/WebPageTest en equipo real; el panel de previsualización de esta sesión corre con la pestaña oculta (`document.hidden === true`), donde `requestAnimationFrame` no se ejecuta y el `IntersectionObserver` no entrega | Lighthouse en el equipo del propietario sobre el `out/` construido |
Estaciones del viaje encendiéndose 1→6 al bajar | Depende del `IntersectionObserver`, que no entrega en pestaña oculta. **El callback sí se ha tocado** en esta rama (`pickActiveStep`) y su lógica está cubierta por pruebas; lo que no se ha visto es el encendido real | Abrir la página y bajar |
`prefers-reduced-motion` | No se puede emular desde este panel. En código: la ruta nace con `--journey-offset: 0` (dibujada) y **no se registra ningún listener**; `globals.css` fuerza `animation-delay: 0ms`. `journey.test.ts` fija que progreso 1 ⇒ offset 0 | DevTools → Rendering → Emulate `prefers-reduced-motion` |
Tier `low` en un dispositivo real (`saveData`, `deviceMemory`) | La **decisión** está cubierta por 11 pruebas (`quality-tier.test.ts`); lo que no se ha observado es el canvas en un equipo con esas señales | Equipo modesto, o DevTools → Network → Save-Data |
Comportamiento del listener delegado de CTA en la página | En pestaña oculta no llegan clics reales; la lógica está cubierta por 6 pruebas unitarias (`cta-origin.test.ts`) | Pulsar un CTA y enviar el formulario con HubSpot configurado |

## 7. Veredicto

Presupuesto **cumplido** salvo el objetivo de «≤ 0 % de JavaScript», que queda en **+0,7 %** del
First Load de la portada — dentro del margen tolerado y justificado arriba. Ninguna estrategia de
degradación del presupuesto (bajar N4 a N2, recortar la constelación, quitar el efecto) ha hecho
falta.
