const captureActorData = async (ctx, next) => {
  try {
  } catch (e) {
    ctx.throw(401, e.message);
  }
  await next();
};

module.exports = captureActorData;
