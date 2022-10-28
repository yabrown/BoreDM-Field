const express = require("express");
const db = require('./queries')
const app = express();
const PORT = 4000;

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.get('/', async (req, res) => {
  try {
      const results = await db.get_projects();
      res.json(results);
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