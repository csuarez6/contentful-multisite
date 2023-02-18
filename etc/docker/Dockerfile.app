##### Building Base image #####
FROM node:16-alpine as base

## Install util packages
RUN apk add --update --no-cache vim

## Install contenful cli
RUN npm install -g contentful-cli pnpm

RUN mkdir -p /app
WORKDIR /app

## Copy package files
COPY pnpm-lock.yam[l] package.json /app/

## Install packages
RUN pnpm install

## Copy config files
COPY tailwind.config.js postcss.config.js next* *.json sentry* tsconfig.json middleware.ts /app/

## Copy project files
# COPY components /app/components
COPY src /app/src
COPY pages /app/pages
COPY public /app/public
COPY styles /app/styles

EXPOSE 3000 9229

FROM base as dev

CMD [ "pnpm", "dev" ]

FROM base as prod

ENV NODE_ENV=production

ARG CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT

ARG CONTENTFUL_SPACE_ID
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID

ARG CONTENTFUL_DELIVERY_API_TOKEN
ENV CONTENTFUL_DELIVERY_API_TOKEN=$CONTENTFUL_DELIVERY_API_TOKEN

ARG CONTENTFUL_PREVIEW_API_TOKEN
ENV CONTENTFUL_PREVIEW_API_TOKEN=$CONTENTFUL_PREVIEW_API_TOKEN

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

RUN pnpm build
CMD [ "pnpm", "start" ]
