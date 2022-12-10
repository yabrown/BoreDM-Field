const express = require('express')
const { isJwtError } = require('./jwtError');
const { verifyToken } = require('./verifyToken')
const db = require('../queries');

const router = express.Router()

router.use(verifyToken);

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
router.get('/get_all_projects', async (req, res) => {
  try {
    const results = await db.get_all_projects(req.username);
    console.log(results);
    res.json(results);
  } catch (err) {
    if (isJwtError(err)) res.status(401);
    else res.status(500);
    console.log(err);
  }
})

router.post('/add_project', (req, res) => {
  try {
    db.add_project(req.username, req.body.project_name, req.body.client_name, req.body.project_location, req.body.project_notes)
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

router.post('/delete_project', async (req, res) => {
  try {
    await db.delete_project(req.body.project_id)
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

router.post('/update_project', (req, res) => {
  try {
    db.update_project(req.body.project_id, req.body.project_name, req.body.client_name, req.body.project_location, req.body.project_notes)
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

// get request at url /projects/project_id, displays projects with project_id=project_id from
// elephantsql in json format on the broswer
// written by: Max and Louis
router.get('/projects/:project_id', async (req, res) => {
  try {
    const results = await db.get_project(parseInt(req.params.project_id));
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

module.exports = router;