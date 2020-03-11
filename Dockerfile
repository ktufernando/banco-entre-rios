# Imagen base
FROM node:latest

# Directorio de la app
WORKDIR /app

# Copiado de archivos
ADD . /app

# Dependencias
RUN npm install

# Puerto
EXPOSE 5000

# Comandos
CMD ["npm", "run", "start"]