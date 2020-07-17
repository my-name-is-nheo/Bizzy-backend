const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

const dbStartUp = () => {
  const db = config.get("db");
  const connString =
    db.proto +
    "://" +
    (db.username ? db.username + ":" + db.password + "@" : "") +
    db.hostname +
    "/" +
    db.schema;
  mongoose.connect(connString, ).then(() => {
    winston.info(`Connected to ${connString}...`);
  });
};

module.exports = { dbStartUp };
