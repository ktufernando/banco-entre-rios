const logger = require('../loaders/logger');
const ApplicationError = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');


// -----> GET Service  ####

const getData = async () => {
    logger.silly('Obteniendo los datos del archivo mock');
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);
}


// -----> POST Service  CUIT Validation ####

const cuitValidator = async (cuit) => {
    logger.silly('Entrando a la validacion del Cuit');
    if (!cuit || cuit === '') {
        logger.silly('Primer if validar cuit');
        throw new Error('El Cuit es invalido', 400);
    } else if (cuit.length != 11) {
        logger.silly('Entrando a la validacion Error 400');
        throw new Error('El CUIT es invalido', 400);
    } else if (cuit === '11111111111') {
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        throw new Error("CUIT no valido como empresa", 400);
    } else if (cuit === '222222222222') {
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        throw new Error('Servicio del grupo no disponible', 504);
    } else {
        logger.silly('Else respuesta mock OK');
        return cuit;
    }
}


// -----> POST Service  inscription Validation ####

const enrollmentValidation = async (formData) => {
    logger.silly('Etrandoa la validacion dela inscripcion');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }
    
    const { cuit } = formData;

    if (cuit.length != 11) {
        logger.silly('Etrandoa la validacion Error 400');
        throw new Error('El CUIT es invalido', 400);
    } else if (cuit === '11111111111') {
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        throw new Error("CUIT no valido como empresa", 400);
    } else if (cuit === '222222222222') {
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        throw new Error( 'Servicio del grupo no disponible', 504)
    } else {
        logger.silly('La inscripcion a sido validada mock OK');
        return formData;
    }

}


module.exports = {
    getData,
    cuitValidator,
    enrollmentValidation

};