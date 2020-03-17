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

const cuitValidator = async (res, cuit) => {

    logger.silly('Entrando a la validacion del Cuit');
    
    if(!cuit || cuit === ''){
        logger.silly('Primer if validar cuit');
        return res.status(400).json("El Cuit es invalido");
    }
    else if(cuit.length != 11){
        console.log(cuit)
        logger.silly('Entrando a la validacion Error 400');
        // throw new Error('El CUIT es invalido', 400);
        return res.status(400).json({ message:'El CUIT es invalido',
        error: true });

    }else if (cuit === '11111111111'){
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        // throw new Error("CUIT no valido como empresa", 400);
        return res.status(400).json({ message:'CUIT no valido como empresa',
        error: true });

    }else if (cuit === '222222222222'){
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        // throw new Error( 'Servicio del grupo no disponible', 504);
        return res.status(504).json({ message:'Servicio del grupo no disponible',
        error: true });

    }else {
        logger.silly('Else respuesta mock OK');
        return res.status(200).json({
            error:false,
            cuit: cuit,
            message: "OK"
        });

    }

}


// -----> POST Service  inscription Validation ####

const enrollmentValidation =  async (res, formData) => {

    logger.silly('Etrandoa la validacion dela inscripcion');

    if(typeof formData === "string"){
        formData = JSON.parse(formData);
    }
    const { cuit } = formData;

    if (cuit.length != 11){
        logger.silly('Etrandoa la validacion Error 400');
        // throw new Error('El CUIT es invalido', 400);
        return res.status(400).json({ message:'El CUIT es invalido',
        error: true });
        

    }else if (cuit === '11111111111'){
        logger.silly('Entrando a la validacion 11111111111 error Cuit no valido');
        // throw new Error("CUIT no valido como empresa", 400);
        return res.status(400).json({ message:'Inscripcion no valida para empresa',
        error: true });

    }else if (cuit === '222222222222'){
        logger.silly('Enrando a la validacion 22222222222 error Cuit no valido');
        //throw new Error( 'Servicio del grupo no disponible', 504)
        return res.status(504).json({ message:'Servicio del grupo no disponible',
        error: true });

    }else {
        logger.silly('La inscripcion a sido validada mock OK');
        return res.status(200).json({
            error:false,
            cuit: cuit,
            message: "OK"
        });
    }

}


module.exports = {
    getData,
    cuitValidator,
    enrollmentValidation

};