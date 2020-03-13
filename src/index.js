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