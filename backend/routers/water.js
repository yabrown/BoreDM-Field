const express = require('express')
const { isJwtError } = require('./jwtError');
const db = require('../queries')
const { verifyToken } = require('./verifyToken')

const router = express.Router()

router.use(verifyToken);

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
router.post('/get_all_water_encounters', async (req, res) => {
  try {
    const results = await db.get_all_water_encounters(req.body.log_id);
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

router.post('/add_water_encounter', (req, res) => {
  console.log(req.body)
  try {
    db.add_water_encounter(req.body.log_id)
    res.status(200).send("Water encounter added");
  } catch (err) {
    console.log(err);
  }
})

router.post('/delete_encounter', (req, res) => {
  try {
    db.delete_water_encounter(req.body.encounter_id)
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

router.post('/update_water_encounter', (req, res) => {
  try {
    db.update_water_encounter(req.body.log_id, req.body.start_depth_1, req.body.start_depth_2, req.body.start_depth_3, req.body.timing_1, req.body.timing_2, req.body.timing_3)
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

module.exports = router;