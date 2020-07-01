const express = require("express");
const userTestRouter = require("../routes/user");

function loadAllRoutes(app) {
  app.use(express.json());
  app.use("/api/userTest", userTestRouter);
}

module.exports = loadAllRoutes;
