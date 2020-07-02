const express = require("express");
const userTestRouter = require("../routes/user");
var cors = require("cors");

function loadAllRoutes(app) {
  app.use(express.json());

  app.use("/api/businesses/", userTestRouter);
}

module.exports = loadAllRoutes;
