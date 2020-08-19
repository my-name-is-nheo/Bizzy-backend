const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  online: { type: Boolean },
  ownerName: { type: String },
  hasVerified: { type: Boolean },
  category: { type: Array },
  rating: { type: Number },
  reviewArray: { type: Array },
  photo: { type: Array },
  openingHours: { type: Object },
  favoriteCounts: { type: Number },
  contact: { type: Object },
  funding: { type: Object },
  socialMedia: { type: Object },
});
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
