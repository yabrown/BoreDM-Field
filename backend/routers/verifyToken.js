const jwt = require('jsonwebtoken');
const env = require('../env');
const { isJwtError } = require('./jwtError');

const verifyToken = (req, res, next) => {

  try {
    const bearer = req.headers['authorization'];

    if (bearer === undefined) {
      res.status(401).send();
      return;
    }
    else {
      const token = bearer.split(" ")[1];

      const verified_token = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
      console.log("Verified!");
      req.username = verified_token.username;
      next();
      return;
    }
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      res.status(500).send(err);
    }
  }
}

module.exports = { verifyToken };