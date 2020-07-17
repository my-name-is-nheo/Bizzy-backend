const express = require("express");
// const userTestRouter = require("../routes/user");
const newUserRouter = require("../routes/newUser");
const loginRouter = require("../routes/login");

var cors = require("cors");

function loadAllRoutes(app) {
  app.use(express.json());

  // app.use("/api/businesses/", userTestRouter);
  app.use("/api/userRegistration/", newUserRouter);
  app.use("/api/userLogin/", loginRouter);
}

module.exports = loadAllRoutes;
