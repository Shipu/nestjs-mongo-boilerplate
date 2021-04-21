FROM node:14-alpine

LABEL VERSION 1.0

WORKDIR /opt/app

RUN apk update && apk add yarn

COPY package.json .
RUN yarn

COPY . .

RUN yarn run prebuild

RUN yarn run build

ENTRYPOINT yarn nest info && yarn run start:dev