// express stuff
const express = require("express");
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express();
const PORT = 4000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', async (req, res) => {
  try {
      const results = await db.get_projects();
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

app.get('/projects/:project_id', async (req, res) => {
  try {
      const results = await db.get_project(parseInt(req.params.project_id));
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));