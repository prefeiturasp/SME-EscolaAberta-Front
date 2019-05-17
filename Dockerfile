FROM node:latest
CMD [ "npm", "run-scripts", "build" ]
COPY /build /usr/share/nginx/html
