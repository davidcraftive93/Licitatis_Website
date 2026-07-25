# LICITATIS — «El Expediente Vivo»: sistema de motion

## 1. Niveles

| Nivel | Qué es | Coste | Uso permitido |
|---|---|---|---|
**N0** | Estático | 0 | Formulario, planes, textos legales |
**N1** | Aparición al entrar en viewport (`Reveal`, count-up **una vez**) | Observador compartido; sin loop | Por defecto en casi todo |
**N2** | Transición de estado discreta (crossfade de módulo, acordeón, credenciales en cascada) | Transición CSS disparada por un cambio discreto | Cuando el usuario o el scroll cambian de estado |
**N3** | Interacción con puntero (tilt, magnetic, foco del hero) | rAF + escritura directa al DOM; **solo puntero fino** | Hero y mock del producto |
**N4** | Narración ligada a scroll (ruta del expediente) | Un único rAF + **variable CSS** | **Solo el Acto 4** |

**Ninguna sección usa N3 o N4 sin justificarlo aquí.** Justificaciones:
- **N3 en el hero**: es la «cabina de control»; la respuesta al puntero es la que hace creíble que sea un panel y no una imagen. Ya optimizado en PR #19 (fuera del estado de React).
- **N4 en el Acto 4**: la ruta *es* el contenido — representa el avance del expediente. Es el único sitio donde el movimiento aporta significado que el texto no da.

## 2. Reglas de implementación

1. **Nada de `setState` por frame.** Valores continuos → `ref` + variable CSS + una escritura directa al DOM dentro de un solo rAF. React state solo para cambios **discretos** (escena activa, paso activo, módulo seleccionado).
2. **Un solo rAF por página** para el progreso; los efectos de puntero usan el rAF-throttle ya existente (`useRafCallback`).
3. **Observador compartido** para revelados (`Reveal` ya lo hace). No crear un `IntersectionObserver` por elemento cuando uno sirva para todos.
4. **Nada corre fuera del viewport**: todo loop se pausa por `IntersectionObserver` y por `visibilitychange`.
5. **`will-change` no permanente**: solo mientras el elemento se mueve de verdad.
6. **Compositor primero**: `transform` y `opacity`. Prohibido animar en bucle `background-position`, `width`, `height`, `top` o `grid-template-rows` (la transición del acordeón es discreta y acotada, no un bucle).
7. **Un movimiento protagonista por viewport.**

## 3. Presupuesto de movimiento por pieza

| Pieza | Nivel | Decisión | Motivo |
|---|---|---|---|
Constelación (canvas) | N3 | **CONSERVAR** (ya aligerada en móvil/low tier) | Es la firma del hero
Radar / haz | N1 loop | **CONSERVAR** sutil | Metáfora de detección
Foco al puntero | N3 | **CONSERVAR** | Sensación de panel
Pliegos suspendidos | N3 | **CONSERVAR** (`hidden md:block`) | Documentos = tema
Auroras | N1 loop | **REDUCIDO ✔** de 9 a 2 (atmósfera del hero + cierre); el resto conserva el halo, sin animación | Competían con el mensaje
Marquesina | N1 loop | **CONSERVAR** con pausa en hover/focus | Léxico del sector
Degradado del H1 | — | **EJECUTAR_UNA_VEZ** (ya: 2 ciclos) | `background-position` no compone
Indicador de scroll | N1 loop | **CONSERVAR** | Invitación al descenso
Tilt | N3 | **CONSERVAR** (ya fuera del estado) | —
Magnetic | N3 | **CONSERVAR** (ya fuera del estado) | —
Reveals | N1 | **CONSERVAR** (observador compartido) | —
**Ruta SVG** | N4 | **HECHO ✔** → `--journey-offset` escrito en el `<svg>` | Era el último `setState` por frame
Count-up | N1 | **EJECUTAR_UNA_VEZ** | —
Gauge / barras / credenciales | N2 | **CONSERVAR** | Cambio de estado real
JourneyRail | N2 | **HECHO ✔** (`covers` mapea cada sección a su parada) | Antes se quedaba clavado 3 secciones
Acordeones | N2 | **CONSERVAR** | —

## 4. Quality tiers

Señales permitidas: `prefers-reduced-motion`, `pointer: fine`, `saveData`, `deviceMemory`, `hardwareConcurrency`, tamaño de viewport, visibilidad de pestaña. **Nunca** user-agent como criterio principal.

| Tier | Movimiento | Contenido |
|---|---|---|
**low** | Sin constelación animada (fotograma estático), sin tilt, sin magnetic, sin parallax, sin loops, blur reducido. Ruta completa o aparición simple | **Idéntico** |
**standard** | Ruta SVG, transiciones de estado, reveals, una animación principal | **Idéntico** |
**enhanced** | Constelación, respuesta de puntero, profundidad, transiciones más ricas | **Idéntico** |

## 5. Velocidad de scroll

Permitida **solo como señal secundaria y decorativa**: intensificar levemente el trazo o un pulso. Normalizada, amortiguada y acotada.

**Prohibido** que la velocidad altere el contenido, cambie una decisión, impida leer, mueva paneles en exceso, provoque mareo, cree scroll-jacking o afecte al formulario o al pricing.

## 6. Accesibilidad del motion

- Todo lo decorativo va `aria-hidden`.
- La ruta SVG es decorativa: el progreso real lo comunica el **paso activo** (`aria-current`) y el texto.
- La rotatoria anuncia su lista completa una vez (`sr-only`) y **se pausa** al señalar/enfocar.
- La marquesina se pausa en hover/focus (SC 2.2.2).
- Nada de texto comercial solo en canvas o en SVG inaccesible.
