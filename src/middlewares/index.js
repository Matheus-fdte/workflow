const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const captureActorData = require('./user-validation');
const { scopePerRequest } = require('awilix-koa');

module.exports = (config, container) => {
  const { middlewares } = config.services;

  if (!container) {
    throw new Error('container not initialized');
  }

  const allMiddlewares = [
    cors(config.api.cors),
    logger(),
    bodyParser(),
    scopePerRequest(container),
    captureActorData,
    ...middlewares,
  ];

  return allMiddlewares;
};
