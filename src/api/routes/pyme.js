const logger = require('../../loaders/logger');
const { cuitValidator, getData, enrollmentValidation } = require('../../services/pymeServices');
const { handleSuccessResponse } = require('../../utils/ResponseHandler');
const { Router } = require('express');
const router = Router();
const path = require('path');

module.exports = (app) => {
    app.use('/pyme', router);


    router.get('/datamock', (req,res) => {
        logger.silly('Obteniendo el archivo de mocks del filesystem');
        res.sendFile(path.resolve(__dirname, '../../data/dataMock.js'));
    });
    
    // --> GET
    router.get('/acaparaCreditos', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener los datos de los combos del formulario Pyme');
        try {
            res.status(200).json(handleSuccessResponse(await getData()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> POST ---> Cuit
    router.post("/verificarCuit", async (req, res, next) => {
        logger.silly(`Entrada de endpoint para verificar CUIT pyme con el request body: ${req.body}`);
        const cuit = req.body.cuit;
        try {
            res.status(200).json(handleSuccessResponse(await cuitValidator(cuit)));
        } catch (error) {
            next(error);
        }

    }); 
    
    // --> POST ---> Inscripcion
    router.post("/validarInscripcion", async (req, res, next) => {
        logger.silly(`Entrada de endpoint para validar inscripción pyme con el request body: ${req.body}`);
        const formData = req.body;
        try {
            res.status(200).json(handleSuccessResponse(await enrollmentValidation(formData)));
        } catch (error) {
            next(error);
        }
    }); 

};