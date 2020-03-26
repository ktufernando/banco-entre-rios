const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');
const moment = require('moment');


// -----> GET Services Cuil data  ####
const getCuil = async () => {
    logger.silly('Obteniendo Cuil');
    const { respuestaCuil } = fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'));
    return JSON.parse(respuestaCuil);
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