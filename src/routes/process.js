const Router = require('koa-router');
const { validateUUID } = require('../middlewares');
const pv = require('../validators/process');
const pc = require('../controllers/process');

module.exports = () => {
  const router = new Router({
    prefix: '/processes',
  })
    .get('/', validateUUID, pc.fetchProcessList)
    .get('/:id/', validateUUID, pc.fetchProcess)
    .get('/:id/history', validateUUID, pc.fetchProcessStateHistory)
    .post('/:id/run', validateUUID, pv.runProcess, pc.runProcess)
    .post('/:id/abort', validateUUID, pc.abortProcess)
    .post('/:id/state', validateUUID, pv.setProcessState, pc.setProcessState);

  return router;
};
