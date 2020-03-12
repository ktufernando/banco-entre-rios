const axios = require('axios');
const fs = require("fs");
const path = require('path');

const getData =  async () => {

        const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
        return JSON.parse(data);

}

const enrollmentValidation =  async (formData) => {
    let data = formData;
    console.log("jejje")
    let response = {};
    if (!data) {
        response = {
            error: true,
            status: 502,
            message: "Todos los campos son requeridos requeridos"
        };
        return res.json(response);
        }
        response = {
            error: false,
            status: 200,
            message: "Inscripcion Validada",
            response: formData 
        };

        return res.json(response); 

}


module.exports = {
    getData,
    enrollmentValidation
};