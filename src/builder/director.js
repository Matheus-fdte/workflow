const debug = require('debug')('flowbuild:Director');
const Builder = require('./builder');
const configurationBuilder = require('./configuration-builder');
const serviceBuilder = require('./services-builder');

let builder;
let addConfigurationLazyCallback;
let addServicesLazyCallback;
class Director {
  constructor() {
    debug('builder inicialization');
    builder = new Builder();
  }

  addConfiguration(configCallback) {
    addConfigurationLazyCallback = () => {
      configBuilder = configurationBuilder(builder);
      configCallback(configBuilder);
    };

    return this;
  }

  addService(serviceCallback) {
    addServicesLazyCallback = () => {
      svcBuilder = serviceBuilder(builder);
      serviceCallback(svcBuilder);
    };

    return this;
  }

  async start(onServerStarted) {
    debug('starting flowbuild service');
    try {
      addConfigurationLazyCallback();
      /**
       * TODO: configure engine and workflow
       */
      addServicesLazyCallback();
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
