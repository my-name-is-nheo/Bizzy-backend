var db = require("../database/db.js");
module.exports = {
  names: {
    getName: (callback) => {
      var queryString = "select * from blackerTable";
      return db.query(queryString, (err, results) => {
        if (err) {
          console.log(err, " in line 9 of model/index.js");
          throw err;
        }
        callback(results);
      });
    },
  },
};
