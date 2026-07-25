#!/bin/sh
# Limpia y valida HOSTINGER_DEPLOY_PATH. Es una PISTA, no la verdad: el docroot
# real lo decide la sonda HTTP del workflow contra el propio servidor.
#
# Contrato:
#   - Lee la variable de entorno DEPLOY_PATH (no por argumento: un secreto en la
#     línea de órdenes queda visible en la lista de procesos del runner).
#   - stdout: la ruta ya limpia SI es utilizable; vacío si no lo es.
#   - stderr: una explicación de por qué no lo es, sin imprimir el valor.
#   - Código de salida SIEMPRE 0: quien llama decide si eso es un aviso o un error.
#
# Se puede probar en local:
#   DEPLOY_PATH='"~/public_html" ' sh scripts/normalize-deploy-path.sh
#
# Tolera lo que trae un copiado real (el mismo valor mal pegado, no otro valor):
# retornos de carro, espacios y tabuladores alrededor, comillas envolventes y una
# barra final de más. No tolera lo que sí sería otro valor: $HOME, barras
# invertidas, dos puntos, punto y coma, caracteres no ASCII, o una ruta que no
# termine en /public_html.

set -eu

value="$(printf '%s' "${DEPLOY_PATH:-}" | tr -d '\r\n')"

trim() {
  # Espacios y tabuladores por delante y por detrás.
  v="$1"
  v="${v#"${v%%[![:space:]]*}"}"
  v="${v%"${v##*[![:space:]]}"}"
  printf '%s' "$v"
}

value="$(trim "$value")"

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

value="$(trim "$value")"
value="${value%/}"

# Vacío: no hay pista. No es un error — el workflow detectará el docroot.
if [ -z "$value" ]; then
  exit 0
fi

# Juego de caracteres. El diagnóstico dice QUÉ CLASE sobra: decir solo «caracteres
# no permitidos» obliga a adivinar, y adivinar cuesta otra ejecución en rojo.
case "$value" in
  *[!A-Za-z0-9_./~-]*)
    why=""
    case "$value" in *[[:space:]]*) why="$why espacios o tabuladores;" ;; esac
    case "$value" in *'"'* | *"'"*) why="$why comillas;" ;; esac
    case "$value" in *'$'*) why="$why el símbolo \$ (no uses \$HOME);" ;; esac
    case "$value" in *'\'*) why="$why barras invertidas;" ;; esac
    case "$value" in *:*) why="$why dos puntos;" ;; esac
    case "$value" in *';'*) why="$why punto y coma;" ;; esac
    if [ -z "$why" ]; then
      why=" algún carácter no ASCII (guion largo, espacio duro o comilla tipográfica, típicos de pegar desde un documento);"
    fi
    printf 'tiene caracteres no permitidos:%s longitud tras limpiarlo: %s (una ruta como "~/public_html" son 14 caracteres).' "$why" "${#value}" >&2
    exit 0
    ;;
esac

# Forma. Solo los dos docroots que LICITATIS puede usar.
case "$value" in
  /*/public_html | "~/public_html" | "~/domains/licitatis.es/public_html")
    printf '%s' "$value"
    ;;
  *)
    printf 'debe terminar exactamente en /public_html. Formas válidas: "~/public_html" o "/home/USUARIO/public_html".' >&2
    ;;
esac
