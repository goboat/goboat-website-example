FROM node:16-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY *.json ./
RUN npm ci

COPY next-env.d.ts ./
COPY next.config.js ./
COPY ./pages ./pages
COPY ./public ./public
COPY ./styles ./styles
COPY ./components ./components
COPY ./sub-components ./sub-components
COPY ./hooks ./hooks
COPY ./lib ./lib
COPY ./goboat-pages ./goboat-pages
COPY .env.development .

ENV PORT 3000

CMD ["./node_modules/.bin/next", "start"]
