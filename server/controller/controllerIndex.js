var model = require("../model/modelIndex.js");
const nameHandler = {
  getName2: (req, res, next) => {
    console.log("here's a random name");
    model.names.getName((data) => {
      res.json(data);
    });
  },
};
module.exports = nameHandler;
