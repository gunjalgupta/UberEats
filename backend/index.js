const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors') ;
const app = express();
const dbconfig = require('./src/config/dbconfig')
const PORT = process.env.PORT || 8081;

// parse requests of content-type = application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//parse requests of content-type = application/x-www-form-urlencoded


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
var server= app.listen(PORT, () => {
  console.log("Server is running on port 8081.");
});
server.timeout =1200000;

module.exports =server;