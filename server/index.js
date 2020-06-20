const express = require("express");
const app = express();
const port = 3333;
const nameHandler = require("./controller/controllerIndex.js");

app.get("/getName", nameHandler.getName2);

app.listen(port, function (err) {
  if (err) {
    throw err;
    console.log("app.listen ain't working");
  }
  console.log(`listening to port ${port}`);
});
