const axios = require('axios');
const fs = require("fs");
const path = require('path');

const getData =  async () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);
}

const enrollmentValidation =  async (formData) => {

    const data = formData;

    //validar data.cuit

    
    //TODO: convertir el data en un string


    if (data.length != 11){

        throw new Error('El CUIT es invalido', 400);

    }else if (data === '11111111111'){

        throw new Error("CUIt no valido como empresa", 400);

    }else if (data === '222222222222'){

        throw new Error( 'Servicio del grupo no disponible', 504)

    }else {

        //TODO: Responder el mock del ok
        return;
    }

    

}


module.exports = {
    getData,
    enrollmentValidation
};