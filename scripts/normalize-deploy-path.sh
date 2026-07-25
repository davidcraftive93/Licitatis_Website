#!/bin/sh
# Normaliza HOSTINGER_DEPLOY_PATH y lo imprime por stdout.
#
# Lee la variable de entorno DEPLOY_PATH (no se pasa por argumento: un secreto en
# la línea de órdenes queda visible en la lista de procesos del runner).
#
# Existe porque DOS pasos del workflow de despliegue leen el mismo secreto, y si
# cada uno lo limpiaba a su manera acababan comparando valores distintos. Aquí se
# limpia una sola vez y se puede probar en local:
#
#   DEPLOY_PATH='"~/public_html" ' sh scripts/normalize-deploy-path.sh
#
# Qué tolera (todo esto es el MISMO valor mal pegado, no otro valor):
#   - retornos de carro y saltos de línea
#   - espacios y tabuladores alrededor
#   - comillas envolventes, simples o dobles
#   - una barra final de más
#
# Qué NO hace: validar. De eso se encarga el workflow, que exige el juego de
# caracteres permitido y que el destino sea uno de los docroots autorizados.

set -eu

value="$(printf '%s' "${DEPLOY_PATH:-}" | tr -d '\r\n')"

# Espacios y tabuladores por delante y por detrás.
value="${value#"${value%%[![:space:]]*}"}"
value="${value%"${value##*[![:space:]]}"}"

# Comillas envolventes (solo si abren y cierran).
case "$value" in
  '"'*'"')
    value="${value#\"}"
    value="${value%\"}"
    ;;
  "'"*"'")
    value="${value#\'}"
    value="${value%\'}"
    ;;
esac

# Vuelve a recortar: '  "~/public_html"  ' deja espacios dentro de las comillas.
value="${value#"${value%%[![:space:]]*}"}"
value="${value%"${value##*[![:space:]]}"}"

# Barra final.
value="${value%/}"

printf '%s' "$value"
