const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const tokenMakerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  firstName: {
    type: String,
    require: true,
    minLength: 1,
    maxLenght: 500,
  },
  dateCreated: {
    type: String,
    require: true,
    minLength: 1,
    maxLenght: 500,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

tokenMakerSchema.methods.generateAuthToken = function () {
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

const TokenMaker = mongoose.model("TokenModel", tokenMakerSchema);
module.exports = { TokenMaker };
