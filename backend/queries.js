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

const Sample = sequelize.define("Sample", {
  log_id: DataTypes.INTEGER,
  start_depth: DataTypes.FLOAT,
  end_depth: DataTypes.FLOAT,
  length: DataTypes.FLOAT,
  blows_1: DataTypes.INTEGER,
  blows_2: DataTypes.INTEGER,
  blows_3: DataTypes.INTEGER,
  blows_4: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  refusal_length: DataTypes.FLOAT,
  sampler_type: DataTypes.TEXT,
});

const Classification = sequelize.define("Classification", {
  log_id: DataTypes.INTEGER,
  start_depth: DataTypes.FLOAT,
  end_depth: DataTypes.FLOAT,
  uscs: DataTypes.STRING,
  color: DataTypes.STRING,
  moisture: DataTypes.STRING,
  density: DataTypes.STRING,
  hardness: DataTypes.STRING,
});

const Coordinate = sequelize.define("Coordinate", {
  location_id: DataTypes.INTEGER,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

(async () => {
  await sequelize.sync();

  const project_1 = await Project.create({  name: "Kuba",
                                            location: "Princeton, NJ",
                                            client: "Alicki",
                                            notes: "Test Project 1"});
  const home_1 = await Coordinate.create({  latitude: 10, longitude: 15 });
  const log_1 = await Log.create({  project_id: project_1.id,
                                    name: "Test Log 1",
                                    driller: "Danny",
                                    logger: "Ari",
                                    notes: "Nice",
                                    location: home_1.id});
  const classification_1 = await Classification.create({  log_id : log_1.id,
                                                          start_depth: 0,
                                                          end_depth: 10,
                                                          uscs: "CL",
                                                          color: "Brown",
                                                          moisture: "Moist",
                                                          density: "Dense",
                                                          hardness: "Very hard"});
  const sample_1 = await Sample.create({  log_id : log_1.id,
                                                  start_depth: 10,
                                                  length: 6,
                                                  blows_1: 13,
                                                  blows_2: 22,
                                                  blows_3: 24,
                                                  blows_4: 31,
                                                  description: "Description of Sample 1",
                                                  refusal_length: 0,});


  const project_2 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
  const home_2 = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_2 = await Log.create({ project_id: project_2.id, name: "Test Log 2", driller: "Louis", logger: "Max", notes: "Very nice!", location: home_2.id});
  const classification_2 = await Classification.create({  log_id : log_2.id,
    start_depth: 10,
    end_depth: 14,
    uscs: "CL-ML",
    color: "Brown",
    moisture: "Very moist",
    density: "Medium dense",
    hardness: "Hard"});
  const sample_2 = await Sample.create({  log_id : log_2.id,
      start_depth: 10,
      length: 6,
      blows_1: 15,
      blows_2: 25,
      blows_3: 24,
      blows_4: 50,
      description: "Description of Sample 2",
      refusal_length: 4,
      sampler_type: "SPS"});
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

// creates project in db based on params, returns integer project_id of project that was created
// written by: Max
async function add_project(project_name, client_name, location) {
  const new_proj = await Project.create({ name:project_name, client:client_name, location:location});
  console.log("New Project " + project_name + " created.");
  return new_proj.id;
}

// updates project associated with project_id
// writteb by; Max
async function update_project(project_id, project_name, client_name, location, project_notes) {
  const updated_proj = await Project.update({ name:project_name, client:client_name, location:location}, {
    where: { id: project_id },
    returning: true,
    raw: true,
  });
  return updated_proj[1][0].id;
}

// exports the functions in queries.js so they can be used in index.js (and potentially elsewhere)
// written by: Max and Louis
module.exports = {
  get_all_project_names,
  get_project,
  add_project,
  update_project,
  client,
}
