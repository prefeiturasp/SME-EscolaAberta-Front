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

exec "$@"