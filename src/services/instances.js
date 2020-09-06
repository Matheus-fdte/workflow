const { Engine, Cockpit } = require('@flowbuild/engine');
let engine;
let cockpit;
function instanceService({ cockpitEnabled, persistMode, databaseService }) {
  engine = new Engine(persistMode, databaseService.db);
  function getEngine() {
    return engine;
  }
  if (cockpitEnabled) {
    cockpit = new Cockpit(persistMode, databaseService.db);

    function getCockpit() {
      return cockpit;
    }
    return {
      getCockpit,
      getEngine,
    };
  }

  return {
    getEngine,
  };
}

module.exports = instanceService;
