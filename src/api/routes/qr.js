const logger = require('../../loaders/logger');
const { handleSuccessResponse } = require('../../utils/ResponseHandler');
const { Router } = require('express');
const router = Router();
const path = require('path');
const { getCuil,
        getCountries,
        getLocalities,
        getMaritalState,
        getValidateBirdtDay
    } = require('../../services/qrServices');

module.exports = (app) => {
    app.use('/qr', router);


    // --> GET Cuil
    router.get('/chargeWithQR/getCUIL/:dni', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener codigo qr');
        try {
            res.status(200).json(handleSuccessResponse(await getCuil()));
        } catch (error) {
            next(error);
        }
    });

    // --> GET Marital State
    router.get('/chargeWithQR/getEstadoCivil', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener estado civil');
        try {
            res.status(200).json(handleSuccessResponse(await getMaritalState()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> GET Countries
    router.get('/chargeWithQR/getCountries', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await getCountries()));
        } catch (error) {
            next(error);
        }
    });

    // --> GET date of birth
    router.get('/chargeWithQR/validateApplicantAge/:applicantDayOfBirth', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await getValidateBirdtDay()));
        } catch (error) {
            next(error);
        }
    });
    
    // --> GET Localities
    router.get('/chargeWithQR/getLocalities/:postalCode', async (req, res, next) => {
        logger.silly('Entrada de endpoint para obtener paises');
        try {
            res.status(200).json(handleSuccessResponse(await getLocalities()));
        } catch (error) {
            next(error);
        }
    });

};