# LICITATIS — Qué normativa aplica a la web comercial (25 de agosto de 2026)

Investigación con fuentes oficiales para cerrar los textos legales. Cubre **la web comercial**
(`licitatis.es`); lo que corresponde a la **aplicación** (`app.licitatis.es`) o a la **empresa** se
marca como tal, porque confundirlos es la forma más rápida de escribir obligaciones que no tocan y
omitir las que sí.

> Este documento **no es asesoramiento jurídico**. Reúne normas, fechas y fuentes para que quien
> asesore trabaje sobre algo concreto. La web no afirma en ningún texto que «cumpla» ninguna norma:
> describe lo que hace.

## 1. Lo que sí aplica a esta web

| Norma | Desde | Qué exige aquí |
| --- | --- | --- |
| **LSSI-CE** (Ley 34/2002), art. 10 | vigente | Identificación del prestador: denominación, NIF, domicilio, contacto y datos registrales. Publicado en `/aviso-legal` |
| LSSI-CE, art. 10.1.f | vigente | Códigos de conducta a los que se esté adherido. Se declara expresamente que no hay ninguno |
| LSSI-CE, art. 22.2 | vigente | Consentimiento informado antes de instalar cookies no necesarias |
| LSSI-CE, art. 21 | vigente | Comunicaciones comerciales solo con consentimiento previo. Casilla opcional, nunca premarcada |
| **RGPD**, arts. 13-14 | 25/05/2018 | Información en dos capas: la breve junto al formulario, el detalle en `/privacidad` |
| RGPD, art. 28 | 25/05/2018 | Contrato de encargo con HubSpot; el nuestro con clientes, en `/acuerdo-tratamiento-datos` |
| RGPD, arts. 44-46 | 25/05/2018 | Base de la transferencia a HubSpot: adecuación (DPF) y cláusulas contractuales tipo |
| **Decisión (UE) 2023/1795** (EU-US Data Privacy Framework) | 10/07/2023 | Marco de adecuación vigente. El Tribunal General **desestimó** el recurso Latombe el 03/09/2025; queda recurso pendiente ante el TJUE (C-703/25 P) |
| **Guía de cookies de la AEPD** (versión vigente; actualizada tras las directrices del CEPD) | exigible desde 11/01/2024 | Rechazar tan fácil como aceptar, granularidad, información por capas, retirada sencilla |
| **Directrices 2/2023 del CEPD** (ámbito técnico del art. 5.3 ePrivacy) | 07/10/2024 | El almacenamiento local (p. ej. la preferencia de tema) entra en el mismo régimen que las cookies |
| **Reglamento de IA** (UE) 2024/1689, modificado por el **(UE) 2026/1744** | 02/08/2026 | Aplicable ya. Sus deberes de transparencia operan **en la aplicación**, no en esta web |
| **Data Act** (UE) 2023/2854, art. 28 | 12/09/2025 | **Publicar en la web** la jurisdicción de la infraestructura y las medidas frente a accesos o transferencias de datos no personales contrarios al Derecho de la Unión. Publicado en `/seguridad-y-privacidad` |

## 2. Lo que NO aplica (y conviene no copiar de plantillas)

| Norma | Por qué no |
| --- | --- |
| **Reglamento ePrivacy** | **No existe.** La Comisión retiró la propuesta en 2025. Rige el art. 22.2 LSSI-CE |
| **Privacy Shield** (Decisión 2016/1250) | Anulado por _Schrems II_ en 2020. Sigue apareciendo en políticas copiadas de internet |
| **DSA** (Reglamento (UE) 2022/2065) | Obliga a servicios intermediarios y plataformas. Una landing estática no lo es |
| **RD 1112/2018** de accesibilidad | Ámbito: sector público |
| **Directiva (UE) 2016/2102** | Ámbito: organismos del sector público |
| **Ley 11/2023** (Ley Europea de Accesibilidad) | Alcanza al comercio electrónico con **consumidores**. Aquí el servicio se ofrece en marco profesional y la contratación ocurre en la app |
| **RD 193/2023** | Su obligación para el sector privado se activa el **1/1/2029** |
| Art. 37 RGPD / art. 34 LOPDGDD (**DPD obligatorio**) | No hay tratamiento a gran escala ni observación sistemática. Confirmado por el propietario: no procede |
| Art. 27 RGPD (**representante en la UE**) | La sociedad es española |
| Art. 49 RGPD (excepciones de transferencia) | Es residual: hay adecuación y garantías |
| Reglamento de IA, cap. III y anexo III (**alto riesgo**) | Preparar licitaciones no está en las ocho categorías cerradas del anexo III |
| Reglamento de IA, art. 50.3 y 50.4 párr. 1 | Biometría, emociones y ultrafalsificaciones de imagen, audio o vídeo. Aquí solo hay texto |
| Reglamento de IA, cap. V (**modelos de uso general**) | Recae en quien provee el modelo, no en quien construye encima |
| Dictamen 8/2024 del CEPD («consentimiento o pago») | Su ámbito son las grandes plataformas en línea |
| Consent Mode v2 / IAB TCF | No son obligaciones legales, sino exigencias contractuales de Google |

## 3. Lo que corresponde a la aplicación, no a esta web

El Reglamento de IA es aplicable **desde el 2 de agosto de 2026**. Sus obligaciones de transparencia
se cumplen **dentro de la app**:

- Avisar de forma perceptible de que se está ante un sistema de IA, en la propia interfaz. Un
  párrafo en la web no sustituye ese aviso.
- Marcar como generado por IA el contenido sintético (resúmenes de pliegos, borradores de memoria).
  Los sistemas ya en el mercado antes del 02/08/2026 disponen de margen hasta el **02/12/2026**.
