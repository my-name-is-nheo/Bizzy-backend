const express = require("express");
// const userTestRouter = require("../routes/user");
const newUserRouter = require("../routes/newUser");
const loginRouter = require("../routes/login");
const favoriteRouter = require("../routes/favorites");

var cors = require("cors");

function loadAllRoutes(app) {
  app.use(express.json());

  // app.use("/api/businesses/", userTestRouter);
  app.use("/api/userRegistration/", newUserRouter);
  app.use("/api/userLogin/", loginRouter);
  app.use("/api/favorites/", favoriteRouter);
}

module.exports = loadAllRoutes;
