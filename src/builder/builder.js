// koa imports
const Koa = require('koa');
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

    const middlewares = Middlewares(this.config);
    middlewares.forEach((middleware) => this.app.use(middleware));

    const routers = Routers(this.config.api);
    this.app.use(routers.routes());
    this.app.use(routers.allowedMethods());
  }

  startServer(serverStartedCallback) {
    if (this.config.api.port) {
      if (serverStartedCallback) {
        this.server = this.app.listen(
          this.config.api.port,
          serverStartedCallback
        );
      } else {
        this.server = this.app.listen(this.config.api.port, () => {});
      }
    }
  }
}

module.exports = Builder;
