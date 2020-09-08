const actorValidator = require('../validators/actor');
function actorService({}) {
  function validateActor(actorData) {
    actorValidator.validate(actorData);
  }

  return { validateActor };
}

module.exports = actorService;
