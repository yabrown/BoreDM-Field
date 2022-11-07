const express = require("express");
const db = require('./queries')
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";
var pg = require('pg')

const { Sequelize, Model, DataTypes, DATE, FLOAT } = require("sequelize");
const sequelize = new Sequelize(conString);

const Project = sequelize.define("Project", {
  name: DataTypes.TEXT,
  location: DataTypes.TEXT,
  client: DataTypes.TEXT,
  notes: DataTypes.TEXT,
});

const Log = sequelize.define("Log", {
  project_id: DataTypes.INTEGER,
  driller: DataTypes.INTEGER,
  logger: DataTypes.INTEGER,
  notes: DataTypes.TEXT,
  location: DataTypes.INTEGER,
  date: DataTypes.DATE,
});

// const Sample = sequelize.define("Sample", {
//   log_id: DataTypes.UUID,
// });

// const Classification = sequelize.define("Classification", {
//   project_id: DataTypes.UUID,
// });

const Coordinate = sequelize.define("Coordinate", {
  location_id: DataTypes.INTEGER,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});



(async () => {

  const project_1 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Ur mom", notes: "was with me tonight"});
  const home = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_1 = await Log.create({ project_id: project_1.id, name: "Log Name", driller: "Kuba's", logger: "Mom", notes: "nice", location: home.id, date: DataTypes.NOW});

  await sequelize.sync({ force: true });
  console.log('synced')
  // Code here
})();



// get request on the root directory, displays a list of projects in json format on the broswer
// written by: Max and Louis
app.get('/', async (req, res) => {
  try {
      const results = await db.get_all_project_names(Project);
      res.json(results);
  } catch (err) {
      console.log(err);
  }
})

app.post('/post', (req, res) => {
  try {
      console.log("req.body: ", req.body);
      res.json(req.body);
      res.status(200).send();
  } catch (err) {
      console.log(err);
  }
})

// get request at url /projects/project_id, displays projects with project_id=project_id from
// elephantsql in json format on the broswer
// written by: Max and Louis
// app.get('/projects/:project_id', async (req, res) => {
//   try {
//       const results = await db.get_project(parseInt(req.params.project_id));
//       res.json(results);
//   } catch (err) {
//       console.log(err);
//   }
// })



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));