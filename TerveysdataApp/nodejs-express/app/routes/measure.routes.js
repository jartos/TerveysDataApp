module.exports = app => {
  const measures = require("../controllers/measure.controller.js");

  // Retrieve all Measures with personId
  app.get("/measures/person/:personId", measures.findMeasures);

  // Create a new Measure
  app.post("/measures/person/:personId", measures.create);

  // Delete a Measure with measureId
  app.delete("/measures/:measureId", measures.delete);

};