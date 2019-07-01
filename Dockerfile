FROM node:8.11.2 as react-build
WORKDIR /app
COPY . ./
RUN yarn install --check-files
RUN yarn build

FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
