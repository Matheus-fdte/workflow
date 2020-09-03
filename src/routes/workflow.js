const Router = require('koa-router');
const { validateUUID } = require('../middlewares');
const wv = require('../validators/workflow');
const wc = require('../controllers/workflow');

module.exports = () => {
  const router = new Router({
    prefix: '/workflows',
  })
    .post('/', wv.saveWorkflow, wc.saveWorkflow)
    .get('/', wc.getWorkflowsForActor)
    .get('/:id', validateUUID, wc.fetchWorkflow)
    .get('/:id/processes', validateUUID, wc.fetchWorkflowProcessList)
    .delete('/:id', validateUUID, wc.deleteWorkflow)
    .post('/:id/create', validateUUID, wv.createProcess, wc.createProcess)
    .post('/name/:name/create', wc.createProcessByName)
    .post('/name/:workflow_name/start',
      wc.createAndRunProcessByName);

  return router;
};
