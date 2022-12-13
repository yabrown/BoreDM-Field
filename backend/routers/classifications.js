const express = require('express')
const { isJwtError } = require('./jwtError');
const db = require('../queries')
const { verifyToken } = require('./verifyToken')

const router = express.Router()

router.use(verifyToken);

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
router.post('/get_all_classifications', async (req, res) => {
  try {
    const results = await db.get_all_classifications(req.body.log_id);
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

router.post('/add_classification', (req, res) => {
  console.log(req.body)
  try {
    db.add_classification(req.body.log_id, req.body.start_depth, req.body.end_depth, req.body.uscs, req.body.color, req.body.moisture, req.body.density, req.body.hardness)
    res.status(200).send("Project added");
  } catch (err) {
    console.log(err);
  }
})

router.post('/delete_classification', (req, res) => {
  try {
    db.delete_classification(req.body.classification_id)
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

router.post('/update_classification', (req, res) => {
  try {
    db.update_classification(req.body.log_id, req.body.start_depth, req.body.end_depth, req.body.uscs, req.body.color, req.body.moisture, req.body.density, req.body.hardness)
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