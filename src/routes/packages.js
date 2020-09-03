const Router = require('koa-router');
const { validateUUID } = require('../middlewares');
const pkc = require('../controllers/package');

module.exports = () => {
  const router = new Router({
    prefix: '/packages',
  })
    .post('/', pkc.savePackage)
    .get('/:id', validateUUID, pkc.fetchPackage)
    .delete('/:id', validateUUID, pkc.deletePackage);

  return router;
};
