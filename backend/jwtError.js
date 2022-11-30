const jwt = require('jsonwebtoken');

const isJwtError = (err) => {
  return err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError || err instanceof jwt.NotBeforeError;
};

module.exports = {
  isJwtError
};