FROM node:24-alpine3.24

ENV DATABASE_URL=file:./db.sqlite
ENV DISCORD_TOKEN=
ENV DISCORD_CLIENT=
ENV CONSOLA_LEVEL=info

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:migrate && npm run start"]
