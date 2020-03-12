const axios = require('axios');

const getData =  async () => {

    try{

        const res = await axios.get('../../dataMock.js')
        const data = res.data;
        return data;

    }
    catch(error){
        
        console.error('There was an error trying to get the data', error)
    }
}


module.exports = getData;