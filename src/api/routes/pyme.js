const logger = require('../../loaders/logger');
const { Router } = require('express');
const router = Router();
const { getData, enrollmentValidation } = require('../../services');
const path = require('path');

module.exports = (app) => {
    app.use('/pyme', router);


    router.get('/datamock', (req,res) => {
        logger.silly('Obteniendo el archivo de mocks del filesystem');
        res.sendFile(path.resolve(__dirname, '../../data/dataMock.js'));
    });
    
    // ---> GET
    router.get('/acaparaCreditos', async (req, res, next) => {
        try {
            let data = await getData();
            response = {
                error: false,
                status: 200,
                message: 'Datos obtenidos con exito',
                data
            };
            res.status(200).json(response);
            
        } catch (error) {
            next(error);
        }
    });
    
    // ---> POST ---> Cuit
    router.post("/verificarCuit", async (req, res) => {
        const cuit = req.body;
        let response = {};
    
        if (!cuit) {
        response = {
            error: true,
            status: 502,
            message: "El campo documento es requeridos"
        };
        return res.json(response);
        }
        response = {
        error: false,
        status: 200,
        message: "Cuit Validado",
        response: cuit
        };
        
        return res.json(response);
    }); 
    
    // ---> POST ---> Inscripcion
    router.post("/validarInscripcion", async (req, res) => {
        const formData = req.body;
        return enrollmentValidation(formData)
    }); 

};