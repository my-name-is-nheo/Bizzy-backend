const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const favoriteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  heartPressed: {
    type: Boolean,
    required: true,
  },
});

function validateFavorite(user) {
  const schema = Joi.object({
    city: Joi.string().min(2).max(500).required(),
    name: Joi.string().min(2).max(500).required(),
    heartPressed: Joi.boolean().required(),
    zipcode: Joi.string().min(5).max(20).required(),
  });
  return ({ error, value } = schema.validate(user));
}

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = { Favorite, validateFavorite };
