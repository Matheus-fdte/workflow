const Router = require('koa-router');

const { validateUUID } = require('../middlewares');
const ac = require('../controllers/activity');

module.exports = () => {
  const router = new Router()
    .get(
      '/processes/activityManager/:id',
      validateUUID,
      ac.fetchActivityByActivityManagerId,
    )
    .get('/processes/available', ac.fetchAvailableActivitiesForActor)
    .get('/processes/done', ac.fetchDoneActivitiesForActor)
    .get('/processes/:id/activity', validateUUID, ac.fetchActivity)
    .post('/processes/:process_id/commit', validateUUID, ac.commitActivity)
    .post('/processes/:process_id/push', validateUUID, ac.pushActivity)
    .post(
      '/activity_manager/:activity_manager_id/submit',
      validateUUID,
      ac.submitByActivityManagerId,
    );

  return router;
};
