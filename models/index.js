const User = require("./User");
const Book = require("./Book");
const Comment = require("../public/js/script");

User.hasMany(Book);

Book.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(Book);

User.hasMany(Comment);

Book.hasMany(Comment);

module.exports = { User, Book, Comment };
