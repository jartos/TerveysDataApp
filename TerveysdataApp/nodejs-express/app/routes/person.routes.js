module.exports = app => {
    const persons = require("../controllers/person.controller.js");
  
    // Retrieve all Persons
    app.get("/persons", persons.findAll);

    // Retrieve a single Person with personId
    app.get("/persons/:personId", persons.findOne);

    // Create a new Person
    app.post("/persons", persons.create);
  
    // Update a Person with personId
    app.put("/persons/:personId", persons.update);
  
    // Delete a Person with personId
    app.delete("/persons/:personId", persons.delete);
  
  };