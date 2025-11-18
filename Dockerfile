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

# Verificar estructura
RUN ls -la dist/

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main"]