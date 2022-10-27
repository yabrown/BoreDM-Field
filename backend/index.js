// express stuff
const express = require("express");
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express();
const PORT = 4000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.get('/projects', db.get_projects)
// app.get('/project', (request, response) => {db.get_project(1)})
app.get('/project', (request, response) => {db.get_project(1)});

app.listen(PORT, () => console.log('Server listening on port ${PORT}'));

// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
// });