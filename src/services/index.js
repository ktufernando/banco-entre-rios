const axios = require('axios');
const fs = require("fs");
const path = require('path');

const getData =  async () => {

        const data = fs.readFileSync('../data/dataMock.js');
        console.log(data);
        return JSON.parse(data);
}


module.exports = getData;