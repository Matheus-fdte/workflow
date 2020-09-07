function loggerService({ loggerSettings }) {
  // setup week logger
  let _week;
  let _info;
  if (loggerSettings.level === 1) {
    _week = (text) => console.log(text);
  } else {
    _week = () => {};
  }

  // setup info logger
  if (loggerSettings.level > 0) {
    _info = (text) => console.log(text);
  }
  if (loggerSettings.level > 0) {
    _info = () => {};
  }

  function week(text) {
    _week(text);
  }
  function info(text) {
    _info(text);
  }
  function strong(text) {
    console.log(text);
  }
  function warning(text) {
    console.warn(text);
  }
  function error(err) {
    if (err.stack) {
      console.error(err.stack);
    } else {
      console.error(err);
    }
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
