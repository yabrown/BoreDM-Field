const cors = require('cors');
const express = require('express');
const db = require('./queries')
const env = require('./env')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./verifyToken');
const { isJwtError } = require('./jwtError');

const { PORT, ACCESS_TOKEN_SECRET } = env;
const app = express();

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const textPassword = req.body.password;

        const hashedPass = await db.login(username);
        console.log(hashedPass)
        
        if (hashedPass) {
            const doesMatch = await bcrypt.compare(textPassword, hashedPass);
            if (doesMatch) {
                const token = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
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

// get request on the root directory, displays a list of projects in json format on the broswer
// (Danny, see this)
// written by: Max and Louis
app.get('/get_all_projects', verifyToken, async (req, res) => {
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

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
app.post('/get_all_samples', verifyToken, async (req, res) => {
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

// get request on the root directory, returns a list of samples in json format
// written by: Max and Louis
app.post('/get_all_classifications', verifyToken, async (req, res) => {
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

app.post('/add_project', verifyToken, (req, res) => {
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

app.post('/add_sample', verifyToken, (req, res) => {
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

  app.post('/delete_project', verifyToken, (req, res) => {
    try {
      db.delete_project(req.body.project_id)
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

  app.post('/delete_log', verifyToken, (req, res) => {
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

app.post('/update_project', verifyToken, (req, res) => {
    try {
        db.update_project(req.body.project_id, req.body.project_name ,req.body.client_name, req.body.project_location, req.body.project_notes)
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

app.post('/update_log', verifyToken, (req, res) => {
    try {
        db.update_log(req.body.log_id, req.body.log_name, req.body.driller, req.body.logger, req.body.notes)
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

app.post('/update_sample', verifyToken, (req, res) => {
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

app.post('/delete_sample', verifyToken, (req, res) => {
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

app.post('/delete_classification', verifyToken, (req, res) => {
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

app.post('/update_classification', verifyToken, (req, res) => {
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

app.post('/add_boring_to_project', verifyToken, (req, res) => {
    console.log("matched correctly")
    try {
        console.log("add_boring_to_project: req.body: ", req.body);
        db.create_log(req.body.project_id, req.body.name, req.body.driller,req.body.logger,req.body.notes,);
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

// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.post('/get_all_logs', verifyToken, async (req, res) => {
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

// get request at url /projects/project_id, displays projects with project_id=project_id from
// elephantsql in json format on the broswer
// written by: Max and Louis
app.get('/projects/:project_id', verifyToken, async (req, res) => {
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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
