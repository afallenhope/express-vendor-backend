FROM node:20-alpine AS base

ARG PNPM_VERSION=8.3.1
ARG SERVER_PORT=3000

ENV SERVER_PORT=${SERVER_PORT}

RUN npm install -g pnpm@${PNPM_VERSION}
WORKDIR /opt/server

FROM base AS dev
COPY ./pnpm-lock.yaml .

RUN set -eux; \
  apk add --no-cache \
   git \
   python3 \
   make \
  g++ \
  rm -rf  /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && \
  pnpm fetch
COPY . .
RUN pnpm install --frozen-lockfile \ 
  && \
  pnpm run build

EXPOSE ${SERVER_PORT} ${SERVER_PORT}
CMD ["node","dist/index.js"]
