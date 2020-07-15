const express = require("express");
const { NewUser, validateUser } = require("../model/newUser");
const newUserRouter = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

newUserRouter.get("/", async (req, res) => {
  //working
  res.send("You probed me");
});
//============================================================
newUserRouter.post("/", async (req, res) => {
  try {
    const valid = validateUser(req.body);
    if (valid.error) {
      console.log(valid.error.details[0].message);
      return res.status(400).send(valid.error.details[0].message);
    }
    const checkExisting = await NewUser.find();
    for (var i = 0; i < checkExisting.length; i++) {
      if (checkExisting[i].email === req.body.email) {
        console.log("Email already exists");
        return res.status(400).send("Email already exists");
      }
    }

    const newUser = new NewUser({ ...req.body });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    const token = newUser.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(
        _.pick(newUser, ["_id", "firstName", "lastName", "password", "email"])
      );

    console.log("post hit, and reached mongo. Check database");
  } catch (err) {
    console.log(err, "post request not working");
  }
  //   try {
  //     for (var i = 0; i < users.length; i++) {
  //       if (users[i].name === name || users[i].email === email) {
  //         return res
  //           .status(400)
  //           .send(
  //             "There is already an account linked to either this username or password."
  //           );
  //       }
  //     }
  //     let user = await new User({ name, email, password });
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(user.password, salt);
  //     await user.save();

  //     const token = user.generateAuthToken();
  //     res
  //       .header("x-auth-token", token)
  //       .header("name-token", name)
  //       .send(_.pick(user, ["_id", "name", "email"]));
  //     console.log("code is getting here");
  //   } catch (error) {
  //     console.log("This is your error: ", error);
  //   }
});

module.exports = newUserRouter;
