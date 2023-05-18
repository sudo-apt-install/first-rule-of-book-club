const { DataTypes } = require("sequelize");
const db = require("../config/connection");
const User = require("./User");

const Bookshelf = db.define(
  "Bookshelf",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    books: {
      type: DataTypes.JSON, // or DataTypes.ARRAY(DataTypes.JSON) if you prefer an array
      allowNull: true,
    },
  },
  {
    tableName: "bookshelves",
  }
);

module.exports = Bookshelf;
