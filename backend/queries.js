var pg = require('pg');
var env = require('./env');
var client = new pg.Client(conString);
var conString = env.POSTGRES_URL;

const { Sequelize, Model, DataTypes, DATE, FLOAT } = require("sequelize");
const sequelize = new Sequelize(conString, {
  pool: {
    max: 2,
    min: 0,
    idle: 10000
},
});

// Written by: Louis and Max
const Project = sequelize.define("Project", {
  name: DataTypes.TEXT,
  username: DataTypes.STRING,
  location: DataTypes.TEXT,
  client: DataTypes.TEXT,
  notes: DataTypes.TEXT,
});

// Written by: Louis
const Log = sequelize.define("Log", {
  project_id: DataTypes.INTEGER,
  name: DataTypes.TEXT,
  driller: DataTypes.TEXT,
  logger: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  latitude: DataTypes.FLOAT, 
  longitude: DataTypes.FLOAT
  // date: DataTypes.DATE,
});

// Written by: Louis
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

// Written by: Louis
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

// Written by: Louis
const Coordinate = sequelize.define("Coordinate", {
  location_id: DataTypes.INTEGER,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

// Written by: Max (Danny, see this)
const User  = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  hashed_password: DataTypes.STRING,
  name: DataTypes.STRING,
})

    const reseed = (async () => {
      console.log("restarting-- ")
      await sequelize.sync({ force: true });
      await User.create({
        username: 'testuser1',
        hashed_password: '$2b$10$m9JiPgo3J0F1RgAMqZ/vxOYdwrHdTbmuQ1M06ThyoFn6KoXvjA1Pu',
        name: 'Kuba'
      })
      await User.create({
        username: 'testuser2',
        hashed_password: '$2b$10$m9JiPgo3J0F1RgAMqZ/vxOYdwrHdTbmuQ1M06ThyoFn6KoXvjA1Pu',
        name: 'Robert'
      })
      await sequelize.sync({ force: true });
    
      const project_1 = await Project.create({  name: "Kuba",
                                                username: "testuser1",
                                                location: "Princeton, NJ",
                                                client: "Alicki",
                                                notes: "Test Project 1"});
      const home_1 = await Coordinate.create({  latitude: 10, longitude: 15 });
      const log_1 = await Log.create({  project_id: project_1.id,
                                        name: "Test Log 1",
                                        driller: "Danny",
                                        logger: "Ari",
                                        notes: "Nice",
                                        latitude: 40.349961, 
                                        longitude: -74.652069});
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
    
                                                      const sample_3 = await Sample.create({  log_id : log_1.id,
                                                                                                      start_depth: 12,
                                                                                                      length: 6,
                                                                                                      blows_1: 13,
                                                                                                      blows_2: 22,
                                                                                                      blows_3: 24,
                                                                                                      blows_4: 31,
                                                                                                      description: "Description of Sample 1",
                                                                                                      refusal_length: 0,});
    
      // (Danny, see this) replace line below with this one. const project_2 = await Project.create({ name: "Robert", username: "testuser2", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
      const project_2 = await Project.create({ name: "Robert", username: "testuser2", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
      const home_2 = await Coordinate.create({ latitude: 10, longitude: 15 });
      const log_2 = await Log.create({ project_id: project_2.id, name: "Test Log 2", driller: "Louis", logger: "Max", notes: "Very nice!", latitude: 40.349955, longitude: -74.652800});
      const classification_2 = await Classification.create({  log_id : log_2.id,
        start_depth: 3,
        end_depth: 5,
        uscs: "CL-ML",
        color: "Brown",
        moisture: "Very moist",
        density: "Medium dense",
        hardness: "Hard"});
      const classification_3 = await Classification.create({  log_id : log_2.id,
        start_depth: 8,
        end_depth: 12,
        uscs: "OL",
        color: "Brown",
        moisture: "Very moist",
        density: "Medium dense",
        hardness: "Hard"});
      const classification_4 = await Classification.create({  log_id : log_2.id,
        start_depth: 14,
        end_depth: 18,
        uscs: "GP-GC",
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
    })
    reseed()

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
// uses the client connection above to query for a list of projects from db
// written by: Max and Louis
async function get_all_projects() {
  const result = await Project.findAll({
    // attributes: ['name']
  });
  return result;
}

// uses the client connection above to query for a list of projects from db
// written by: Max and Louis
async function reseedDB() {
  const result = await reseed()
  return result;
}

// uses the client connection above to query for a list of projects from db
// (Danny, see this)
// written by: Max
// async function get_all_projects(username) {
//   const result = await Project.findAll({
//     // attributes: ['name']
//   });
//   return result;
// }

// uses the client connection above to query for a list of projects from db
// (Danny, see this)
// written by: Max
async function get_all_projects(username) {
  try{
    const result = await Project.findAll({
      where: {username: username},
    });
    return result;
  } catch (e) {
    console.error(e);
  }
}

// uses the client connection above to query for a list of projects from db
// written by: Max and Louis
async function get_all_samples(log_id) {
  const result = await Sample.findAll({
    where: { log_id: log_id },
    order: ['start_depth'],
  });
  return result;
}

// uses the client connection above to query for the projects with project_id=project_id from elephantsql
// written by: Max and Louis
async function get_project(project_id) {
  const result = await Project.findByPk(project_id);
  return result;
}

// creates project in db based on params, returns integer project_id of project that was created
// written by: Max
async function add_project(username, project_name, client_name, location, notes) {
  const new_proj = await Project.create({ username, name:project_name, client:client_name, location:location, notes: notes});
  return new_proj.id;
}

// creates project in db based on params, returns integer project_id of project that was created
// written by: Louis
async function add_sample(log_id, start_depth, end_depth, length, blows_1, blows_2, blows_3, blows_4, description, refusal_length, sampler_type) {
  const new_sample = await Sample.create({ log_id:log_id, start_depth:start_depth, end_depth:end_depth, length:length, blows_1:blows_1, blows_2:blows_2, blows_3:blows_3, blows_4:blows_4, description:description, refusal_length:refusal_length, sampler_type:sampler_type});
  return new_sample.log_id;
}

// updates project associated with project_id
// writteb by; Max
async function update_project(project_id, project_name, client_name, location, project_notes) {
  const updated_proj = await Project.update({ name:project_name, client:client_name, location:location, notes: project_notes}, {
    where: { id: project_id },
    returning: true,
    raw: true,
  });
  return updated_proj[1][0].id;
}

// deletes project associated with project_id
// written by; Ari
async function delete_project(project_id) {
  const updated_proj = await Project.destroy({
    where: { id: project_id },
    returning: true,
    raw: true,
  });
  return;
}

// deletes log associated with log_id
// written by; Ari
async function delete_log(log_id) {
  const updated_proj = await Log.destroy({
    where: { id: log_id },
    returning: true,
    raw: true,
  });
  return;
}

// deletes sample associated with sample_id
// written by; Ari
async function delete_sample(sample_id) {
  const updated_proj = await Sample.destroy({
    where: { id: sample_id },
    returning: true,
    raw: true,
  });
  return;
}

// deletes sample associated with sample_id
// written by; Ari
async function delete_classification(classification_id) {
  const updated_proj = await Classification.destroy({
    where: { id: classification_id },
    returning: true,
    raw: true,
  });
  return;
}

// retrieves list of all log names for given project_id
// written by: Max
async function get_all_logs(project_id){
  const log_list = await Log.findAll({
    where: {
      project_id: project_id
    }
  });
  return log_list;
}

// retrieves list of all log names for given project_id
// written by: Max
async function get_all_logs_absolute(){
  const log_list = await Log.findAll({
  });
  return log_list;
}

// retrieves list of all classification names for given log_id
// written by: Max
async function get_all_classifications(log_id){
  const classification_list = await Classification.findAll({
    where: {
      log_id: log_id
    }
  });
  return classification_list;
}

// retrieves information about a specific log given project_id, log_id
// written by: Max
async function get_log(project_id, log_id){
  const log = await Log.findAll({
    where: {
      project_id: project_id,
      id: log_id
    }
  });
  return log;
}

// updates log associated with log_id
// writteb by; Max
async function update_log(log_id, name, driller, logger, notes) {
  const updated_log = await Log.update({ id:log_id, name:name, driller:driller, logger:logger, notes:notes}, {
    where: { id: log_id },
    returning: true,
    raw: true,
  });
  return updated_log[1][0].id;
}

// updates log associated with sample_id
// written by Louis
async function update_sample(sample_id, start_depth, end_depth, length, blows_1, blows_2, blows_3, blows_4, description, refusal_length, sampler_type) {
  const updated_sample = await Sample.update({ start_depth:start_depth, end_depth:end_depth, length:length, blows_1:blows_1, blows_2:blows_2, blows_3:blows_3, blows_4:blows_4, description:description, refusal_length:refusal_length, sampler_type:sampler_type}, {
    where: { id: sample_id },
    returning: true,
    raw: true,
  });
  return updated_sample[1][0].id;
}

// updates classification associated with log_id
// written by Louis
async function update_classification(classification_id, start_depth, end_depth, uscs, color, moisture, density, hardness) {
  const updated_classification = await Classification.update({ start_depth:start_depth, end_depth:end_depth, uscs:uscs, color:color, moisture:moisture, density:density, hardness:hardness}, {
    where: { id: classification_id },
    returning: true,
    raw: true,
  });
  return updated_classification[1][0].id;
}

// creates project in db based on params, returns integer project_id of project that was created
// written by: Max
async function create_log(project_id, log_name, driller, logger, notes, latitude, longitude) {
  const new_log = await Log.create({ project_id: project_id, name:log_name, driller: driller, logger:logger, notes:notes, latitude:latitude, longitude:longitude });
  return new_log.id;
}

// checks whether username/password combo eists in db
// written by: Max
// (Danny, see this)
async function login(username) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
  
    if (!user || user.length === 0) {
      return null;
    }
    return user.hashed_password;
  } catch (err) {
    console.error(err);
  }
}

async function register(username, hashed_password, name) {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      await User.create({ username, hashed_password, name });
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
}

// Written by: Louis
const initializeDefault = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.create({
      username: 'testuser1',
      hashed_password: '$2b$10$m9JiPgo3J0F1RgAMqZ/vxOYdwrHdTbmuQ1M06ThyoFn6KoXvjA1Pu',
      name: 'Kuba'
    })
    await User.create({
      username: 'testuser2',
      hashed_password: '$2b$10$m9JiPgo3J0F1RgAMqZ/vxOYdwrHdTbmuQ1M06ThyoFn6KoXvjA1Pu',
      name: 'Robert'
    })
    const project_1 = await Project.create({  name: "Kuba",
                                              username: "testuser1",
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
  
                                                    const sample_3 = await Sample.create({  log_id : log_1.id,
                                                                                                    start_depth: 12,
                                                                                                    length: 6,
                                                                                                    blows_1: 13,
                                                                                                    blows_2: 22,
                                                                                                    blows_3: 24,
                                                                                                    blows_4: 31,
                                                                                                    description: "Description of Sample 1",
                                                                                                    refusal_length: 0,});
  
    // (Danny, see this) replace line below with this one. const project_2 = await Project.create({ name: "Robert", username: "testuser2", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
    const project_2 = await Project.create({ name: "Robert", username: "testuser2", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});  const home_2 = await Coordinate.create({ latitude: 10, longitude: 15 });
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
  }
  catch (err) {
    console.error(err);
  }
}


// registers user
// written by: Max
async function register(username, hashed_password, name) {
  const user = await User.findAll({
    where: {
      username: username
    }
  });
  if (user.length == 0) {
    const new_user = await User.create({ username: username, password: hashed_password, name: name });
    return True;
  }
  return False;
}


// exports the functions in queries.js so they can be used in index.js (and potentially elsewhere)
// written by: Max and Louis
module.exports = {
  get_all_projects,
  get_all_classifications,
  get_project,
  add_project,
  update_project,
  delete_project,
  delete_log,
  delete_classification,
  update_log,
  get_all_logs,
  get_all_logs_absolute,
  get_log,
  create_log,
  login,
  get_all_samples,
  add_sample,
  update_sample,
  delete_sample,
  update_classification,
  reseedDB,
  client,
  register,

}
