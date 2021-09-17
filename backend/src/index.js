const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors') ;
const app = express();
//const Sequelize = require("sequelize");
const dbconfig = require('./config/dbconfig')
const initRoutes = require("./routes/image");

//const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, dbconfig.host, dbconfig.port);

// parse requests of content-type = application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//parse requests of content-type = application/x-www-form-urlencoded

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.images = require("./image.model.js")(sequelize, Sequelize);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/customerprofile.js")(app);

require("./routes/restaurant.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});



// global.__basedir = __dirname;

// initRoutes(app);

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });