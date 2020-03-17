const swaggerJsDocs = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'GPSA - Api - Banco ENtre Rios',
            description: "Descripcion Endpoints Entre Rios",
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