var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";

var pg = require('pg')
var client = new pg.Client(conString);

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
  driller: DataTypes.TEXT,
  logger: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  location: DataTypes.INTEGER,
  // date: DataTypes.DATE,
});

const Coordinate = sequelize.define("Coordinate", {
  location_id: DataTypes.INTEGER,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

(async () => {
  await sequelize.sync();

  const project_1 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 1"});
  const home_1 = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_1 = await Log.create({ project_id: project_1.id, name: "Test Log 1", driller: "Danny", logger: "Ari", notes: "Nice", location: home_1.id});
  
  const project_2 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
  const home_2 = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_2 = await Log.create({ project_id: project_2.id, name: "Test Log 2", driller: "Louis", logger: "Max", notes: "Very nice!", location: home_2.id});
})();


// creates a persistent connection to the elephantsql db. if persistence is undesirable (and we instead
// want to open and close connections with each query, we will need to rewrite this)
// written by: Max and Louis
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });
});

// uses the client connection above to query for a list of projects from elephantsql
// written by: Max and Louis
async function get_all_project_names() {
  result = await Project.findAll();
  return result;
}

// uses the client connection above to query for the projects with project_id=project_id from elephantsql
// written by: Max and Louis
async function get_project(project_id) {
  result = await Project.findByPk(project_id);
  return result;
}

// exports the functions in queries.js so they can be used in index.js (and potentially elsewhere)
// written by: Max and Louis
module.exports = {
  get_all_project_names,
  get_project,
  client,
}
