const express = require("express");
const { Login, validateUser } = require("../model/login");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { NewUser } = require("../model/newUser");
const { required, date } = require("@hapi/joi");

const { Ban } = require("../model/ipObject");
const ipObject = require("../model/ipObject");

loginRouter.get("/", async (req, res) => {
  //working
  res.send("You probed me");
});
//============================================================
loginRouter.post("/", async (req, res) => {
  try {
    // const valid = validateUser(req.body);
    // if (valid.error) {
    //   console.log(valid.error.details[0].message);
    //   return res.status(400).send(valid.error.details[0].message);
    // }
    // const checkExisting = await NewUser.find();
    // let matched = false;
    // let id;

    // for (var i = 0; i < checkExisting.length; i++) {
    //   if (checkExisting[i].email === req.body.email) {
    //     const validPassword = await bcrypt.compare(
    //       req.body.password,
    //       checkExisting[i].password
    //     );
    //     if (validPassword) {
    //       matched = true;
    //       id = checkExisting[i]._id;
    //     }
    //   }
    // }
    // if (!matched) {
    //   return res.status(400).send("Either password or email is incorrect.");
    // }
    var ipAddress = req.ip;
    const ip = convertToStringNumber(ipAddress);

    // 192.2983;
    // ("192dot");
    var banned = new Ban({
      ips: { [ip]: [new Date(Date.now())] },
    });
    await banned.save();

    // const time = new Date(Date.now());
    // const ipHeck = await Ban.find(); // type array
    // const id = ipHeck[0]._id;
    // const bannedIp = ipHeck[0].ips;
    // for (var key in bannedIp) {
    //   var presentTime = new Date(Date.now());
    //   if (key === ip) {
    //     const ipArray = bannedIp[key];
    //     if (ipArray.length < 20) {
    //       ipArray.push(presentTime);
    //       const updated = await Ban.update(
    //         { _id: id },
    //         {
    //           $set: {
    //             ips: {
    //               [key]: ipArray,
    //             },
    //           },
    //         }
    //       );
    //     }

    //     // for (var i = 0; i < ipArray.length; i++) {}
    //   }
    // }

    /* We need to first create a section in the db for ip addresses.  
    We'll need to check the ip address against a mongo database of addresses.
    
    If there is a record of that address, it needs to see how many times that address has been called in the last
    five minutes

    {23.454.3789: [timeStamp1, timeStamp2, etc] }

    first we'll see how many in the array
    add to the array if less than 20
    if twenty or more

    find current time, and loop through the array.  For each item that is over 5 minutes old,
    we can delete it from the array.  If after all deletions, array length is still more than 20, 
    then ban ip.
    
    if it's been called more than 20 in five minutes, then it needs to ban this ip address.

    admin profile can unban an ip.

    we'll need a model for the ip object.  It'll be one singular object.

    */
    // const returningUser = await NewUser.findById(id);

    // const token = returningUser.generateAuthToken();
    // console.log(token, "this is da toke");
    // res.header("x-auth-token", token).send("User logged in successfully");

    // console.log("post hit, and reached mongo. Check database");
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
