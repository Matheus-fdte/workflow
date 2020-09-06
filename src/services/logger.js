function loggerService({ loggerSettings }) {
  // setup week logger
  if (loggerSettings.level === 1) {
    this._week = (text) => console.log(text);
  } else {
    this._week = () => {};
  }

  // setup info logger
  if (loggerSettings.level > 0) {
    this._info = (text) => console.log(text);
  }
  if (loggerSettings.level > 0) {
    this._info = () => {};
  }

  function week(text) {
    this._week(text);
  }
  function info(text) {
    this._info(text);
  }
  function strong(text) {
    console.log(text);
  }
  function warning(text) {
    console.warn(text);
  }
  function error(err) {
    console.error(err.stack);
  }

  return {
    week,
    info,
    strong,
    warning,
    error,
  };
}

module.exports = loggerService;
