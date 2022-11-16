const express = require("express");
const db = require('./queries')
const app = express();
const cors = require('cors');
const PORT = process.env.port || 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.get('/get_all_projects', async (req, res) => {
    console.log("doing default theing")
  try {
      const results = await db.get_all_projects();
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
app.post('/get_all_samples', async (req, res) => {
    console.log("doing default theing")
  try {
      const results = await db.get_all_samples(req.body.log_id);
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
      db.add_project(req.body.project_name, req.body.client_name, req.body.project_location, req.body.project_notes)
      res.status(200).send("Project added");
  } catch (err) {
      console.log(err);
  }
})

app.post('/add_sample', (req, res) => {
    try {
        db.add_sample(req.body.log_id, req.body.start_depth, req.body.end_depth, req.body.length, req.body.blows_1, req.body.blows_2, req.body.blows_3, req.body.blows_4, req.body.description, req.body.refusal_length, req.body.sampler_type)
        res.status(200).send("Project added");
    } catch (err) {
        console.log(err);
    }
  })

app.post('/update_project', (req, res) => {
    try {
        db.update_project(req.body.project_id, req.body.project_name ,req.body.client_name, req.body.project_location, req.body.project_notes)
        res.status(200).send("Project added");
    } catch (err) {
        console.log(err);
    }
  })

app.post('/update_log', (req, res) => {
    try {
        db.update_log(req.body.log_id, req.body.log_name, req.body.driller, req.body.logger, req.body.notes)
        res.status(200).send("Log added");
    } catch (err) {
        console.log(err);
    }
})

app.post('/update_sample', (req, res) => {
    try {
        db.update_sample(req.body.sample_id, req.body.start_depth, req.body.end_depth, req.body.length, req.body.blows_1, req.body.blows_2, req.body.blows_3, req.body.blows_4, req.body.description, req.body.refusal_length, req.body.sampler_type)
        res.status(200).send("Sample updated");
    } catch (err) {
        console.log(err);
    }
})

app.post('/add_boring_to_project', (req, res) => {
    console.log("matched correctly")
    try {
        console.log("add_boring_to_project: req.body: ", req.body);
        db.create_log(req.body.project_id, req.body.name, req.body.driller,req.body.logger,req.body.notes,);
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
  })

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.post('/get_all_logs', async (req, res) => {
    console.log("matched request to getlognames, id is ")
    console.log(req.body)
  try {
      const results = await db.get_all_logs(req.body.project_id);
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
