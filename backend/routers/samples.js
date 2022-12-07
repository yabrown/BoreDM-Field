const express = require('express')
const db = require('../queries')
const { isJwtError } = require('./jwtError');
const { verifyToken } = require('./verifyToken')

const router = express.Router()

router.use(verifyToken);

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
router.post('/get_all_samples', async (req, res) => {
  try {
    const results = await db.get_all_samples(req.body.log_id);
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

router.post('/add_sample', (req, res) => {
  try {
    db.add_sample(req.body.log_id, req.body.start_depth, req.body.end_depth, req.body.length, req.body.blows_1, req.body.blows_2, req.body.blows_3, req.body.blows_4, req.body.description, req.body.refusal_length, req.body.sampler_type)
    res.status(200).json();
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

router.post('/update_sample', (req, res) => {
  try {
    db.update_sample(req.body.sample_id, req.body.start_depth, req.body.end_depth, req.body.length, req.body.blows_1, req.body.blows_2, req.body.blows_3, req.body.blows_4, req.body.description, req.body.refusal_length, req.body.sampler_type)
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

router.post('/delete_sample', (req, res) => {
  try {
    db.delete_sample(req.body.sample_id)
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

router.post('/add_boring_to_project', async (req, res) => {
  console.log("matched correctly")
  try {
    console.log("add_boring_to_project: req.body: ", req.body);
    const log_id = await db.create_log(req.body.project_id, req.body.name, req.body.driller, req.body.logger, req.body.notes, req.body.latitude, req.body.longitude);
    console.log("Log ID: " + log_id);
    res.send(String(log_id));
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

module.exports = router;