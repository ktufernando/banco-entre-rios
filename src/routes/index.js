const { Router } = require('express');
const router = Router(); 


router.post("/verificarCuit", (req, res) => {
    res.status(200).send("Cuit Validado"); 
});

router.post("/validarInscripcion", (req, res) => {
    console.log("request");
    res.status(200).send("Documents results"); 
});

router.post("/document", (req, res) => {
    console.log("request");
    res.status(200).send("Documents results"); 
});

module.exports = router;