- Alfabetización en IA del equipo (art. 4): registro interno, no contenido de web.

Detalle y traspaso: `docs/SAAS-AI-TRANSPARENCY-HANDOFF.md`.

## 3.b Matices que conviene tener anotados

**El marcado de contenido generado tiene reloj.** El art. 50.2 del Reglamento de IA concede un
margen a los sistemas ya en el mercado antes del 02/08/2026: hasta el **2 de diciembre de 2026**
para marcar las salidas de forma legible por máquina. Afecta a la app, no a esta web.

**La excepción B2B del art. 50.2 no sirve aquí.** Exige, entre otras condiciones, que la salida
**no esté destinada a salir de la organización**. Una memoria técnica se presenta al órgano de
contratación: sale por diseño. Conviene dejarlo documentado por escrito, porque es justo el
argumento que puede llevar a no hacer nada antes de diciembre.

**Traducir no obliga a marcar; resumir sí.** Las directrices definitivas de la Comisión (20/07/2026)
movieron la traducción automática al grupo de «edición estándar». Los resúmenes de pliegos y los
borradores de memoria siguen exigiendo marcado.

**En España aún no hay régimen sancionador del Reglamento de IA.** El proyecto de ley orgánica que
designa a la AESIA y fija los tramos sigue en tramitación a 25/08/2026. La obligación es exigible;
la sanción nacional, todavía sin cauce. El riesgo inmediato de la web es de práctica comercial y
contractual, no de multa.

**El Data Privacy Framework está vigente, pero vigilado.** Además del recurso pendiente ante el
TJUE (C-703/25 P), la sentencia del Tribunal Supremo de EE. UU. de 29/06/2026 sobre la destitución
de comisionados de la FTC afecta a una de las premisas de la decisión de adecuación. Por eso los
textos **no se apoyan solo en el DPF**: citan también las cláusulas contractuales tipo, que
seguirían operando si la adecuación decayera.

**El Ómnibus de datos (cookies) es todavía una propuesta.** No hay que adaptar nada del banner:
cualquier cambio en esa dirección hoy sería prematuro.

## 4. Decisiones tomadas al cerrar los textos

Son decisiones de negocio, no de norma. Se listan para poder cambiarlas sabiendo qué se cambia.

| Decisión | Valor | Por qué |
| --- | --- | --- |
| Versión y fecha de los siete documentos | 1.0 · 25/08/2026 | Se publican juntos por primera vez |
| Conservación de leads sin relación posterior | 12 meses desde el último contacto | Plazo en que una conversación comercial puede retomarse |
| Conservación de la prueba del consentimiento | 3 años | Prescripción del art. 1964.2 del Código Civil |
| Fuero para empresas y profesionales | Valencia | Domicilio social. No se aplica a consumidores |
| Desistimiento | 14 días naturales para consumidores | Se preserva aunque el servicio se dirija a empresas |
| Devolución o supresión al terminar el encargo | 30 días | Plazo operativo razonable |
| Caducidad del consentimiento de cookies | 180 días | Más estricto que el criterio de referencia habitual |
| Páginas legales indexables | Aviso legal, privacidad, cookies y términos | Un aviso legal que no se encuentra cumple peor su función. Seguridad, DPA y subencargados siguen fuera del índice: se entregan a quien contrata |

## 5. Pendiente, y es del propietario

1. **Configurar HubSpot** (`NEXT_PUBLIC_HUBSPOT_PORTAL_ID` y `_FORM_ID`). Es el único bloqueante que
   queda en el gate de producción y, sobre todo, sin él **el formulario no entrega leads**: muestra
   el canal de correo alternativo.
2. **Confirmar la región del portal de HubSpot** (Configuración → Valores predeterminados →
   Alojamiento de datos). Los textos cubren las dos posibilidades; con el dato se puede afinar.
3. **Revisión profesional del DPA** (`/acuerdo-tratamiento-datos`): es el único documento que es un
   **contrato** y no un texto informativo.
4. **Tomo y folio** del Registro Mercantil, si la asesoría los facilita. La hoja V-231948 ya
   identifica la sociedad, pero el dato completo es más limpio.
5. **Confirmar que no hay adhesión a códigos de conducta**, que es lo que ahora se declara.

## Fuentes

- [Ley 34/2002 (LSSI-CE), texto consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)
- [RGPD, texto consolidado](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504)
- [Decisión de Ejecución (UE) 2023/1795 (Data Privacy Framework)](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023D1795)
- [Tribunal General, asunto Latombe (T-553/23), 03/09/2025](https://curia.europa.eu/juris/liste.jsf?num=T-553/23)
- [Guía sobre el uso de cookies, AEPD (mayo 2024)](https://www.aepd.es/guias/guia-cookies.pdf)
- [Reglamento (UE) 2024/1689 de Inteligencia Artificial](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689)
- [Reglamento (UE) 2026/1744 (Ómnibus digital de IA), en el BOE](https://www.boe.es/buscar/doc.php?id=DOUE-L-2026-81147)
- [Ley 11/2023 (accesibilidad; transposición de la Directiva (UE) 2019/882)](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022)
- [Cookies que instala HubSpot](https://knowledge.hubspot.com/reports/what-cookies-does-hubspot-set-in-a-visitor-s-browser)
- [Política de privacidad de HubSpot](https://legal.hubspot.com/privacy-policy) · [Acuerdo de tratamiento de datos](https://legal.hubspot.com/dpa)
- [Alojamiento de datos de HubSpot](https://knowledge.hubspot.com/account-security/hubspot-cloud-infrastructure-and-data-hosting-frequently-asked-questions)
