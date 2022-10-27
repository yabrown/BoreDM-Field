const express = require("express");

const app = express();

const PORT = 4000;

// const text = 
app.listen(PORT, () => console.log('Server listening on port ${PORT}'));

var pg = require('pg');

var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh"
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  
  get_projects();
  get_project(1);
});

function get_projects() {
  client.query('SELECT * FROM "public"."projects"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
  });
}

function get_project(project_id) {
  client.query('SELECT * FROM "public"."projects" WHERE project_id=' + project_id, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
  });
}