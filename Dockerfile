FROM node:14-alpine

LABEL VERSION 1.0

WORKDIR /opt/app

RUN apk update && apk add yarn

COPY package.json .
RUN yarn

COPY . .

ENTRYPOINT yarn run start:dev