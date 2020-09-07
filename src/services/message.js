const mqtt = require('async-mqtt');

async function mqttService({ mqttSettings, loggerService }) {
  const { host, port, protocol } = mqttSettings;
  function mqttStatementsLogs() {
    /**
     * connection construction
     */
    client.on('connect', async () => {
      loggerService.week(
        'GREEN',
        `workflow: ${
          process.env.HOSTNAME
        }, connected to mqtt - ${new Date().toISOString()}`
      );
      //subscribes on connect
      await client.subscribe(`/#`, async (err) => {
        if (err) {
          loggerService.error(err);
          return;
        }
        loggerService.week('INFO', 'listening mqtt messages');
      });
    });
    client.on('message', (topic, _) => {
      loggerService.week(
        'INFO',
        `message received : ${JSON.stringify({
          message: { room: topic, date: new Date().toISOString() },
        })}`
      );
    });
    /**
     * lost connection  notifications
     */
    client.on('reconnect', (err) => {
      loggerService.week(
        'YELLOW',
        `${
          global.process.env.HOSTNAME
        }: mqtt reconnecting - ${new Date().toISOString()}`
      );
      if (err) {
        loggerService.week(
          consoleColors.RED,
          ` ${global.process.env.HOSTNAME} mqtt on reconnect error: ${err}`
        );
      }
    });
    client.on('disconnect', (_, err) => {
      if (err) {
        loggerService.week(
          'RED',
          ` ${global.process.env.HOSTNAME}: mqtt on disconnect error: ${err}`
        );
      }
      loggerService.week(
        'YELLOW',
        `${
          global.process.env.HOSTNAME
        }: mqtt disconnect - ${new Date().toISOString()}`
      );
    });
    client.on('end', (err) => {
      if (err) {
        loggerService.week(
          'RED',
          `${global.process.env.HOSTNAME}: mqtt on end error: ${err}`
        );
      }
      loggerService.week(
        'YELLOW',
        `${global.process.env.HOSTNAME}: mqtt end - ${new Date().toISOString()}`
      );
    });
    client.on('close', (err) => {
      if (err) {
        loggerService.week(
          'RED',
          ` ${global.process.env.HOSTNAME}: mqtt on close error: ${err}`
        );
      }
      loggerService.week(
        'YELLOW',
        `${
          global.process.env.HOSTNAME
        }: mqtt closed - ${new Date().toISOString()}`
      );
    });
    client.on('offline', (err) => {
      if (err) {
        loggerService.week(
          'RED',
          ` ${global.process.env.HOSTNAME}: mqtt offline ${err}`
        );
      }
      loggerService.week(
        'YELLOW',
        `${
          global.process.env.HOSTNAME
        }: mqtt offline - ${new Date().toISOString()}`
      );
    });
    client.on('end', (err) => {
      if (err) {
        loggerService.week(
          'RED',
          ` ${global.process.env.HOSTNAME}: mqtt connection end error: ${err}`
        );
      }
      loggerService.week(
        'YELLOW',
        `${
          global.process.env.HOSTNAME
        }: mqtt connection ended - ${new Date().toISOString()}`
      );
    });
    /**
     * error notification
     */
    client.on('error', (err) => {
      if (err) {
        loggerService.week(
          'RED',
          `workflow: ${process.env.HOSTNAME}, error: ${err}`
        );
      }
    });
  }
  const client = mqtt.connect({
    port,
    host,
    protocol,
  });
  mqttStatementsLogs();
  async function publish(topic, message) {
    await client.publish(topic, JSON.stringify(message));
  }

  return {
    publish,
  };
}

module.exports = mqttService;
