const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');


// -----> GET Service  ####

const getData = async () => {
    logger.silly('Obteniendo los datos del archivo mock');
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.json'));
    return JSON.parse(data);
}


// -----> POST Service  CUIT Validation ####

const cuitValidator = async (cuit) => {
    logger.silly(CodeError);
    logger.silly(`Entrando a la validacion del CUIT: ${cuit}`);

    let resp = {
        isValid: false,
        isMonotributista: false,
        isCompany: false
    }

    if (!cuit || cuit === '' || cuit.length != 11) {
        logger.silly('CUIT invalido');
        throw new CodeError('El Cuit es invalido', 400, resp);
    } else if (cuit === '11111111111') {
        logger.silly('CUIT no valido como empresa');
        throw new CodeError("CUIT no valido como empresa", 400, resp);
    } else if (cuit === '22222222222') {
        logger.silly('Servicio del grupo no disponible');
        throw new CodeError('Servicio del grupo no disponible', 504, resp);
    } else if (cuit === '33333333333') {
        logger.silly('CUIT valido y es monotributista');
        resp.isValid = true;
        resp.isMonotributista = true;
        return resp;
    } else {
        logger.silly('CUIT valido y es empresa');
        resp.isValid = true;
        resp.isCompany = true;
        return resp;
    }
}


// -----> POST Service  inscription Validation ####

const enrollmentValidation = async (formData) => {
    logger.silly('Entrando a la validacion de la inscripcion');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }

    const { nombreApellido } = formData;
    logger.silly(`Nombre ${nombreApellido}`);

    if (nombreApellido === 'Pepe Argento') {
        logger.silly('Entrando a la validacion Pepe Argento');
        throw new CodeError("Dato de entrada incorrecto", 400, formData);
    } else if (nombreApellido === 'Moni Argento') {
        logger.silly('Enrando a la validacion Moni Argento');
        throw new CodeError('Servicio del grupo no disponible', 504, formData)
    } else {
        logger.silly('La inscripcion a sido validada. Mock OK');
        return formData;
    }

}


module.exports = {
    getData,
    cuitValidator,
    enrollmentValidation
};