FROM node:14-alpine

WORKDIR /usr/local/src

RUN apk add --no-cache --update bash

COPY . .

RUN npm ci

COPY ./docker/root /

ENTRYPOINT ["/entrypoint.sh"]
