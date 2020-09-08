const jwt = require('jsonwebtoken');

function authenticationService({ tokenSeetings, actorService, cryptoService }) {
  function enabled() {
    return Boolean(tokenSeetings.enabled);
  }

  async function generateToken(content) {
    actorService.validateActor(content); // throw error if not valid
    const encryptPayload = cryptoService.encryptContent(content);
    const token = jwt.sign(
      {
        payload: encryptPayload.crypted_text,
        iv: encryptPayload.iv,
      },
      settings.secret
    );

    return token;
  }

  async function decryptToken(content) {
    if (enabled()) {
      const decryptedPayload = cryptoService.decryptToken({
        content: content.payload,
        iv_string: content.iv,
      });
      return decryptedPayload;
    }
    return content;
  }

  return {
    generateToken,
    decryptToken,
  };
}

module.exports = authenticationService;
