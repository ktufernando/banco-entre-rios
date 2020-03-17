const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const logger = require('./logger');

module.exports = async (app) => {
  
  const mongoConnection = await mongooseLoader();
  logger.info('✌️ DB loaded and connected!');

  //TODO: Activar este código cuando tengamos modelo de la base de datos
  /*const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };*/


  await expressLoader(app);
  logger.info('✌️ Express loaded');
};