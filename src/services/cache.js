function cacheService({ databaseService, loggerService }) {
  const db = databaseService.db();

  async function addActivityManager(activityManager) {
    loggerService.week('adding activityManager to cache');
    await db.transaction(async (trx) => {
      const existing = await trx('user_activity_manager')
        .select()
        .where({
          user_id: activityManager._props.result.current_user,
          activity_manager_id: activityManager._id,
        })
        .first();

      if (!existing) {
        await trx('user_activity_manager').insert({
          user_id: activityManager._props.result.current_user,
          activity_manager_id: activityManager._id,
        });
      }
    });
  }

  async function retrieveUserActivityManagers(userId, status) {
    loggerService.week('getting activity managers from cache');
    return await db('user_activity_manager')
      .select(
        'activity_manager.*',
        'activity_manager.status as activity_status',
        'process.id as process_id',
        'workflow.name as workflow_name'
      )
      .join(
        'activity_manager',
        'activity_manager.id',
        'user_activity_manager.activity_manager_id'
      )
      .join(
        'process_state',
        'process_state.id',
        'activity_manager.process_state_id'
      )
      .join('process', 'process.id', 'process_state.process_id')
      .join('workflow', 'workflow.id', 'process.workflow_id')
      .where('user_activity_manager.user_id', userId)
      .where('activity_manager.status', status);
  }

  return {
    retrieveUserActivityManagers,
    addActivityManager,
  };
}

module.exports = cacheService;
