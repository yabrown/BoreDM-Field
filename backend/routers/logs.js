const express = require('express')
const { isJwtError } = require('./jwtError');
const db = require('../queries')
const { verifyToken } = require('./verifyToken')

const router = express.Router()

router.use(verifyToken);

router.post('/delete_log', (req, res) => {
  try {
    db.delete_log(req.body.log_id)
    res.status(200).send();
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

router.post('/update_log', (req, res) => {
  try {
    db.update_log(req.body.log_id, req.body.log_name, req.body.driller, req.body.logger, req.body.notes, req.body.latitude, req.body.longitude)
    res.status(200).send();
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
router.post('/get_all_logs', async (req, res) => {
  try {
    const results = await db.get_all_logs(req.body.project_id);
    res.json(results);
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

// get request to get a specific log by its id

router.post('/get_log', async (req, res) => {
  try {
    const results = await db.get_log(req.body.log_id);
    res.json(results);
  } catch (err) {
    if (isJwtError(err)) {
      res.status(401).send("JWT Error");
    }
    else {
      console.error(err);
      res.status(500).send();
    }
  }
})

// get request on the root directory, returns absolutely all logs
// written by: Ari
router.post('/get_all_logs_absolute', async (req, res) => {
  try {
    const results = await db.get_all_logs_absolute();
    res.json(results);
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;