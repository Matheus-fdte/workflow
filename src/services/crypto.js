function cryptoServie({ cryptoSettings, instanceService, loggerService }) {
  const { key, cryptoType } = cryptoSettings;
  const canCrypt = key || cryptoType;
  const engine = instanceService.getEngine();
  let crypto;
  let iv;

  function buildCrypto() {
    if (canCrypt) {
      try {
        crypto = engine.buildCrypto(cryptoType, {
          key,
        });
        engine.setCrypto(crypto);
      } catch (e) {
        loggerService.error(e);
      }
    } else {
      loggerService.error(new Error('encrypt service not configured'));
    }
  }

  async function decryptContent({ content, iv_string }) {
    if (!canCrypt) {
      // not encrypt
      return content;
    }
    const _iv = Buffer.from(iv_string, 'hex') || iv;
    const decipher = crypto.createDecipheriv(cryptoType, key, _iv);
    let decrypted = decipher.update(crypted_text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async function encryptContent(content) {
    if (!canCrypt) {
      // not encrypt
      return content;
    }
    if (!iv) {
      iv = crypto.randomBytes(16);
    }
    const cipher = crypto.createCipheriv(cryptoType, key, iv);
    let encrypted = cipher.update(plain_text.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
      crypted_text: encrypted,
      iv: iv.toString('hex'),
    };
  }

  buildCrypto();
  return {
    decryptContent,
    encryptContent,
  };
}

module.exports = cryptoServie;
