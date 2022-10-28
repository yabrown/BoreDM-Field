var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";

var pg = require('pg')
var client = new pg.Client(conString);

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

async function get_projects() {
  result = await client.query('SELECT * FROM "public"."projects"');
  return result.rows;
}

async function get_project(project_id) {
  result = await client.query('SELECT * FROM "public"."projects" WHERE project_id=' + project_id);
  return result.rows;
}

module.exports = {
  get_projects,
  get_project,
  client,
}