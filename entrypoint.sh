#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 -e API_URL="http://localhost:8000" -e SERVER_NAME="localhost" nomedaimagem:latest
#set -xe
#  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"

set -xe
  : "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

set -xe
  : "${SENTRY_URL?Precisa de uma variavel de ambiente SENTRY_URL}"


sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

sed -i "s,REPLACE_API_EOL,$API_EOL,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_API_RUA,$API_RUA,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_API_CEP,$API_CEP,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_API_NOMINATIM,$API_NOMINATIM,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_IDEP_LOGIN,$IDEP_LOGIN,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_USUARIO_RF,$USUARIO_RF,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_USUARIO_CPF,$USUARIO_CPF,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_USUARIO_MES,$USUARIO_MES,g" /usr/share/nginx/html/static/js/*.js
sed -i "s,REPLACE_USUARIO_ANO,$USUARIO_ANO,g" /usr/share/nginx/html/static/js/*.js
exec "$@"
