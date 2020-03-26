const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');
const moment = require('moment');


// -----> GET Services Cuil data  ####
const getCuil = async (cuit) => {
    logger.silly('Obteniendo Cuil');
    const { respuestaCuil } = fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'));

    let resp = {
        isValid: false,
        cuit
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
        return resp;
    } else {
        logger.silly('CUIT valido pero no es monotributista');
        resp.isValid = true;
        return resp;
    }

}

// -----> GET Service Marital State  ####
const getMaritalState = async () => {
    logger.silly('Obteniendo los datos de estados civiles');
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaEstadoCivil;
    return data;
}


// -----> GET Service Countries ####
const getCountries = async () => {
    logger.silly('Obteniendo los datos de paises');
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaPaises;
}


// -----> GET Service Validation Birth Day  ####
const getValidateBirthDay = async (applicantDayOfBirth) => {
    logger.silly('Validando la fecha de nacimiento: ', applicantDayOfBirth);

    const date = moment(applicantDayOfBirth, "DD%2FMM%2FYYYY");

    let resp = {
        isValid: date.isValid()
    }

    if (resp.isValid) {
        if(date.isAfter(moment())){
            logger.silly('Fecha de nacimiento es mayor a la fecha actual');
            throw new CodeError('Fecha de nacimiento es mayor a la fecha actual', 400, resp);
        }
        return resp;
    } else {
        logger.silly('Fecha de nacimiento invalida');
        throw new CodeError('La fecha de nacimiento en invalida', 400, resp);
    }
}


// -----> GET Service Localities ####
const getLocalities = async () => {
    logger.silly('Obteniendo los datos de las localidades');
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);
}


module.exports = {
    getCuil,
    getMaritalState,
    getCountries,
    getValidateBirthDay,
    getLocalities

};