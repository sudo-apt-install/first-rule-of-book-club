const User = require("./User");
const Bookshelf = require("./Bookshelf");

User.hasMany(Bookshelf, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Bookshelf.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Bookshelf };
