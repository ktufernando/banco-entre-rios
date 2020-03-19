const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
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
    logger.silly(CodeError);
    logger.silly(`Entrando a la validacion del CUIT: ${cuit}`);

    let resp = {
        isValid: false,
        isMonotributista: false
    }

    if (!cuit || cuit === '' || cuit.length != 11) {
        logger.silly('CUIT invalido');
        throw new CodeError('El Cuit es invalido', 400, resp);
    } else if (cuit === '11111111111') {
        logger.silly('CUIT no valido como empresa');
        throw new CodeError("CUIT no valido como empresa", 404, resp);
    } else if (cuit === '22222222222') {
        logger.silly('Servicio del grupo no disponible');
        throw new CodeError('Servicio del grupo no disponible', 504, resp);
    } else if (cuit === '33333333333') {
        logger.silly('CUIT valido y es monotributista');
        resp.isValid = true;
        resp.isMonotributista = true;
        return resp;
    } else {
        logger.silly('CUIT valido pero no es monotributista');
        resp.isValid = true;
        return resp;
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
        throw new CodeError('El CUIT es invalido', 400);
    } else if (cuit === '11111111111') {
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        throw new CodeError("CUIT no valido como empresa", 400);
    } else if (cuit === '22222222222') {
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        throw new CodeError('Servicio del grupo no disponible', 504)
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