const Person = require("../models/person.model.js");

//--------------------------------------------- GET ---------------------------
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving persons."
          });
        else res.send(data);
      });
};
exports.findOne = (req, res) => {
  Person.findById(req.params.personId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Person with id " + req.params.personId
        });
      }
    } else res.send(data);
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
  // Create a Person
  const person = new Person({
    Name: req.body.Name
  });
  // Save Person in the database
  Person.create(person, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    else res.send(data);
  });
};
//--------------------------------------------- PUT ---------------------------
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Person.updateById(
    req.params.personId,
    new Person(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Person with id ${req.params.personId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Person with id " + req.params.personId
          });
        }
      } else res.send(data);
    }
  );
};
//--------------------------------------------- DELETE ---------------------------
exports.delete = (req, res) => {
  Person.remove(req.params.personId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Person with id " + req.params.personId
        });
      }
    } else res.send({ message: "Deleting with PersonID : " + req.params.personId });
  });
};