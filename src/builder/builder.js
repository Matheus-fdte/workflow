// koa imports
const Koa = require('koa');
const debug = require('debug')('flowbuild:builder');
// internal imports
const Routers = require('../routes');
const Middlewares = require('../middlewares');

class Builder {
  constructor() {
    this.config = {
      flowbuild: {},
      services: {},
      database: {},
      api: {},
    };
  }

  configureApiServer() {
    this.app = new Koa();

    debug('configuring middlewares');
    const middlewares = Middlewares(this.config);
    debug('adding middlewares');
    middlewares.forEach((middleware) => this.app.use(middleware));

    debug('configurting Routes');
    const routers = Routers(this.config.api);
    debug('configurting Routes');
    this.app.use(routers.routes());
    this.app.use(routers.allowedMethods());
  }

  startServer(serverStartedCallback) {
    if (this.config.api.port) {
      debug('starting Api');
      if (serverStartedCallback) {
        this.server = this.app.listen(
          this.config.api.port,
          serverStartedCallback
        );
      } else {
        this.server = this.app.listen(this.config.api.port, () => {
          // eslint-disable-next-line max-len
          debug(
            `flowbuild api started on port ${this.config.api.port} without onStartCallback`
          );
        });
      }
    }
  }
}

module.exports = Builder;
