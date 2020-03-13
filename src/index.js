const config = require('./config');
const express = require('express');
const logger = require('./loaders/logger');

async function startServer() {
    const app = express();

    await require('./loaders')(app);

    app.listen(config.port, err => {
        if (err) {
          logger.error(err);
          process.exit(1);
          return;
        }
        logger.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️ 
          ################################################
        `);
    });


}

startServer();

/*const app = express()
const morgan = require('morgan');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorhandler = require('errorhandler');
const routes = require('./routes');



const isProduction = process.env.NODE_ENV === 'production';

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

const swaggerDocs = swaggerJsDocs(swaggerOptions);

// ---> Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ---> Routes
app.use('/v1/ber', routes);

if (!isProduction) {
    app.use(errorhandler());
}

// ---> Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ---> Error handlers
if (!isProduction) {
    // Development error handler
    // will print stacktrace
    routes.use((err, req, res, next) => {

        console.log(err.stack);

        res.status(err.status || 500);

        return res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
}else {
    // production error handler
    // no stacktrace leaked to user
    routes.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
}

// ---> Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`)
})*/