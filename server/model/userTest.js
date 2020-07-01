const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().min(3).max(100).required(),
    password: Joi.string().min(8).max(55).required(),
  });

  return ({ error, value } = schema.validate(user));
}

const User = mongoose.model("User", userSchema);
module.exports = { User, validateUser };
