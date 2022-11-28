const jwt = require('jsonwebtoken');
const env = require('./env');

const verifyToken = (req, res, next) => {
    
  try {
      const bearer = req.headers['authorization'];

    if (bearer === undefined) {
        res.status(403).json({ validToken: false });
        return;
    }
    else {
        const token = bearer.split(" ")[1];
        console.log(token);
        
        let verified_token = null;
        try {
          verified_token = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
          console.log(verified_token);
          req.username = verified_token.username;
          next();
          return;
        } catch (err) {
          res.status(403).json({ validToken: false });
          console.error(err);
          return;
        }
    }
  } catch (err) {
      res.status(500).send(err);
      return;
  }
}

module.exports = { verifyToken };