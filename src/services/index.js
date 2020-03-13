const axios = require('axios');
const fs = require("fs");
const path = require('path');

const getData =  async () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data/dataMock.js'));
    return JSON.parse(data);

}

const enrollmentValidation =  async (formData) => {

    const data = formData;

    if(data != String){
        return res.status(200).json({
            "error": false,
            "message": "the Request was Successful" 
        });
    }else if(data.length != 11){
        return res.status(400).json({
            "error": true,
            "message": "the Request cannot be Executed" 
        });
    }else if (data === '11111111111'){
        return res.status(404).json({
            "error": true,
            "message": "Not Found" 
        });  
    }else if (data === '222222222222'){
        return res.status(406).json({
            "error": true,
            "message": "Not Acceptable" 
        });
    }else if (data === '33333333333'){
        return res.status(500).json({
            "error": true,
            "message": "Internal Server Error" 
        });
    }else if (data === "44444444444"){
        return res.status(504).json({
            "error": true,
            "message": "the request is not acepted" 
        });        
    }

    return;

}


module.exports = {
    getData,
    enrollmentValidation
};