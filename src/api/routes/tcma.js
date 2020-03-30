const logger = require('../../loaders/logger');
const { tcmaService } = require('../../services');
const { handleSuccessResponse } = require('../../utils/ResponseHandler');
const { Router } = require('express');
const router = Router();
const path = require('path');

module.exports = (app) => {
    app.use('/tcma', router);


    // --> GET Cuil
    router.get(`/getCUIL/:dni`, async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener Cuil Tarjetas');
    
        try {
            const dni = req.params.dni;
            res.status(200).json(handleSuccessResponse(await tcmaService.getCuil(dni)));
        } catch (error) {
            next(error);
        }
    });

    
    // --> GET Countries
    router.get('/getCountries', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises de Tarjetas');
        try {
            res.status(200).json(handleSuccessResponse(await tcmaService.getCountries()));
        } catch (error) {
            next(error);
        }
    });


    // --> GET Activities
    router.get('/getActivities/:cuil', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener Actividades de Tarjetas');
        try {
            const cuil = req.params.cuil;
            res.status(200).json(handleSuccessResponse(await tcmaService.getActivities(cuil)));
        } catch (error) {
            next(error);
        }
    });

    
    // --> GET Marital State
    router.get('/getEstadoCivil', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener estados civiles de Tarjetas');
        try {
            res.status(200).json(handleSuccessResponse(await tcmaService.getMaritalState()));
        } catch (error) {
            next(error);
        }
    });
    

    // --> GET Localities
    router.get('/getLocalities/:postalCode', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener Localidades de Tarjeta');
        try {
            const code = req.params.postalCode;
            res.status(200).json(handleSuccessResponse(await tcmaService.getLocalities(code)));
        } catch (error) {
            next(error);
        }
    });


    // --> GET date of birth Validation
    router.get('/validateApplicantAge/:applicantDayOfBirth', async (req, res, next) => {
        logger.silly('Entrada de endpoint para verificar la fecha de nacimiento de Tarjetas');
        try {
            const applicantDayOfBirth = req.params.applicantDayOfBirth;
            res.status(200).json(handleSuccessResponse(await tcmaService.getValidateBirthDay(applicantDayOfBirth)));
        } catch (error) {
            next(error);
        }
    });
    

    // --> GET Cuil Validation
    router.get(`/validateCuil/:cuil`, async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener Cuil Tarjetas');
    
        try {
            const cuil = req.params.cuil;
            res.status(200).json(handleSuccessResponse(await tcmaService.getValidateCuil(cuil)));
        } catch (error) {
            next(error);
        }
    });


    // --> POST ---> Step 1
    router.post("/personalData", async (req, res, next) => {
        logger.silly(`Entrada de endpoint Step 1`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await tcmaService.postStepOne(formData)));
        } catch (error) {
            next(error);
        }
    });


    // --> POST ---> Step 2
    router.post("/sentData", async (req, res, next) => {
        logger.silly(`Entrada de endpoint Step 2`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await tcmaService.postSteptwo(formData)));
        } catch (error) {
            next(error);
        }
    });


    // --> POST ---> Step 3
    router.post("/aditionalCardData", async (req, res, next) => {
        logger.silly(`Entrada de endpoint Step 3`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await tcmaService.postStepThree(formData)));
        } catch (error) {
            next(error);
        }
    });


    // --> POST ---> Step 3 w/ additional Card
    router.post("/aditionalCardData", async (req, res, next) => {
        logger.silly(`Entrada de endpoint Step 3 con adicional tarjeta`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await tcmaService.postStepThreeWithCard(formData)));
        } catch (error) {
            next(error);
        }
    });


    // --> POST ---> Step 4 w/ additional Card
    router.post("/sendRequest", async (req, res, next) => {
        logger.silly(`Entrada de endpoint Step 4 con adicional tarjeta`);
        try {
            const formData = req.body;
            res.status(200).json(handleSuccessResponse(await tcmaService.postStepFourWithCard(formData)));
        } catch (error) {
            next(error);
        }
    });
    
};