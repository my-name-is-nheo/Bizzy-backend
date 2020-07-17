const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const loginSchema = new mongoose.Schema({
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

loginSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      dateCreated: new Date(Date.now()),
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(500).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return ({ error, value } = schema.validate(user));
}

const Login = mongoose.model("Login", loginSchema);
module.exports = { Login, validateUser };
