# syntax=docker/dockerfile:1

FROM node:18.12.1-alpine AS base
WORKDIR /usr/src/app
EXPOSE 3000

FROM base AS dev
CMD ["sh", "-c", "npm install && npm start"]

FROM base-with-deps AS build
RUN npm build

# The next stages are used for Compose Watch
#
# The intent here is to create an image that has everything needed
# to run our dev environment with an image that already has all of
# the dependencies and source code bundled in. Compose Watch will
# then sync in the changes as they occur.
FROM base AS base-with-deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY ./public ./public
COPY ./src ./src

FROM base-with-deps AS dev-watch
CMD ["npm", "start"]

# The final stage that will extract the HTML, CSS, JS from the build
# and serve it using nginx
FROM nginx:alpine AS final
COPY --from=build /usr/src/app/build /usr/share/nginx/html
