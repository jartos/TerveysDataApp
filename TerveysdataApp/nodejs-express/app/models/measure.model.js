const sql = require("./db.js");

const Measure = function(measure) {
  this.MeasureValue = measure.MeasureValue;
  this.Date = measure.Date;
  this.PersonID = parseInt(measure.PersonID);
  this.TypeID = measure.TypeID;
};

//--------------------------------------------- GET ---------------------------
Measure.findByID = (personId, result) => {
  sql.query(`SELECT * FROM mydb.Measure WHERE PersonID = ${personId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Fetching OK!");
    result(null, res);
  });
};
//--------------------------------------------- POST ---------------------------
Measure.create = (newMeasure, result) => {
  sql.query("INSERT INTO mydb.Measure (MeasureValue, Date, PersonID, TypeID) VALUES (?, ?, ?, ?);",
   [newMeasure.MeasureValue, newMeasure.Date, newMeasure.PersonID, newMeasure.TypeID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created measure: ", { id: res.insertId, MeasureValue: newMeasure.MeasureValue, Date: newMeasure.Date, PersonID: newMeasure.PersonID, TypeID: newMeasure.TypeID });
    result(null, { id: res.insertId, MeasureValue: newMeasure.MeasureValue, Date: newMeasure.Date, PersonID: newMeasure.PersonID, TypeID: newMeasure.TypeID });
  });
};
//--------------------------------------------- DELETE ---------------------------
Measure.remove = (id, result) => {
  sql.query("DELETE FROM mydb.Measure WHERE MeasureID = (?)", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Measure with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted measure with id: ", id);
    result(null, res);
  });
};

module.exports = Measure;