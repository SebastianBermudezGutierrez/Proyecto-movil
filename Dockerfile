FROM node:18-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar solo lo necesario
COPY prisma ./prisma
COPY src ./src
COPY nest-cli.json tsconfig*.json ./

# Generar Prisma Client
RUN npx prisma generate

# Instalar dependencias de desarrollo para el build
RUN npm install -g @nestjs/cli
RUN npm install --save-dev @types/node

# Construir
RUN npm run build

# Puerto expuesto
EXPOSE 3000

# Comando de inicio que ejecuta migraciones y luego inicia la app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]