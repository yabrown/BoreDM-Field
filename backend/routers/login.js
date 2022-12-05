const express = require('express')
const bcrypt = require('bcrypt');
const db = require('../queries');
const env = require('../env');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);

    const results = await db.register(username, hashedPass, name);

    if (results) {
      res.status(200).send("User registered");
    } else {
      res.status(409).send("Error: Username already exists");
    }

  } catch (err) {
    res.status(500).send();
    console.error(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const textPassword = req.body.password;

    const hashedPass = await db.login(username);
    console.log(hashedPass)

    if (hashedPass) {
      const doesMatch = await bcrypt.compare(textPassword, hashedPass);
      if (doesMatch) {
        const token = jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
      } else {
        res.status(401).send();
      }
    }
    else {
      res.status(401).send();
    }

  } catch (err) {
    res.status(500).send();
    console.error(err);
  }
})

module.exports = router