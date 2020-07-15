const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const newUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

newUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(500).required(),
    lastName: Joi.string().min(2).max(500).required(),
    email: Joi.string().email().min(3).max(500).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return ({ error, value } = schema.validate(user));
}

const NewUser = mongoose.model("NewUser", newUserSchema);
module.exports = { NewUser, validateUser };
