const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------- Cross-Origin Resource Sharing (CORS)
/*
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// routes for fetching data
require("./app/routes/person.routes.js")(app);
require("./app/routes/measure.routes.js")(app);
require("./app/routes/type.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
