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
            title: 'GPSA - Api - Banco Entre Rios',
            description: "",
            contact:{
                name: "Banco Entre Rios"
            },
            servers: ["http://ñpcalhost:3000"]
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
app.use(require('./routes/index'));

/**
 * @swagger
 * /customers:
 *  get:
 *      description: Use to request all customers
 *      reponses: 
 *          '200':
 *             description: A succeful response
 */
app.get("/customers", (req, res) => {
    console.log("request");
    res.status(200).send("Customer results"); 
});

/**
 * @swagger
 * /customer:
 *  put:
 *      description: Use to update a customers
 *      reponses: 
 *          '201':
 *             description: A succeful response
 */
app.put("/customer", (req, res) => {
    console.log("request");
    res.status(201).send("Succssefully update customer"); 
});



// ---> Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})