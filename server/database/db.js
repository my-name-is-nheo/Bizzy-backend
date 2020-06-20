var mysql = require("mysql");

var dbConnection = mysql.createConnection({
  user: "root",
  database: "blacker_db",
});

dbConnection.connect();
module.exports = dbConnection;
