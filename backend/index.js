const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors') ;
const app = express();
//const Sequelize = require("sequelize");
const dbconfig = require('./src/config/dbconfig')
//const initRoutes = require("./src/routes/image");

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

// // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./src/routes/customerprofile.js")(app);

require("./src/routes/customer.js")(app);

require("./src/routes/restaurant.js")(app);

require("./src/routes/uploadroutes.js")(app);

require("./src/routes/imageRestaurant.js")(app);

require("./src/routes/imageDish.js")(app);

require("./src/routes/order.js")(app);

// set port, listen for requests
var server= app.listen(8081, () => {
  console.log("Server is running on port 8081.");
});
server.timeout =1200000;


// global.__basedir = __dirname;

// initRoutes(app);

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });