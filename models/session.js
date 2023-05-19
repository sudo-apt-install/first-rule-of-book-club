const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Session = sequelize.define("Session", {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.TEXT,
  },
});

module.exports = Session;
