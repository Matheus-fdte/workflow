function configurationBuilder(builder) {
  // api configuration
  function startWorkflowApi(enabled) {}

  function startCockpitApi(enabled) {}
  function setPort(port) {
    builder.config.port = port;
  }

  function setCors(corsConfig) {
    builder.config.cors = corsConfig;
  }

  // flowbuild configuration
  function setPersistType(type) {}

  function setPersistMode(mode) {}

  // database configuration
  function setDatabaseConnection(dbConfig) {}

  function runMigrationsOnStart(enabled) {}

  function runDefaultSeeds(enabled) {}

  function externalMigrationsPath(path) {}

  return {
    setPort,
    setCors,
    startWorkflowApi,
    startCockpitApi,
    setPersistType,
    setPersistMode,
    setDatabaseConnection,
    runMigrationsOnStart,
    runDefaultSeeds,
    externalMigrationsPath,
  };
}

module.exports = configurationBuilder;
