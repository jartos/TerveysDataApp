const Measure = require("../models/measure.model.js");

//--------------------------------------------- GET ---------------------------
exports.findMeasures = (req, res) => {
    Measure.findByID(req.params.personId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Measures."
          });
        else res.send(data);
      });
};
//--------------------------------------------- POST ---------------------------
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Measure
  const measure = new Measure({
    MeasureValue: req.body.MeasureValue,
    Date: req.body.Date,
    PersonID: req.params.personId, 
    TypeID: req.body.TypeID
  });
  // Save Measure in the database
  Measure.create(measure, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Measure."
      });
    else res.send(data);
  });
};
//--------------------------------------------- DELETE ---------------------------
exports.delete = (req, res) => {
  Measure.remove(req.params.measureId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.measureId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Measure with id " + req.params.measureId
        });
      }
    } else res.send({ message: `Measure was deleted successfully!` });
  });
};