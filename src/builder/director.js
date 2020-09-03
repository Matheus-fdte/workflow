const debug = require('debug')('flowbuild:Director');
const Builder = require('./builder');

let builder;
class Director {
  constructor() {
    debug('builder inicialization');
    builder = new Builder();
  }

  addConfiguration(configCallback) {
    return this;
  }

  addService(serviceCallback) {
    return this;
  }

  async start(onServerStarted) {
    debug('starting flowbuild service');
    try {
      builder.configureApiServer();
      builder.startServer(onServerStarted);
      this.server = builder.server;
    } catch (err) {
      if (builder.server) {
        builder.server.close();
      }
      onServerStarted(err);
    }

    return this;
  }
}

module.exports = Director;
