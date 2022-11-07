var conString = "postgres://iuskfbrh:6tDvSAVRHoYJm7TqtLjlXeb2o-mjH6sz@batyr.db.elephantsql.com/iuskfbrh";
var pg = require('pg')
var client = new pg.Client(conString);

const { Sequelize, Model, DataTypes, DATE, FLOAT } = require("sequelize");
const sequelize = new Sequelize(conString);

const Project = sequelize.define("project", {
  name: DataTypes.TEXT,
  location: DataTypes.TEXT,
  client: DataTypes.TEXT,
  notes: DataTypes.TEXT,
});

const Log = sequelize.define("log", {
  project_id: DataTypes.UUID,
  driller: DataTypes.INTEGER,
  logger: DataTypes.INTEGER,
  notes: DataTypes.TEXT,
  location: DataTypes.UUID,
  date: DataTypes.DATE,
});

// const Sample = sequelize.define("sample", {
//   log_id: DataTypes.UUID,
// });

// const Classification = sequelize.define("classification", {
//   project_id: DataTypes.UUID,
// });

const Coordinates = sequelize.define("coordinates", {
  location_id: DataTypes.UUID,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();