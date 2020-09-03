function validateActor(actor) {
  const { actor_id: actorId, claims } = actor;
  if (!actorId) {
    throw new Error('Actor id not found');
  } else if (!Array.isArray(claims)) {
    throw new Error('Invalid claims');
  }
}

module.exports = {
  validate: validateActor,
};
