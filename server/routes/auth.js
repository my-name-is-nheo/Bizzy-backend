const express = require("express");
const decode = require("jwt-decode");
const { NewUser } = require("../model/newUser");
const { Business } = require("../model/business");
const { preferences } = require("@hapi/joi");

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  const decoded = decode(req.body.userToken)._id;
  const user = await NewUser.findById(decoded);
  if (user !== null) {
    return res.send(true);
  }
  return res.false;
});
authRouter.post("/hearts", async (req, res) => {
  const { userInfo, businessId } = req.body;
  const business = await Business.findById(businessId);
  if (business) {
    const hearts = business.liked;

    if (hearts !== undefined) {
      return res.send(hearts);
    } else {
      return res.send(false);
    }
  }
});
authRouter.post("/cleanse", async (req, res) => {
  try {
    const id = req.body._id;

    await Business.update({ _id: id }, { $unset: { liked: "" } });
    res.send("Pass");
  } catch (error) {
    console.log("This is your cleansing error in auth.js: ", error);
  }
});

module.exports = authRouter;
