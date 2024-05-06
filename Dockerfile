FROM oven/bun:1 as base

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

RUN bunx --bun vite build

EXPOSE 3000

CMD [ "bunx", "--bun", "serve", "-s", "dist" ]