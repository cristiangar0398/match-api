# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Instala dependencias necesarias para el build
COPY package*.json ./
RUN npm install

# Copia todo el código fuente y construye el proyecto
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Instala solo las dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/build ./build

# Exponer el puerto que la aplicación usa
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "build/app.js"]
