const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const fs = require("fs");
const path = require('path');
const moment = require('moment');


// -----> GET Services Cuil data  ####
const getCuil = async (dni) => {
    logger.silly('Obteniendo dni en TCMA');
    
    let resp = {
        isValid: false,
    }
    
    if (!dni || dni === '' || dni.length != 8){
        logger.silly('Error de Cuil invalido');
        throw new CodeError('El dni es invalido', 400, resp);
    } else if (dni === '11111111') {
        logger.silly('dni valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaCuil;
    } else if (dni === '22222222') {
        logger.silly('Servicio no disponible');
        throw new CodeError('Servicio no disponible');
    }

}


// -----> GET Service Countries ####
const getCountries = async () => {
    logger.silly('Obteniendo los datos de paises en tcma');
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaPaises;
}


// -----> GET Service Activities ####
const getActivities = async (cuil) => {
    logger.silly('Obteniendo las Actividades en tcma');
    
    let resp = {
        isValid: false
    }
    
    if (!cuil || cuil === '' || cuil.length != 8){
        logger.silly('Error de invalido');
        throw new CodeError('El cuil es invalido', 400, resp);
    } else if (cuil === '11111111') {
        logger.silly('cuil valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaPaises;
    } else if (cuil === '22222222') {
        logger.silly('Servicio no disponible 504');
        throw new CodeError('Servicio no disponible');
    }

}


// -----> GET Service Marital State  ####
const getMaritalState = async () => {
    logger.silly('Obteniendo los datos de estados civiles en tcma');
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaEstadoCivil;
    return data;
}


// -----> GET Service Localities ####
const getLocalities = async (code) => {
    logger.silly('Obteniendo los datos de las localidades en tcma');

    let resp = {
        isValid: false
    }
    
    if (!code || code === '' || code.length != 4){
        logger.silly('Error Codigo Postal invalido');
        throw new CodeError('El Codigo Postal es invalido', 400, resp);
    } else if (code === '1426') {
        logger.silly('Codigo Postal valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaLocalidades;
    } else if (code === '2222') {
        logger.silly('Servicio no disponible');
        throw new CodeError('Servicio no disponible', 504);
    }
}


// -----> GET Service Validation Birth Day  ####
const getValidateBirthDay = async (applicantDayOfBirth) => {
    logger.silly('Tcma Validando la fecha de nacimiento: ', applicantDayOfBirth);

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


// -----> GET Services Validate Cuil  ####
const getValidateCuil = async (cuil) => {
    logger.silly('Validacion cuil de TCMA');
    
    let resp = {
        isValid: false
    }
    
    if (!cuil || cuil === '' || cuil.length != 8){
        logger.silly('Error de invalido');
        throw new CodeError('El Cuil es invalido', 400, resp);
    } else if (cuil === '11111111') {
        logger.silly('cuil valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tcmaDataMock.json'))).respuestaValidacionCuil;
    } else if (cuil === '22222222') {
        logger.silly('Servicio no disponible');
        throw new CodeError('Servicio no disponible');
    }

}


// -----> POST Service Validate Step 1 ####
const postStepOne = async (formData) => {
    logger.silly('Entrando a la validacion Step 1 tcma');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }
    const { nombre } = formData;

    if (nombre === 'Fernando') {
        logger.silly('Entrando a la validacion Fernando');
        throw new CodeError("Dato de entrada incorrecto", 400, formData);
    } else if (nombre === 'Julio') {
        logger.silly('Enrando a la validacion Julio');
        throw new CodeError('Servicio del grupo no disponible', 504)
    } else if(nombre === 'Luis'){
        logger.silly('Datos step 1 correctos. Mock OK');
        return formData;
    }

}


// -----> POST Service Validate Step 2 ####
const postSteptwo = async (formData) => {
    logger.silly('Entrando a la validacion Step 2 tcma');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }

    const { sexo } = formData;

    if (sexo === '1') {
        logger.silly('Entrando a la validacion step 2  sexo  1');
        throw new CodeError("Dato de entrada incorrecto", 400, formData);
    } else if (sexo === '2') {
        logger.silly('Entrando a la validacion step 2 de sexo 2. Mock "OK"');
        return formData
    }

}


// -----> POST Service Validate Step 3 ####
const postStepThree = async (formData) => {
    logger.silly('Entrando a la validacion Step 3 tcma');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }

    const { entregaCalle } = formData;
    logger.silly(`Calle de entrega ${entregaCalle}`);

    if (entregaCalle === '1111') {
        logger.silly('Entrando Error dato incorrecto');
        throw new CodeError("Dato de entrada incorrecto", 400, formData);
    } else if (entregaCalle === '2222') {
        logger.silly('Entrando Error Servicio no disponible');
        throw new CodeError('Servicio no disponible', 504, formData)
    } else if(entregaCalle === '3333'){
        logger.silly('Los datos step 3 son correctos. Mock OK');
        return formData;
    }

}


// -----> POST Service Validate Step 4 w/ additional card ####
const postStepFourWithCard = async (formData) => {
    logger.silly('Entrando a la validacion Step 4 con tarjeta adicional');
    if (typeof formData === "string") {
        formData = JSON.parse(formData);
    }

    const { nombreAdicional } = formData;
    logger.silly(`Nombre Adicional ${nombreAdicional}`);

    if (nombreAdicional === 'Franchesco') {
        logger.silly('Entrando a la validacion step 4 Franchesco');
        throw new CodeError("Dato de entrada incorrecto", 400, formData);
    } else if (nombreAdicional === 'Federico') {
        logger.silly('Enrando a la validacion step 4 Federico');
        throw new CodeError('Servicio del grupo no disponible', 504, formData)
    } else if(nombreAdicional === "Luis"){
        logger.silly('La inscripcion a sido validada. Mock OK');
        return formData;
    }

}

module.exports = {
    getCuil,
    getCountries,
    getActivities,
    getMaritalState,
    getLocalities,
    getValidateBirthDay,
    getValidateCuil,
    postStepOne,
    postSteptwo,
    postStepThree,
    postStepFourWithCard
};