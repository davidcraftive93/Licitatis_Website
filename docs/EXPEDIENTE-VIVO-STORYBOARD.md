# LICITATIS — «El Expediente Vivo»: storyboard

Nivel de motion según `EXPEDIENTE-VIVO-MOTION-SYSTEM.md` (N0 estático → N4 ligado a scroll).
**Regla de oro**: un solo movimiento protagonista por viewport.

---

## ACTO 1 — El pliego entra (Hero)

| | |
|---|---|
**Mensaje** | Qué es LICITATIS, qué recibe y qué produce
**Estado inicial** | Cabina de control; panel con 4 licitaciones
**Estado final** | `0. Pliego recibido` — el 0142 es reconociblemente el caso que seguimos
**Visual** | Se conserva todo (constelación, radar, foco, pliegos, mock). Se **destaca la fila 0142** en el panel y se le pone su etiqueta
**Interacción** | Foco al puntero (solo puntero fino) · CTA magnético
**Texto** | H1 y párrafo actuales (no se tocan: LCP)
**CTA** | «Analizar una licitación real» + «Ser Beta Partner» — visibles de inmediato
**Duración** | Entrada en cascada ya existente (≤900 ms), una vez
**Móvil** | Sin efectos de puntero; sin pliegos (ya `hidden md:block`)
**Reduced motion** | Todo en estado final, sin cascada
**Coste** | Cero JS nuevo: es una marca visual + dato de la fuente única
**Nivel** | N3 (heredado, ya optimizado en PR #19)

> No se oculta el H1 ni los CTA tras ninguna animación.

---

## ACTO 2 — La hoja de ruta (ValueStats reconvertida)

| | |
|---|---|
**Mensaje** | «Este es el caso. Esto es lo que está en juego»
**Estado inicial** | 4 cifras genéricas que resumen la página antes de contarla
**Estado final** | `1. Oportunidad detectada` — expediente, importe, plazo, bloqueantes
**Visual** | Misma banda, mismo peso; contenido reanclado al 0142
**Texto** | Datos reales del caso: `EXP-2024-0142` · 214.000 € · 6 días · 1 bloqueante
**Duración** | Reveal + count-up **una vez**
**Móvil** | 2 columnas
**Reduced motion** | Cifras finales directas
**Coste** | Cero JS nuevo (elimina el `CountUp` sobre «PLACSP», que no era numérico)
**Nivel** | N1

---

## ACTO 3 — Lo caro empieza después (ProblemSolution + WhyNotSearch)

| | |
|---|---|
**Mensaje** | El problema no es encontrar; es todo lo de después
**Problema actual** | La tesis se enuncia **5 veces** en la página; esta sección se repite dentro de sí misma
**Estado final** | Tesis dicha **una vez**, con la evidencia más fuerte (las 5 filas de WhyNotSearch)
**Visual** | Se conserva el contraste disperso→centralizado, ligado **solo** a licitaciones (nada del mapa operativo de Craftive)
**Duración** | Reveal escalonado
**Nivel** | N1

---

## ACTO 4 — Recorrido del expediente (StepJourney) ★ pieza central

| | |
|---|---|
**Mensaje** | Del pliego al informe, paso a paso, sobre el mismo caso
**Estado inicial** | 6 pantallas que pueden leerse como 6 demos independientes
**Estado final** | Estados 2→7: una **misma interfaz que cambia de módulo**
**Visual** | Ruta SVG como columna vertebral + cabecera persistente (expediente, órgano, CPV, importe, plazo, índice)
**Interacción** | El scroll decide el paso activo (`IntersectionObserver`, discreto)
**Duración** | Trazo ligado al scroll; crossfade 500 ms entre módulos
**Móvil** | Panel bajo cada paso (ya implementado)
**Reduced motion** | Ruta completa, sin dibujado progresivo
**Coste** | **Hecho**: el progreso pasa de estado de React a la variable CSS `--journey-offset` y desaparece el último `setState` por frame. La geometría vive en `src/lib/journey.ts`, pura y con 13 pruebas
**Nivel** | N4 (el único N4 de la página)

---

## ACTO 5 — El Pasaporte entra en juego (Passport)

| | |
|---|---|
**Mensaje** | El sistema compara lo que el pliego exige con lo que la empresa puede demostrar
**Estado final** | `3. Elegibilidad contrastada`
**Visual** | El Pasaporte como capa de evidencias; el **AEAT caducado** como bloqueante que ya reapareció en el paso 05
**Duración** | Anillo + barras + credenciales en cascada, **una vez** (ya implementado)
**Reduced motion** | Estados finales
**Coste** | Cero JS nuevo
**Nivel** | N2

> Es la única continuidad real que ya existe hoy. Se refuerza, no se reinventa.

---

## ACTO 6 — Anatomía del expediente (Features transformada)

| | |
|---|---|
**Mensaje** | Qué contiene un expediente preparado
**Problema actual** | 8 de 9 tarjetas reformulan lo que el Acto 4 acaba de **demostrar** con UI viva
**Estado final** | `4. Expediente organizado` — cuatro capas en orden sobre el mismo expediente
**Visual** | Lectura del pliego · ¿Podemos presentarnos? · Preparación de la oferta · Control del avance. Cada capa declara qué queda hecho al terminarla, con costura visible hacia la siguiente
**Interacción** | **Ninguna: implementado SIN pestañas ni acordeón.** Se planteó el patrón tabs, y se descartó al programarlo: habría escondido ocho de las nueve tarjetas tras un gesto previo, contra la propia restricción de esta fila. La jerarquía la da el número de capa y el resultado, que no esconden nada
**Móvil** | Una columna; nada que desplegar
**Reduced motion** | Sin diferencia: la sección no se mueve
**Restricción** | `#funcionalidades` está en la nav, el footer y el rail → **se transforma, no se borra**; el texto de las 9 funcionalidades sigue en el HTML (SEO). **Cumplido y con prueba**: `demo-expediente.test.ts` falla si una capa queda vacía o si el total deja de ser 9
**Nivel** | N1 (bajó de N2 al no haber cambio de estado que animar). Componente de servidor: 0 kB de JS

---

## ACTO 7 — IA con trazabilidad (AiTransparency)

| | |
|---|---|
**Mensaje** | La IA propone; la persona decide
**Estado final** | Panel de procedencia sobre el bloqueante REAL del caso: **Hecho → Inferencia → Recomendación → Decisión**
**Visual** | Cadena de cuatro niveles, cada uno con su fuente. La cadena se corta en la decisión, el único nivel sin fuente que citar («aquí no hay fuente: hay una persona responsable»)
**Implementado** | Cuatro niveles en vez de cinco: «Hueco» no era un nivel de procedencia sino un estado del análisis, y ya se muestra como `[[FALTA: …]]` en el paso 02. `demo-expediente.test.ts` fija el orden y comprueba que el último nivel no tiene fuente
**Restricción** | **Todas** las advertencias legales se mantienen visibles; nada en tooltips
**Nivel** | N1 · componente de servidor

---

## ACTO 8 — Empresa o consultora (DualAudience)

Se conserva. El mismo sistema en dos configuraciones (un Pasaporte / varios espacios de cliente). **No se afirma el aislamiento multiempresa como operativo** mientras siga sin confirmación técnica. **N1**.

## ACTO 9 — Seguridad (Privacy)

Se conserva la estructura. **Corregida** la contradicción interna sobre la localización de los datos: se retiró la afirmación «Datos alojados en la UE» de la landing, que chocaba con `/seguridad-y-privacidad`. La tarjeta remite ahora a esa página y a la lista de subencargados; la afirmación puede volver cuando el propietario confirme proveedor y región. Sin escudos gigantes, sin candados flotantes, sin claims absolutos. **N1**.

## ACTO 10 — Planes

**MANTENER CONVENCIONAL.** Precio legible, «IVA incluido» visible, plan recomendado claro, límites comparables, aviso de facturación de ZSE INNOVATION STUDIO SL presente, móvil correcto. Solo microinteracciones suaves. **N1**.

## ACTO 11 — Beta Partner (conversión)

Zona estable y predecible: **sin canvas, sin parallax, sin cursor effects, sin animación continua**. El expediente llega como «tu primera licitación real». Se registra la **intención del CTA** de origen sin volver a pedir datos: `data-cta` en los 10 botones y un único listener delegado; el valor viaja dentro del mensaje del lead, nunca como propiedad nueva de HubSpot. HubSpot y el fallback por correo intactos. **N0/N1**.

## ACTO 12 — Cierre (FinalCta)

`8. Candidatura preparada`. Cierra el arco: el expediente que entró como pliego en el Acto 1 sale preparado. **N1**.
