# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Generar Prisma Client con una URL temporal
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL:-postgresql://user:password@localhost:5432/db}
RUN npx prisma generate
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]