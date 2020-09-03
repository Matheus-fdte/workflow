const Router = require('koa-router');
const { validateUUID } = require('../middlewares');
const cc = require('../controllers/cockpit');

module.exports = () => {
  const router = new Router()
    .get(
      '/workflows/stats',
      cc.fetchWorkflowsWithProcessStatusCount,
    )
    .post(
      '/processes/:id/state/run',
      validateUUID,
      cc.runPendingProcess,
    );

  return router;
};
