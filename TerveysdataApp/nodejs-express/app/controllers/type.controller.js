const Type = require("../models/type.model.js");

// Retrieve all Types from the database.
exports.findAll = (req, res) => {
    Type.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving types."
          });
        else res.send(data);
      });
};