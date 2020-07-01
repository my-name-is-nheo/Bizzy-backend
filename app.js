const express = require("express");
const config = require("config");
const loadAllRoutes = require("./server/startup/routes");
const { dbStartUp } = require("./server/startup/db");
const app = express();
console.log(typeof loadAllRoutes, "lar type");
loadAllRoutes(app);
dbStartUp();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () => {
  console.log(`We're listening in on ${port}...`);
});
