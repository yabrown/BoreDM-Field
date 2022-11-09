const express = require("express");
const db = require('./queries')
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.get('/', async (req, res) => {
  try {
      const results = await db.get_all_project_names();
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

// testing webpage, do not use. Hacky way to check functions in queries.js
app.get('/testing', async (req, res) => {
  try {
      const results = await db.get_log(25, 1);
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

app.post('/add_project', (req, res) => {
  try {
      console.log("add_project: req.body: ", req.body);
      res.json(req.body);
      res.status(200).send();
  } catch (err) {
      console.log(err);
  }
})

app.post('/add_boring_to_project', (req, res) => {
    try {
        console.log("add_boring_to_project: req.body: ", req.body);
        res.json(req.body);
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
  })

// get request at url /projects/project_id, displays projects with project_id=project_id from
// elephantsql in json format on the broswer
// written by: Max and Louis
app.get('/projects/:project_id', async (req, res) => {
  try {
      const results = await db.get_project(parseInt(req.params.project_id));
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
