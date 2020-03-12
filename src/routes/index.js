const { Router } = require('express');
const router = Router(); 
const { getData, enrollmentValidation } = require('../services');
const path = require('path');

router.get('/datamock', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../data/dataMock.js'));
});

// ---> GET
router.get('/acaparaCreditos', async (req, res) => {
    
    let data = await getData();
    
    response = {
        error: false,
        status: 200,
        data
    };
    res.json(response);
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


module.exports = router;