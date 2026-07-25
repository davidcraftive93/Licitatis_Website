# LICITATIS — «El Expediente Vivo»: blueprint

## 1. Concepto

El visitante no recorre secciones independientes: **acompaña a un mismo expediente** desde que entra como pliego hasta que se convierte en una candidatura preparada para decidir y presentar.

Lo que debe recordar al salir:

> Un pliego entra. LICITATIS lo entiende. Lo compara con tu empresa.
> Localiza requisitos y riesgos. Organiza el trabajo. Prepara una decisión.

## 2. Metáfora y límites

La metáfora es **documental y operativa**, no espacial ni abstracta: pliegos, requisitos, evidencias, semáforos, bloqueantes, tareas, escenarios, informe. Nada de esferas, partículas decorativas ni escenas de agencia.

**Lo que se conserva intacto** (dirección visual aprobada): hero oscuro «cabina de control» con constelación, radar, foco al puntero y pliegos suspendidos; verde esmeralda + ámbar miel + tinta navy + papel cálido; Poppins/Inter/Geist Mono; modo claro y oscuro; el Pasaporte del Licitador; la ruta SVG; los mocks claros como «capturas del producto».

## 3. Los dos objetos del relato (y por qué no se mezclan)

| | **Pasaporte del Licitador** | **Expediente EXP-2024-0142** |
|---|---|---|
| Qué es | La **memoria permanente** de la empresa | El **caso concreto** que se prepara |
| Vive | Una vez, se reutiliza | Uno por licitación |
| Contiene | Identidad, CPVs, solvencia, credenciales con caducidad | Pliego, requisitos, tareas, riesgos, escenarios |
| Rol narrativo | Lo que la empresa **puede demostrar** | Lo que el pliego **exige** |

La ecuación visible de la página:

```
Pasaporte de la empresa  +  Pliego de la licitación  =  Análisis del expediente
```

## 4. Estados del expediente

| # | Estado | Dónde se ve |
|---|---|---|
| 0 | Pliego recibido | Hero (fila destacada del panel) |
| 1 | Oportunidad detectada | Hoja de ruta (ValueStats) · paso 01 |
| 2 | Pliego estructurado | Paso 02 |
| 3 | Elegibilidad contrastada | Paso 03 + Pasaporte |
| 4 | Expediente organizado | Paso 04 + anatomía |
| 5 | Riesgos detectados | Paso 05 (AEAT) |
| 6 | Oferta simulada | Paso 06 |
| 7 | Informe para dirección | Paso 06 / cierre |
| 8 | Candidatura preparada | FinalCta |

**Fuente única**: `src/lib/demo-expediente.ts`. Hoy el expediente está copiado a mano en 6 ficheros con cifras que se contradicen (64 % / 50 % / 74 %). Sin fuente única no hay hilo posible.

## 5. Jerarquía de contenidos (qué manda en cada pantalla)

1. **Mensaje** (texto indexable, en HTML).
2. **Estado del expediente** (dato concreto).
3. **Interfaz de producto** (mock claro).
4. **Movimiento** (solo si ayuda a entender el cambio de estado).

El movimiento nunca es el primer nivel. Si una escena funciona sin movimiento, es una buena escena.

## 6. Componentes reutilizables previstos

| Componente | Papel |
|---|---|
`src/lib/demo-expediente.ts` | Fuente única del caso (código, objeto, CPV, importe, plazo, índice, bloqueante, credenciales)
`ExpedienteChip` | Etiqueta reutilizable «EXP-2024-0142 · Demo» — la firma visual del hilo
`JourneyProvider` (evaluado) | **Descartado**: no hacía falta un contexto. El progreso se escribe como variable CSS en el propio `<svg>` y el paso activo ya lo resuelve un `IntersectionObserver` local. Un proveedor global habría añadido indirección sin quitar ni un render
`ExpedienteAnatomy` | Sustituye la cuadrícula de 9 tarjetas por capas. **Implementado sin selección**: unas pestañas o un acordeón habrían escondido ocho de las nueve tarjetas tras un gesto, y el mandato exige que los nueve textos sigan indexables y legibles sin JavaScript. La jerarquía se resolvió visualmente (número de capa, resultado, costura entre capas) y la sección sigue siendo componente de servidor: 0 kB de JS
`ProvenanceTrail` | Hecho → inferencia → recomendación → revisión humana

## 7. Estrategia responsive

- **Móvil**: una columna; el panel del paso va **bajo** cada paso (ya implementado); la ruta SVG se mide del DOM, así que encaja con cualquier alto. Sin efectos de puntero.
- **Escritorio**: panel sticky con crossfade entre módulos.
- **≥1920 px**: el `rem` escala (ya implementado) y el contenedor crece hasta 124 rem. La ruta y los paneles crecen con él.

## 8. Fallback y reduced motion

| Escenario | Comportamiento |
|---|---|
Sin JavaScript | Todo el contenido visible (los `reveal` solo se ocultan con la clase `.js`); la ruta SVG se dibuja completa; los paneles se muestran apilados
`prefers-reduced-motion` | Ruta dibujada entera sin animación; sin tilt, sin magnetic, sin constelación animada (fotograma estático); rotatoria fija; marquesina detenida
Low tier | Igual que reduced motion en lo caro, contenido idéntico
Táctil | Sin efectos de puntero; el paso activo lo decide el scroll

**Regla dura**: el contenido es **idéntico** en los tres niveles de calidad. La calidad afecta al movimiento, nunca a la información.

## 9. Estrategia de conversión (no se toca lo que convierte)

- `Plans`, `BetaPartner` y `Faq` permanecen **convencionales**: precio legible, IVA incluido visible, límites comparables, CTA claros, aviso de facturación presente.
- El formulario **no lleva canvas, parallax ni animación continua**.
- Se registra la **intención del CTA** de origen (qué botón trajo al usuario) sin volver a pedir datos y sin romper HubSpot ni el fallback por correo.
- El expediente llega a la conversión como «tu primera licitación real» — cierre del arco, no adorno.

## 10. Lo que este trabajo NO hace

Sin Three.js, WebGL, GSAP, Lenis, Framer Motion ni Lottie. Sin scroll-jacking, sin audio, sin preloader, sin contenido crítico en canvas, sin API routes ni server actions (el sitio sigue siendo `output: "export"`). Sin claims nuevos sin verificar y sin inventar datos legales.
