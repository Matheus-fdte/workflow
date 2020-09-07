function errorService({
  messageService,
  workflowService,
  loggerService,
  errorSettings,
}) {
  async function recreateProcess(processState, actorData) {
    const stateHistory = await workflowService.fechProcessStateHistory(
      processState.process_id
    );
    const firstState = stateHistory[stateHistory.length - 1];
    const process = await workflowService.fetchProcess(processState.process_id);

    const initialBag = {
      ...firstState.bag,
      retryCount: (processState.bag.retryCount || 0) + 1,
    };
    if (initialBag.retryCount <= 3) {
      await workflowService.startProcess(
        process._workflow_id,
        actorData,
        initialBag
      );
    } else {
      loggerService.error('Retry limit for process' + processState.process_id);

      const nameWorkflowError = errorSettings.workflowError;
      if (nameWorkflowError) {
        await workflowService.startProcessByWorkflowName(
          nameWorkflowError,
          actorData,
          {
            origin: processState.process_id,
          }
        );
      }
    }
  }

  async function stateListener(processState, actorData) {
    if (processState.status === 'error') {
      loggerService.error(
        'Error on process ',
        processState.process_id,
        processState.error
      );
      const errorTopic = `/${errorSettings.errorTopic}/${actorData.actor_id}`;
      const errorMessage = JSON.stringify({
        action: 'ERROR',
        data: {
          message: 'Error on process',
        },
      });
      messageService.publish(errorTopic, errorMessage);
      await recreateProcess(processState, actorData);
    }
  }
  return {
    stateListener,
  };
}

module.exports = errorService;
