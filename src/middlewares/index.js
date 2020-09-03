const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const captureActorData = require('./user-validation');

module.exports = (config) => {
  const allMiddlewares = [
    cors(config.api.cors),
    logger(),
    bodyParser(),
    captureActorData,
  ];

  return allMiddlewares;
};
