const Knex = require('knex');
const path = require('path');
function databaseService({ dbSettings, loggerService }) {
  loggerService.info('starting Database Service');
  // setup week logger

  let _db;
  const defaultDbPath = path.resolve(__dirname, '..', '..', 'db');

  function db() {
    return _db;
  }
  function executeInternalMigrations() {
    loggerService.info('Running Flowbuild Default Migrations');
    _db.migrate.lastest(path.compose(defaultDbPath, 'migrations'));
  }
  function executeInternalSeeds() {
    loggerService.info('Running Flowbuild Default Seeds');
    _db.seed.run(path.compose(defaultDbPath, 'seeds'));
  }
  function executeExternalMigrations() {
    loggerService.info('Running Flowbuild External Migrations');
    _db.migrate.lastest(dbSettings.custom.migrationsPath);
  }
  function executeExternalSeeds() {
    loggerService.info('Running Flowbuild external Seeds');
    _db.seed.run(dbSettings.custom.seedsPath);
  }

  try {
    if (dbSettings.useDatabase) {
      _db = Knex(dbSettings.dbConfigureation);
    }

    if (dbSettings.executeDefaultMigrations) {
      executeInternalMigrations();
    }
    if (dbSettings.executeDefaultSeeds) {
      executeInternalSeeds();
    }
    if (dbSettings.executeExternalMigrations) {
      executeExternalMigrations();
    }
    if (dbSettings.executeExternalSeeds) {
      executeExternalSeeds();
    }
  } catch (e) {
    loggerService.error(e);
  } finally {
    return {
      db,
    };
  }
}

module.exports = loggerService;
