FROM node:14
WORKDIR /usr/local/src

COPY . .

RUN npm ci

COPY ./docker/root /

ENTRYPOINT ["/entrypoint.sh"]
