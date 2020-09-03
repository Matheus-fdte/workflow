function serviceBuilder(builder) {
  function addKoaNativeMiddleware(fn) {
    if (
      builder.config.services.middlewares &&
      builder.config.services.middlewares.length > 0
    ) {
      builder.config.services.middlewares.push(fn);
    } else {
      builder.config.services.middlewares = [fn];
    }
  }

  function enableWorkerService(enabled) {
    builder.config.services.enableWorker = enabled;
  }

  function enableDefaultCacheService(enabled) {
    builder.config.services.defaultCacheService = enabled;
  }

  function cryptoServiceSettings(cryptoSettings) {
    builder.config.services.cryptoSettings = cryptoConfig;
  }

  function mqttServiceSettings(mqttSettings) {
    builder.config.services.MqttSettings = mqttConfig;
  }

  function enableDefaultTokenGeneration(enabled) {
    builder.config.services.defaultTokenGeneration = enabled;
  }

  function addCustomNode(node) {
    if (
      builder.config.services.nodes &&
      builder.config.services.nodes.length > 0
    ) {
      builder.config.services.nodes.push(node);
    } else {
      builder.config.services.nodes = [node];
    }
  }

  function getServices() {
    return services;
  }

  return {
    addKoaNativeMiddleware,
    enableWorkerService,
    enableDefaultCacheService,
    enableCryptoService,
    enableDefaultMqttService,
    enableDefaultTokenGeneration,
    addCustomNode,
    getServices,
  };
}

module.exports = serviceBuilder;
