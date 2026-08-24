# Handoff de transparencia de IA para la aplicación LICITATIS

Este documento traslada a la **aplicación privada** (`app.licitatis.es`, repositorio separado) las obligaciones de transparencia de IA que **no** se resuelven en la landing pública. La landing solo comunica el enfoque; la app es donde el usuario interactúa con la IA y donde aplican las obligaciones de información del **Reglamento (UE) de IA (art. 50)** y del RGPD.

> Estado de cada punto: `Preparado técnicamente` · `Pendiente de revisión jurídica` · `Aplicable` · `No aplicable`. **No** se afirma en la web que se cumple el art. 50: eso requiere revisión jurídica de la app.

## Qué SÍ cubre la landing (this repo)

- Mensaje honesto: «la IA asiste, no decide», con revisión humana y separación hechos/inferencias/recomendaciones (Hero, `disclaimers`).
- Aviso de que LICITATIS **no garantiza la adjudicación**.
- Enlace a la política de privacidad (con HubSpot como encargado).

**Pendiente en la landing** (recomendado, no bloqueante técnico): una sección propia «Cómo usamos la IA» que enlace a esta información. Estado: `Pendiente`.

## Qué debe implementar la APP (por tarea de IA)

Para cada función asistida por IA, la app debe informar de forma clara y accesible:

| Tarea de IA | Debe informar | Estado |
|---|---|---|
| Chat con el expediente | Que se interactúa con un sistema de IA; posibilidad de error; citar fuente (documento/página) | Pendiente rev. jurídica (app) |
| Análisis del pliego / go-no-go | Que es una recomendación asistida, no una decisión; confianza; revisión humana obligatoria | Pendiente (app) |
| Resumen automático | Que es generado por IA y puede omitir/errar; prevalece el pliego oficial | Pendiente (app) |
| Memoria técnica asistida | Que el contenido es un borrador basado en la evidencia del usuario; la IA no inventa capacidades | Pendiente (app) |
| Recomendaciones / escenarios económicos | Que son estimaciones, no asesoramiento; revisión humana | Pendiente (app) |
| Exportaciones (informe a dirección) | Marcar el contenido generado por IA como tal | Pendiente (app) |

## Requisitos transversales para la app

1. **Marcado de contenido generado por IA** (art. 50 Reglamento IA) — decisión jurídica sobre alcance y forma.
2. **Datos que se envían a proveedores de IA**: qué proveedor, qué región, qué se envía, base jurídica y garantías (SCC/DPF). Documentar en la privacidad de la app y en la lista de subencargados.
3. **Ausencia de decisiones automatizadas con efecto jurídico** (art. 22 RGPD): confirmar que ninguna adjudicación/exclusión se decide automáticamente; siempre hay revisión humana.
4. **Diferenciación hechos / inferencias / recomendaciones** en la propia interfaz.
5. **Canal de contacto** para dudas sobre el uso de IA.

## Acción del propietario

Trasladar esta tabla al backlog de la app y obtener revisión jurídica del alcance del art. 50 antes de la apertura pública del SaaS.

---

## Adenda 25/08/2026 — el Reglamento de IA ya es aplicable, y hay una fecha límite

Investigación completa y fuentes en `NORMATIVA-2026.md`.

**Estado a hoy.** El Reglamento (UE) 2024/1689, modificado por el **Reglamento (UE) 2026/1744**
(Ómnibus digital de IA, en vigor desde el 27/07/2026), es **aplicable desde el 2 de agosto de 2026**.
Las obligaciones de alto riesgo se aplazaron al 02/12/2027 (anexo III) y 02/08/2028 (anexo I), y en
cualquier caso **LICITATIS no está en el anexo III**: preparar licitaciones no es ninguna de sus ocho
categorías cerradas.

**Lo que sí toca, y tiene reloj:**

| Qué | Dónde | Cuándo |
|---|---|---|
Avisar de que se interactúa con un sistema de IA (art. 50.1) | Primera pantalla de cada función conversacional, **en la app** | Ya aplica |
Marcar el contenido generado en formato legible por máquina (art. 50.2) | Exportaciones de la app (DOCX/PDF): resúmenes de pliegos y borradores de memoria | **2 de diciembre de 2026** si la beta ya estaba en el mercado antes del 02/08/2026 |
Información clara y accesible en la primera interacción (art. 50.5) | En pantalla, no enterrada en los términos | Ya aplica |
Alfabetización en IA del equipo (art. 4) | Registro interno fechado | Ya aplica |

**Tres avisos que evitan trabajo mal dirigido:**

1. **La excepción B2B del art. 50.2 no sirve aquí.** Exige que la salida no esté destinada a salir de
   la organización. Una memoria técnica se presenta al órgano de contratación: sale por diseño. Si
   alguien propone ampararse en ella, conviene tener la decisión contraria documentada por escrito.
2. **Traducir no obliga a marcar; resumir sí.** Las directrices definitivas de la Comisión
   (20/07/2026) movieron la traducción automática a «edición estándar». El resumen y la reescritura
   sustantiva siguen dentro.
3. **La web no puede sustituir al aviso in-app.** Un párrafo en `/ia` no satisface el art. 50.5.

**Y una precisión sobre el riesgo:** España todavía no tiene en vigor el régimen sancionador del
Reglamento de IA (el proyecto de ley orgánica que designa a la AESIA sigue en tramitación a
25/08/2026). La obligación es exigible; la multa nacional, hoy sin cauce. Eso no es una razón para
no marcar antes de diciembre, pero sí ordena las prioridades.
