const axios = require('axios');
const fs = require("fs");
const logger = require('../loaders/logger');
const path = require('path');


// -----> GET Service  ####

const getData =  async () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);
}


// -----> POST Service  CUIT Validation ####

const cuitValidator = async (cuit) => {

    logger.silly('Etrandoa la validacion del Cuit');
    const data = cuit;

    if(!data){
        logger.silly('Primer if validar cuit');
        return res.status(400).json("El Cuit es invalido");
    }

    if (data.cuit.length != 11){
        logger.silly('Etrandoa la validacion Error 400');
        throw new Error('El CUIT es invalido', 400);

    }else if (data.cuit === '11111111111'){
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        throw new Error("CUIT no valido como empresa", 400);

    }else if (data.cuit === '222222222222'){
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        throw new Error( 'Servicio del grupo no disponible', 504)

    }else {
        logger.silly('ELse respuesta mock OK');
        return res.status(200).json(data);

    }

}


// -----> POST Service  inscription Validation ####

const enrollmentValidation =  async (formData) => {

    logger.silly('Etrandoa la validacion dela inscripcion');
    const data = formData;

    if(!data){
        return data = JSON.stringify(data);
    }



    if (data.length != 11){
        logger.silly('Etrandoa la validacion Error 400');
        throw new Error('El CUIT es invalido', 400);

    }else if (data === '11111111111'){
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        throw new Error("CUIT no valido como empresa", 400);

    }else if (data === '222222222222'){
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        throw new Error( 'Servicio del grupo no disponible', 504)

    }else {
        logger.silly('Else respuesta mock OK');
        return res.status(200).json("OK");
    }

}


module.exports = {
    getData,
    cuitValidator,
    enrollmentValidation
};