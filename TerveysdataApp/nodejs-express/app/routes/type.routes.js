module.exports = app => {
    const types = require("../controllers/type.controller.js");
  
    // Retrieve all types
    app.get("/types", types.findAll);
  
  };