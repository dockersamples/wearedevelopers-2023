# syntax=docker/dockerfile:1

FROM node:18.12.1-alpine AS base
WORKDIR /usr/src/app
EXPOSE 3030

FROM base AS dev
CMD ["sh", "-c", "npm install && npm run dev"]

FROM base AS build
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node
COPY ./src ./src
CMD node src/index.js
