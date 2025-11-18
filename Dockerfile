FROM node:18-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["sh", "-c", "npx prisma generate && node dist/main"]