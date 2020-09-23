const express = require("express");
const { required, date } = require("@hapi/joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { BannedItems } = require("../model/bannedIps");
const { TokenMaker } = require("../model/tokenMaker");
const { validateUser } = require("../model/login");
const { NewUser } = require("../model/newUser");
const loginRouter = express.Router();

const { Ban } = require("../model/ipObject");
const ipObject = require("../model/ipObject");

loginRouter.get("/", async (req, res) => {
  //working
  res.send("You probed me");
});
//============================================================
loginRouter.post("/", async (req, res) => {
  try {
    console.log("hitting the right space, g boy");
    const valid = validateUser(req.body);
    if (valid.error) {
      console.log(valid.error.details[0].message);
      return res.status(400).send(valid.error.details[0].message);
    }
    var ipAddress = req.ip;
    const ipToCompare = convertToStringNumber(ipAddress);
    let notAllowed = false;
    const checkIfBanned = await BannedItems.find();

    if (checkIfBanned.length !== 0) {
      for (var i = 0; i < checkIfBanned[0].banned.length; i++) {
        if (checkIfBanned[0].banned[i] === ipToCompare) {
          console.log("making it to not allowed");
          notAllowed = true;
        }
      }
      if (notAllowed) {
        res.status(400).send("banned");
      }
    }
    const ipObject = await Ban.find();
    if (ipObject.length === 0) {
      var banned = new Ban({
        ips: { [ipToCompare]: [new Date(Date.now())] },
      });
      await banned.save();
      return res.send(banned);
    }
    const id = ipObject[0]._id;

    for (var key in ipObject[0].ips) {
      if (key === ipToCompare) {
        console.log("reached line 49");
        if (ipObject[0].ips[key].length < 20) {
          const newArr = [...ipObject[0].ips[key]];
          newArr.push(new Date(Date.now()));
          const updated = await Ban.update(
            { _id: id },
            {
              $set: {
                ips: {
                  [ipToCompare]: newArr,
                },
              },
            }
          );
        } else {
          console.log("you got past the ban");
          const presentTime = new Date(Date.now());
          const purgedCollection = [];
          for (var index = 0; index < ipObject[0].ips[key].length; index++) {
            var times = ipObject[0].ips[key][index];
            if (presentTime - times < 300000) {
              purgedCollection.push(times);
            }
          }

          const updated = await Ban.update(
            { _id: id },
            {
              $set: {
                ips: {
                  [ipToCompare]: purgedCollection,
                },
              },
            }
          );
          if (purgedCollection.length >= 20) {
            const bannedList = await BannedItems.find();
            console.log(bannedList, " This is bannedItems");
            if (bannedList.length === 0) {
              const theBanned = await new BannedItems({
                banned: [ipToCompare],
              });
              theBanned.save();
              return res.send(theBanned);
            } else {
              const updateArr = [...bannedList[0].banned];
              updateArr.push(ipToCompare);
              console.log(bannedList[0], " bannedList[0]");
              console.log(updateArr, " updateArr");

              const updated = await BannedItems.update(
                { _id: bannedList[0]._id },
                {
                  $set: {
                    banned: updateArr,
                  },
                }
              );
            }
          }
        }
      }
    }
    const checkExisting = await NewUser.find();
    let matched = false;
    let matchedId;
    for (var i = 0; i < checkExisting.length; i++) {
      if (checkExisting[i].email === req.body.email) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          checkExisting[i].password
        );
        if (validPassword) {
          matched = true;
          matchedId = checkExisting[i]._id;
        }
      }
    }
    if (!matched) {
      return res.status(400).send("Either password or email is incorrect.");
    }
    const userDetails = await NewUser.findOne({ email: req.body.email });

    const login = new TokenMaker({
      _id: userDetails._id,
      email: req.body.email,
      password: req.body.password,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
    });
    const token = login.generateAuthToken();
    console.log(token);
    res.header("x-auth-token", token).send("x auth token sent!");
  } catch (err) {
    console.log(err, "post request not working");
  }
});

const convertToStringNumber = (input) => {
  const stringNum = input;
  let numReturned = "";
  for (var i = 0; i < stringNum.length; i++) {
    if (stringNum[i] === ".") {
      numReturned += "dot";
    } else {
      numReturned += stringNum[i];
    }
  }
  return numReturned;
};

module.exports = loginRouter;
