# ---------- build ----------
FROM node:24-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /app

COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build \
 && npm prune --omit=dev \
 && npx prisma version

# ---------- runtime ----------
FROM node:24-alpine AS runtime
RUN apk add --no-cache openssl
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/package.json /app/prisma.config.ts ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/database/seed/main.js && exec node dist/main.js"]