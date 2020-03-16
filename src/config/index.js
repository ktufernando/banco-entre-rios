const dotenv = require('dotenv');
const appRoot = require('app-root-path');

// Set the NODE_ENV to 'development' By default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Port application
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  //databaseURL: process.env.MONGODB_URI,


  /**
   * Used by winston logger
   */
  logs: {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true
    },
    level: 'silly'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/v1/ber',
  },

  /**
   * Swagger config
   */
  swagger: {
    path: '/api-docs'
  },



};