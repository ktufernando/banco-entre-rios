const logger = require('../../loaders/logger');
const { qrService } = require('../../services');
const { handleSuccessResponse } = require('../../utils/ResponseHandler');
const { Router } = require('express');
const router = Router();
const path = require('path');

module.exports = (app) => {
    app.use('/qr', router);


    // --> GET Cuil
    router.get(`/chargeWithQR/getCUIL/:`, async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener codigo qr');
        const { cuit } = req.body;
        console.log(cuit)
        try {
            res.status(200).json(handleSuccessResponse(await qrService.getCuil(cuit)));
        } catch (error) {
            next(error);
        }
    });

    // --> GET Marital State
    router.get('/chargeWithQR/getEstadoCivil', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener estados civiles');
        try {
            res.status(200).json(handleSuccessResponse(await qrService.getMaritalState()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> GET Countries
    router.get('/chargeWithQR/getCountries', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await qrService.getCountries()));
        } catch (error) {
            next(error);
        }
    });

    // --> GET date of birth
    router.get('/chargeWithQR/validateApplicantAge/:applicantDayOfBirth', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await qrService.getValidateBirdtDay()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> GET Localities
    router.get('/chargeWithQR/getLocalities/:postalCode', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await qrService.getLocalities()));
        } catch (error) {
            next(error);
        }
    });

};