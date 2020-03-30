# Manual de deploy

## Introducción

Esta aplicación es una API Rest. Cumple la función del componente principal para el patron BFF (Backend for frontend) para los micrositios del banco Entre Rios.
La app usa una base de datos no relacional (MongoDB) y consume servicios backend ya sea Rest y/o Soap del banco Entre Rios.

## Acerca del código

La applicación está hecho desde cero. El stack tecnológico es full Javascript con [NodeJS](https://nodejs.org).

El proyecto utiliza las siguientes dependencias(librerias) fundamentales para la solución:

* [**N**ode.js](https://nodejs.org): runtime environment
* [**E**xpress.js](http://expressjs.com): backend framework
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database


## Setup 

### Prerequisitos

1. Instalar [Node.js](https://nodejs.org)
2. Instalar [MongoDB](https://www.mongodb.com) y levantar el servicio mongod

### Intalando dependencias (librerias)

Primero, ingresar a la carpeta base del directorio del proyecto:

```sh
$ cd banco-entre-rios
```
Segundo, instalar dependencias

```sh
$ npm install
```
### Configuración de propiedades

En la base del directorio del proyecto se puede encontrar el archivo `.env` con propiedades de entorno de la aplicación.

En este directorio puede configurar: 
* Ambiente
* Mongo uri
* Puerto de la aplicación
* Nivel de log

        # Env
        NODE_ENV='development'

        # MongoDB
        MONGODB_URI='mongodb://localhost/test'

        # Port
        PORT=3000

        # Log 
        LOG_LEVEL='debug'

#### Consideraciones de propiedades

###### Env
Cambiar valor a `production`.

###### MongoDB
Cambiar valor a uri de producción incluyendo las credenciales.

###### Port
Cambiar valor al puerto deseado.

###### Log
Para producción se recomiendo dejar el nivel de log en info o error.

## Corriendo la aplicación

```sh
$ node src
```
Con la configuración de propiedades por defecto, la aplicación levantará en el puerto 3000.

`http://localhost:3000`

*En el proxy reverso se deberá agregar una nueva regla con la URL de la aplicación incluyendo el puerto.*

### Monitoreo de aplicación viva

La app posee dos endpoints que responden un http status code: `200` para monitorear si ésta está viva.

`GET: http://localhost:3000/status`
`HEAD: http://localhost:3000/status`

### Logs de la aplicación

Si la app esta levantada con `NODE_ENV=production` escribirá los logs en logs/app.log dentro del directorio base del proyecto.

Estos logs se escribirán en un formato JSON determinado para poder ser tomados con herramientas como [Logstash](https://www.elastic.co/logstash)

    {
        "message":"✌️ DB loaded and connected!",
        "level":"info",
        "timestamp":"2020-03-17 14:30:25"
    }

## Última pieza sugerida

La última pieza sugerida es una forma confiable de ejecutar aplicaciones Node.js en ambientes productivos. 

[PM2](https://pm2.keymetrics.io/) es un administrador de procesos de Node.js, se puede usar para mantener las aplicaciones en ejecución. Instalar pm2 con npm:

```sh
$ npm install -g pm2
```

Una vez instalado, se podrán utilizar los siguientes comandos para administrar los procesos:

```sh
$ pm2 start src # inicia la aplicación Node.js
$ pm2 stop # detiene un proceso en ejecución
$ pm2 restart # reinicia un proceso en ejecución
$ pm2 list # enumera todos los procesos en ejecución
```
    
## Corriendo la app con Docker

El proyecto esta preparado para ser levantado con Docker en caso de ser necesario.

### Prerequisitos

1. Install [Docker](https://www.docker.com/)  
2. Install [Docker-compose](https://docs.docker.com/compose/install/)  

### Inicio

Un comando hará todo lo necesario, incluida la creación y mantenimiento de los servicios:

```sh
$ docker-compose up
```

Cuando vea que la consola indica que todo se ha creado y está listo, se podrá verificar el estado de la api en [http://localhost:3000/status](http://localhost:3000/status).

En el archivo ` docker-compose.yml` se prodrá cambiar la configuración de los puertos, tando de la imagen de la api como la del MongoDB.