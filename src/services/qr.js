const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');


// -----> GET Services Cuil data  ####
const getCuil = async () => {
    logger.silly('Obteniendo Cuil');
    const { respuestaCuil } = fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'));
    return JSON.parse(respuestaCuil);
}

// -----> GET Service Maritral State  ####
const getMaritalState = async () => {
    logger.silly('Obteniendo los datos de estados civiles');
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaEstadoCivil;
    return data;
}


// -----> GET Service Countires ####
const getCountries = async () => {
    logger.silly('Obteniendo los datos de paises');
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaPaises;
}


// -----> GET Service Validation Birth Day  ####
const getValidateBirdtDay = async () => {
    logger.silly('Obteniendo los datos de fecha de nacimiento');
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);
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
    getValidateBirdtDay,
    getLocalities

};