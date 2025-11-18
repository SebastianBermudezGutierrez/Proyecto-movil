FROM node:18-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Generar Prisma Client y construir la aplicación
RUN sh -c 'DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy npx prisma generate && npm run build'

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["sh", "-c", "node dist/main"]