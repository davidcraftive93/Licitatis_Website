# LICITATIS — «El Expediente Vivo»: presupuesto de rendimiento

Definido **antes** de programar. Los resultados reales van en `EXPEDIENTE-VIVO-PERFORMANCE-RESULTS.md`.

## 1. Línea base (medida en la rama base `agent/auditoria-rendimiento-licitatis` @ `1c96925`)

| Métrica | Valor |
|---|---|
`out/_next/static` | **1,5 MB** |
Chunks JS | **13** |
First Load JS compartido | **103 kB** |
Componentes cliente | 22 |
Ficheros con `IntersectionObserver` | 6 |
Ficheros con `requestAnimationFrame` | 6 |
Canvas activos | 1 (constelación) |
Clases `animate-*` distintas | 12 |
Rutas exportadas | 12 |
Tests | 21 |

## 2. Presupuesto

| Concepto | Límite |
|---|---|
Incremento de JavaScript | **≤ 0 %** — el objetivo es *igual o menos* (la refactorización de la ruta a variable CSS debe compensar lo nuevo). Máximo tolerado con justificación escrita: +10 % |
Dependencias nuevas | **0** (ninguna librería de animación) |
Loops rAF simultáneos | **1** para progreso + los de puntero, que solo existen mientras el puntero se mueve |
Canvas activos | **1**, pausado fuera de viewport y con la pestaña oculta |
Escenas N4 | **1** en toda la página (Acto 4) |
`IntersectionObserver` | Sin aumentar la cuenta; los revelados siguen compartiendo uno |
Movimientos protagonistas por viewport | **1** |
`setState` por frame | **0** |
Animaciones infinitas visibles a la vez | **≤ 2** y solo decorativas |
`will-change` permanente | **0** |
Layout shift causado por animación | **0** (solo `transform`/`opacity`) |
LCP | No empeorar: el H1 y el mock del hero no se retrasan (`enter-rise` solo usa `transform`) |
CLS | 0 por animación; la ruta SVG se dimensiona con el alto medido, no empuja contenido |
Long tasks | Ninguna nueva > 50 ms atribuible a esta evolución |
Equipos modestos | Tier `low` sin canvas animado, sin tilt/magnetic, contenido idéntico |

## 3. Qué se mide y cómo

| Medición | Método | Fiabilidad |
|---|---|---|
Peso de `out/_next/static`, nº de chunks, First Load JS | `npm run build` antes/después | **Medido** |
Recuento de observers/rAF/canvas/animaciones | `grep` sobre `src/` | **Medido** |
Presencia de `setState` en handlers de scroll | inspección de código | **Medido** |
Ruta dibujándose y estaciones encendiéndose | navegador real (`getComputedStyle` sobre `stroke-dashoffset`) | **Medido** |
LCP / CLS / long tasks en dispositivo real | requiere Lighthouse en equipo del propietario | **Pendiente de navegador real** |

**Regla de honestidad**: en el documento de resultados, cada fila se etiqueta `Medido`, `Estimado`, `No medido` o `Pendiente de navegador real`. Nada se declara medido si no se ejecutó.

## 4. Estrategia si el presupuesto se rompe

1. Bajar la escena de N4 a N2 (aparición en vez de dibujado ligado a scroll).
2. Reducir nodos de la constelación (ya escalada por tier).
3. Desactivar auroras en `low`.
4. Ejecutar una sola vez lo que estaba en bucle.
5. Si nada basta: **quitar el efecto**. El contenido nunca se recorta para salvar una animación.
