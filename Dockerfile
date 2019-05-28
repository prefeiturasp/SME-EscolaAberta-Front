FROM node:8.11.2
RUN mkdir -p /opt/services/front/src
WORKDIR /opt/services/front/src
COPY . /opt/services/front/src
RUN rm -rf /usr/share/nginx/html/*
RUN npm install react-scripts --save
RUN npm run-script build
