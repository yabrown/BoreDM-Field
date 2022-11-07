var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";

var pg = require('pg')
var client = new pg.Client(conString);

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(conString);

const project = sequelize.define('project', {
  // Model attributes
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  project_name: DataTypes.STRING,
  city_state:  DataTypes.STRING,
  client_name: DataTypes.STRING,
  project_notes: DataTypes.STRING,
},{
  timestamps: false
});


// const projects = await projects.findAll()

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
  result = await project.findAll();
  return result;
}

// uses the client connection above to query for the projects with project_id=project_id from elephantsql
// written by: Max and Louis
async function get_project(project_id) {
  result = await client.query('SELECT * FROM "public"."projects" WHERE project_id=' + project_id);
  return result.rows;
}

// exports the functions in queries.js so they can be used in index.js (and potentially elsewhere)
// written by: Max and Louis
module.exports = {
  get_all_project_names,
  get_project,
  client,
}
