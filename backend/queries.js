var pg = require('pg');

var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh"
var client = new pg.Client(conString);

// returns all projects as list of dicts
// const get_projects = (request, response) => {
//   console.log("hi")
//   client.query('SELECT * FROM "public"."projects"', function(err, result) {
//     console.log("hello")
//     if(err) {
//       return console.error('error running query', err);
//     }
    
//     console.log(result.rows)
//     response.status(200).json(result.rows)
//   })
// }

// returns the project with specified project_id
function get_project(project_id) {
  console.log("hi")

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM "public"."projects" WHERE project_id=' + project_id, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);
    });
  });
  
  client.end();
}

module.exports = {
  get_project,
  // get_projects,
}