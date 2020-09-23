const express = require("express");
const { NewUser } = require("../model/newUser.js");
const userTestRouter = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Business } = require("../model/business");
const { update } = require("lodash");

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
userTestRouter.post("/db/localBusinesses", async (req, res) => {
  try {
    console.log("correct spot being hit");
    const businesses = await Business.find();
    let directory = {};
    for (var i = 0; i < businesses.length; i++) {
      if (businesses[i].zip !== undefined) {
        let first = businesses[i].zip;
        if (first.length === 5) {
          if (directory[first] === undefined) {
            directory[first] = [businesses[i]];
          } else {
            directory[first].push(businesses[i]);
          }
        }
      }
    }
    let returnArray = [];
    const zips = req.body.array;

    for (var i = 0; i < zips.length; i++) {
      if (directory[zips[i]] !== undefined && directory[zips[i]].length > 0) {
        for (var j = 0; j < directory[zips[i]].length; j++) {
          returnArray.push(directory[zips[i]][j]);
        }
      }
    }

    res.send(returnArray);
  } catch (error) {}
});
userTestRouter.get("/db/localBusinesses", async (req, res) => {
  try {
    console.log("correct spot being hit");
    const businesses = await Business.find();

    res.send(businesses);
  } catch (error) {}
});
userTestRouter.post("/db/localBusinesses/addresses", async (req, res) => {
  try {
    const business = await Business.find();
    for (var i = 0; i < business.length; i++) {
      if (req.body.linkingId === business[i].linkingId) {
        console.log(typeof req.body.countryCode, typeof req.body.line1);
        await Business.update(
          { _id: business[i]._id },
          {
            $set: {
              countryCode: req.body.countryCode,
              lineOne: req.body.line1,
            },
          }
        );
      }
    }
    res.send("completed");
  } catch (error) {}
});
userTestRouter.post("/db/localBusinesses/correctZip", async (req, res) => {
  try {
    const { zip, id } = req.body;

    const fixed = await Business.update(
      { _id: id },
      {
        $set: { zip: zip },
      }
    );
    res.send(fixed);
  } catch (error) {}
});
userTestRouter.post("/testModel", async (req, res) => {
  try {
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
