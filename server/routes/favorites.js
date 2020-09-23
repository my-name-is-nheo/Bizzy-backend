const express = require("express");
const { Favorite, validateFavorite } = require("../model/favorite");
const favoriteRouter = express.Router();
const { NewUser } = require("../model/newUser");
const { Business } = require("../model/business");
// const bcrypt = require("bcrypt");
// const _ = require("lodash");

favoriteRouter.get("/ip", async (req, res) => {
  //working
  console.log("I've been probed");
  var ip = req.ip;
  res.send(ip);
});
favoriteRouter.get("/liked", async (req, res) => {
  const likedBusiness = await Business.find({ liked: { $exists: true } });
  res.send(likedBusiness);
});

//{name: favoriteX, id: 4, likes: ++ }
//search in the headerToken, find the user's email
//find user
//Create a user account object
//{email, userId: user._id, favoritesArray: [39849209384]}
//============================================================
favoriteRouter.post("/", async (req, res) => {
  const valid = validateFavorite(req.body);
  if (valid.error) {
    return res.status(400).send(valid.error.details[0].message);
  }

  const { decoded, businessId } = req.body;

  const business = await Business.findById(businessId);
  if (req.body.liked) {
    console.log(req.body.liked, "liked is true");
    if (business.liked === undefined) {
      let liked = {};
      liked[decoded._id] = true;
      await Business.update({ _id: businessId }, { $set: { liked: liked } });
    } else {
      let presentLiked = { ...businessId.liked };
      presentLiked[decoded._id] = true;
      await Business.update(
        { _id: businessId },
        { $set: { liked: presentLiked } }
      );
    }
  } else {
    console.log(req.body.liked, "liked is false");
    if (business.liked === undefined) {
      console.log("entering the if of false");
      let liked = {};
      liked[decoded._id] = false;
      await Business.update({ _id: businessId }, { $set: { liked: liked } });
    } else {
      console.log("entering else of false");
      let presentLiked = { ...businessId.liked };
      presentLiked[decoded._id] = false;
      await Business.update(
        { _id: businessId },
        { $set: { liked: presentLiked } }
      );
    }
  }

  const finalCheck = await Business.findById(businessId);
  console.log(finalCheck.liked);
  res.send("calm yo tits");

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
