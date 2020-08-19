const express = require("express");
const { NewUser } = require("../model/newUser.js");
const userTestRouter = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Business } = require("../model/business");

userTestRouter.get("/ip", async (req, res) => {
  //working
  console.log("I've been probed");
  var ip = req.ip;
  res.send(ip);
});
userTestRouter.post("/auth", async (req, res) => {
  const email = req.body.email;
  const found = await NewUser.findOne({ email: email });
  if (found) {
    return res.send(true);
  }
  return res.send(false);
});
userTestRouter.post("/testModel", async (req, res) => {
  try {
    console.log("OW!");
    const addBusiness = await new Business(req.body);
    addBusiness.save();
    res.send(addBusiness);
  } catch (error) {
    console.log(error, "This is the error in the test model.");
  }
});
userTestRouter.put("/testModel", async (req, res) => {
  try {
    const id = req.body.id;
    const fixedName = await Business.update(
      { _id: id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    res.send(fixedName);
  } catch (error) {
    console.log(error, "This is the error in the test model.");
  }
});

//============================================================
userTestRouter.post("/", async (req, res) => {
  const valid = validateUser(req.body);
  if (valid.error) {
    return res.status(400).send(valid.error.details[0].message);
  }

  const { name, email, password } = req.body;
  let users = await User.find();
  try {
    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name || users[i].email === email) {
        return res
          .status(400)
          .send(
            "There is already an account linked to either this username or password."
          );
      }
    }
    let user = await new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("name-token", name)
      .send(_.pick(user, ["_id", "name", "email"]));
    console.log("code is getting here");
  } catch (error) {
    console.log("This is your error: ", error);
  }
});

module.exports = userTestRouter;
