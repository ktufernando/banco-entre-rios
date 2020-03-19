const swaggerJsDocs = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'GPSA - BFF - Banco Entre Rios',
            description: "Back end for front end for Entre Rios Bank",
            contact:{
                name: "Banco Entre Rios"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['src/index.js']
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

module.exports = swaggerDocs;