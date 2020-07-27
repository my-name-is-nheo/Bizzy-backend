const express = require("express");
const { Favorite, validateFavorite } = require("../model/favorite");
const favoriteRouter = express.Router();
// const bcrypt = require("bcrypt");
// const _ = require("lodash");

favoriteRouter.get("/ip", async (req, res) => {
  //working
  console.log("I've been probed");
  var ip = req.ip;
  res.send(ip);
});

//{name: favoriteX, id: 4, likes: ++ }
//search in the headerToken, find the user's email
//find user
//Create a user account object
//{email, userId: user._id, favoritesArray: [39849209384]}
//============================================================
favoriteRouter.post("/", async (req, res) => {
  console.log("We got passed everything and all is well");
  const valid = validateFavorite(req.body);
  if (valid.error) {
    return res.status(400).send(valid.error.details[0].message);
  }

  const { city, heartPressed, name } = req.body;
  const existenceCheck = Favorite.findOne;
  //   let users = await User.find();
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

module.exports = favoriteRouter;
