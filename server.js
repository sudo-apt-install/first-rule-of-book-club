const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const crypto = require('crypto');
const sequelize = require('./config/connection');
const Session = require("./models/session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// Express middleware
const PORT = process.env.PORT || 3001;
var http = require("http").Server(app);
// const SOCKETPORT = process.env.PORT || 3002;
const io = require("socket.io")(http);

// Generate a random secret of a specific length
function generateRandomSecret(length) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString('hex');
}
const secret = generateRandomSecret(32); // Generate a 32-byte (256-bit) secret

const userSession = {
  secret: secret,
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(userSession));

// Inform Express.js on which template engine to use
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Sync the database and create the sessions table
sequelize.sync().then(() => {
  console.log('Sessions table created');
});

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });

http.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
io.on("connection", (socket) => {
  console.log(socket.id);
});

