var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";
var pg = require('pg')
var client = new pg.Client(conString);

const { Sequelize, Model, DataTypes, DATE, FLOAT } = require("sequelize");
const sequelize = new Sequelize(conString);

module.exports = (sequelize) => {
  const Project = sequelize.define("Project", {
    name: DataTypes.TEXT,
    location: DataTypes.TEXT,
    client: DataTypes.TEXT,
    notes: DataTypes.TEXT,
  });
  return Project;
}

module.exports = (sequelize) => {
  const Log = sequelize.define("Log", {
    project_id: DataTypes.INTEGER,
    driller: DataTypes.TEXT,
    logger: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    location: DataTypes.INTEGER,
    // date: DataTypes.DATE,
  });
  return Log;
}

// const Sample = sequelize.define("Sample", {
//   log_id: DataTypes.UUID,
// });

// const Classification = sequelize.define("Classification", {
//   project_id: DataTypes.UUID,
// });

module.exports = (sequelize) => {
  const Coordinate = sequelize.define("Coordinate", {
    location_id: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
  });
  return Coordinate;
}

(async () => {
  await sequelize.sync({ force: true });

  const project_1 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 1"});
  const home_1 = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_1 = await Log.create({ project_id: project_1.id, name: "Test Log 1", driller: "Danny", logger: "Ari", notes: "Nice", location: home_1.id});
  
  const project_2 = await Project.create({ name: "Kuba", location: "Princeton, NJ", client: "Alicki", notes: "Test Project 2"});
  const home_2 = await Coordinate.create({ latitude: 10, longitude: 15 });
  const log_2 = await Log.create({ project_id: project_2.id, name: "B-2", driller: "Louis", logger: "Max", notes: "Very nice!", location: home_2.id});
})();
