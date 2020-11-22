const sql = require("./db.js");

const Person = function(person) {
  this.Name = person.Name;
};;
//--------------------------------------------- GET ---------------------------
Person.getAll = result => {
  sql.query("SELECT * FROM mydb.Person", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("persons: ", res);
    result(null, res);
  });
};

Person.findById = (personId, result) => {
  sql.query(`SELECT * FROM mydb.Person WHERE PersonID = ${personId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found person: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Person with the id
    result({ kind: "not_found" }, null);
  });
};
//--------------------------------------------- POST ---------------------------
Person.create = (newPerson, result) => {
  sql.query("INSERT INTO mydb.Person (Name) VALUES (?);", newPerson.Name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created person: ", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};
//--------------------------------------------- PUT ---------------------------
Person.updateById = (id, person, result) => {
  sql.query(
    "UPDATE mydb.Person SET Name = (?) WHERE PersonID = ?",
    [person.Name, id],
    (err, res) => {
      console.log("UpdatePerson id: ", id);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Person with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};
//--------------------------------------------- DELETE ---------------------------
Person.remove = (id, result) => {
  sql.query("DELETE FROM mydb.Person WHERE PersonID = (?)", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Person with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted person with id: ", id);
    result(null, res);
  });
};

module.exports = Person;