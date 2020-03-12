const axios = require('axios');

const getData =  async () => {

    try{
        const res = await axios.get('http://localhost:3000/v1/ber/datamock');
        const data = res.data;
        return data;
    } catch(error){
        const msg = 'There was an error trying to get the data';
        throw new Error(msg, error);
    }
}


module.exports = getData;