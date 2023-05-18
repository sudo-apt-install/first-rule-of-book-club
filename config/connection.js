const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.book_club) {
  sequelize = new Sequelize(process.env.book_club);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
    //   port: process.env.DB_PORT || 3306,
    }
  );
}

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
