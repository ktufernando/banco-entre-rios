const logger = require('../../loaders/logger');
const { pymeService } = require('../../services');
const { handleSuccessResponse } = require('../../utils/ResponseHandler');
const { Router } = require('express');
const router = Router();
const path = require('path');

module.exports = (app) => {
    app.use('/pymes', router);


    router.get('/datamock', (req,res) => {
        logger.silly('Obteniendo el archivo de mocks del filesystem');
        res.sendFile(path.resolve(__dirname, '../../data/dataMock.json'));
    });
    
    // --> GET
    router.get('/credits', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener los datos de los combos del formulario Pyme');
        try {
            res.status(200).json(handleSuccessResponse(await pymeService.getData()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> GET ---> Cuit
    router.get("/validateCuit/:cuit", async (req, res, next) => {
        logger.silly(`Entrada de endpoint para verificar CUIT pyme con el request body: ${req.body}`);
        try {
            const cuit = req.params.cuit;
            res.status(200).json(handleSuccessResponse(await pymeService.cuitValidator(cuit)));
        } catch (error) {
            next(error);
        }

    }); 
    
    // --> POST ---> Inscripcion
    router.post("/validateSignUp", async (req, res, next) => {
        logger.silly(`Entrada de endpoint para validar inscripción pyme con el request body: ${req.body}`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await pymeService.enrollmentValidation(formData)));
        } catch (error) {
            next(error);
        }
    }); 

};