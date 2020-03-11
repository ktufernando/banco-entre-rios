const express = require('express')
const app = express()
const morgan = require('morgan');
const swaggerjsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// ---> Setting
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2);

// ---> Swagger Configurations
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'GPSA - Api - Banco Santa Fe',
            description: "Descripcion Endpoints Banco Santa Fe",
            contact:{
                name: "Banco Entre Rios"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['src/index.js']
};

const swaggerDocs = swaggerjsDocs(swaggerOptions);



// ---> Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ---> Routes
app.use('/v1/ber', require('./routes/index'));

/**
 * @swagger
 * /documents:
 *  get:
 *      description: Use to request all customers
 *      responses: 
 *          '200':
 *             description: A succeful response
 */

/**
 * @swagger
 * /document:
 *  put:
 *      description: Use to update a customers
 *      responses: 
 *          '201':
 *             description: A succeful response
 */



// ---> Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})