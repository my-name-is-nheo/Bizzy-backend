const express = require("express");
// const userTestRouter = require("../routes/user");
const newUserRouter = require("../routes/newUser");
var cors = require("cors");

function loadAllRoutes(app) {
  app.use(express.json());

  // app.use("/api/businesses/", userTestRouter);
  app.use("/api/userRegistration/", newUserRouter);
}

module.exports = loadAllRoutes;
