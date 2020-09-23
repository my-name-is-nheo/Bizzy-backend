const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  linkingId: { type: String, minlength: 1, maxlength: 5000 },
  address_components: { type: Object },
  formatted_address: { type: String },
  formatted_phone_number: { type: String },
  geometry: { type: Object },
  countryCode: { type: String },
  liked: { type: Object },
  hasVerified: { type: Boolean },
  opening_hours: { type: Object },
  city: { type: String, minlength: 1, maxlength: 5000 },
  international_phone_number: { type: String },
  online: { type: Boolean },
  zip: { type: String },
  ownerName: { type: String },
  lineOne: { type: String },
  hasVerified: { type: Boolean },
  state: { type: String },
  category: { type: Array },
  photos: { type: Object },
  rating: { type: Number },
  reviews: { type: Object },
  types: { type: Object },
  website: { type: String },
  photo: { type: Array },
  openingHours: { type: Object },
  favoriteCounts: { type: Number },
  contact: { type: Object },
  funding: { type: Object },
  socialMedia: { type: Object },
});

// {
//   x "address_components": "object",
//   x "city": "string",
//   x "formatted_address": "string",
//   x "formatted_phone_number": "string",
//   x "geometry": "object",
//   x "hasVerified": "boolean",
//   x "international_phone_number": "string",
//   x "linkingId": "string",
//   x "name": "string",
//   x "opening_hours": "object",
//   x "photos": "object",
//   x "rating": "number",
//   x "reviews": "object",
//   x "state": "string",
//   x "types": "object",
//   "website": "string",
// }

// Photo (multiple?)
// Opening hours
// FavoriteCounts
// Contact: { phone, email, website}
// Funding: { venmo, cashapp, gofundme, zelle, paypal, }
// socialMedia: {instagram, facebook, twitter}

// function validateFavorite(user) {
//   const schema = Joi.object({
//     city: Joi.string().min(2).max(500).required(),
//     name: Joi.string().min(2).max(500).required(),
//     heartPressed: Joi.boolean().required(),
//     zipcode: Joi.string().min(5).max(20).required(),
//   });
//   return ({ error, value } = schema.validate(user));
// }

const Business = mongoose.model("Business", businessSchema);
module.exports = { Business };
