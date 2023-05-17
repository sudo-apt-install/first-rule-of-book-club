const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require('sequelize');

const app = express();
// const routes = require('./controllers');
// Express middleware

// Inform Express.js on which template engine to use
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const PORT = process.env.PORT || 3001;
const io = require('socket.io')(PORT);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  

io.on('connection', socket => {
    console.log(socket.id)
})

module.exports = { sequelize, SOCKETPORT };